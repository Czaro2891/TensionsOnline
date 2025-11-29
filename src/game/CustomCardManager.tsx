import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Import, Export, Tag, Save, X, Check, Search } from 'lucide-react';
import { GameCard } from './CardSystem';

interface CustomCardManagerProps {
  userId: string;
  onCardsUpdate: (cards: GameCard[]) => void;
}

interface CustomCardForm {
  title: string;
  teaser: string;
  instruction: string;
  level: 'soft' | 'hot' | 'spicy';
  category: string;
  duration: number;
}

const CustomCardManager: React.FC<CustomCardManagerProps> = ({ userId, onCardsUpdate }) => {
  const [customCards, setCustomCards] = useState<GameCard[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<GameCard | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<'all' | 'soft' | 'hot' | 'spicy'>('all');
  const [formData, setFormData] = useState<CustomCardForm>({
    title: '',
    teaser: '',
    instruction: '',
    level: 'soft',
    category: 'Custom',
    duration: 30
  });

  const categories = [
    'Custom',
    'Flirtation',
    'Voice',
    'Gesture',
    'Strip Tease',
    'Silhouette',
    'Close-up',
    'Audio Seduction',
    'Roleplay',
    'Intimate Sharing'
  ];

  const levelColors = {
    soft: 'bg-green-500',
    hot: 'bg-orange-500',
    spicy: 'bg-red-500'
  };

  useEffect(() => {
    loadCustomCards();
  }, [userId]);

  const loadCustomCards = () => {
    try {
      const saved = localStorage.getItem(`customCards_${userId}`);
      if (saved) {
        const cards = JSON.parse(saved);
        setCustomCards(cards);
        onCardsUpdate(cards);
      }
    } catch (error) {
      console.error('Failed to load custom cards:', error);
    }
  };

  const saveCustomCards = (cards: GameCard[]) => {
    try {
      localStorage.setItem(`customCards_${userId}`, JSON.stringify(cards));
      setCustomCards(cards);
      onCardsUpdate(cards);
    } catch (error) {
      console.error('Failed to save custom cards:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.teaser || !formData.instruction) {
      alert('Please fill in all required fields');
      return;
    }

    const newCard: GameCard = {
      id: editingCard ? editingCard.id : `custom_${Date.now()}`,
      title: formData.title,
      teaser: formData.teaser,
      instruction: formData.instruction,
      level: formData.level,
      category: formData.category,
      duration: formData.duration,
      performer: 'player1', // Will be randomized during game
      isCustom: true
    };

    let updatedCards: GameCard[];
    if (editingCard) {
      updatedCards = customCards.map(card => card.id === editingCard.id ? newCard : card);
    } else {
      updatedCards = [...customCards, newCard];
    }

    saveCustomCards(updatedCards);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      teaser: '',
      instruction: '',
      level: 'soft',
      category: 'Custom',
      duration: 30
    });
    setShowForm(false);
    setEditingCard(null);
  };

  const handleEdit = (card: GameCard) => {
    setFormData({
      title: card.title,
      teaser: card.teaser,
      instruction: card.instruction,
      level: card.level,
      category: card.category,
      duration: card.duration
    });
    setEditingCard(card);
    setShowForm(true);
  };

  const handleDelete = (cardId: string) => {
    if (confirm('Are you sure you want to delete this card?')) {
      const updatedCards = customCards.filter(card => card.id !== cardId);
      saveCustomCards(updatedCards);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(customCards, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `custom-cards-${userId}-${Date.now()}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedCards = JSON.parse(e.target?.result as string);
          if (Array.isArray(importedCards)) {
            const validatedCards = importedCards.filter(card => 
              card.title && card.teaser && card.instruction && card.level && card.category
            ).map(card => ({
              ...card,
              id: `custom_${Date.now()}_${Math.random()}`,
              isCustom: true
            }));
            
            const updatedCards = [...customCards, ...validatedCards];
            saveCustomCards(updatedCards);
            alert(`Successfully imported ${validatedCards.length} cards!`);
          }
        } catch (error) {
          alert('Failed to import cards. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredCards = customCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.teaser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || card.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Custom Card Library</h1>
              <p className="text-gray-400">Create and manage your personalized spicy cards</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Card</span>
            </motion.button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div className="flex space-x-2">
              {(['all', 'soft', 'hot', 'spicy'] as const).map(level => (
                <button
                  key={level}
                  onClick={() => setFilterLevel(level)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterLevel === level
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <AnimatePresence>
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gray-900 rounded-xl shadow-lg overflow-hidden"
              >
                <div className={`h-2 ${levelColors[card.level]}`} />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{card.title}</h3>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(card)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-white" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(card.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{card.teaser}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${levelColors[card.level]}`}>
                      {card.level}
                    </span>
                    <span className="text-gray-400">{card.duration}s • {card.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Import/Export */}
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Import & Export</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExport}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <Export className="w-5 h-5" />
              <span>Export Cards</span>
            </motion.button>
            <label className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer">
              <Import className="w-5 h-5" />
              <span>Import Cards</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Card Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">
                    {editingCard ? 'Edit Card' : 'Create New Card'}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={resetForm}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Card Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Give your card a tempting name..."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Teaser (for observer)</label>
                  <textarea
                    required
                    value={formData.teaser}
                    onChange={(e) => setFormData({ ...formData, teaser: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none h-20"
                    placeholder="What hint will the other player see?..."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Private Instruction (for performer)</label>
                  <textarea
                    required
                    value={formData.instruction}
                    onChange={(e) => setFormData({ ...formData, instruction: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none h-32"
                    placeholder="What should the performer do?..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Intensity Level</label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value as 'soft' | 'hot' | 'spicy' })}
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
                      <option value="soft">Soft</option>
                      <option value="hot">Hot</option>
                      <option value="spicy">Spicy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Duration (seconds)</label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    <span>{editingCard ? 'Update' : 'Create'}</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCardManager;