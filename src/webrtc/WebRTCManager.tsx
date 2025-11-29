import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Video, VideoOff, Mic, MicOff, Settings, AlertCircle } from 'lucide-react';

interface WebRTCManagerProps {
  roomId: string;
  userId: string;
  onRemoteStream: (stream: MediaStream) => void;
  onConnectionStatusChange: (status: 'connected' | 'disconnected' | 'connecting' | 'failed') => void;
  onError: (error: string) => void;
}

interface MediaControls {
  videoEnabled: boolean;
  audioEnabled: boolean;
}

export const WebRTCManager: React.FC<WebRTCManagerProps> = ({
  roomId,
  userId,
  onRemoteStream,
  onConnectionStatusChange,
  onError
}) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'failed'>('connecting');
  const [mediaControls, setMediaControls] = useState<MediaControls>({
    videoEnabled: true,
    audioEnabled: true
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevices, setSelectedDevices] = useState({
    videoDeviceId: '',
    audioDeviceId: ''
  });

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);

  const ICE_SERVERS = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  // Get available media devices
  const getMediaDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(d => d.kind === 'videoinput');
      const audioDevices = devices.filter(d => d.kind === 'audioinput');
      
      setAvailableDevices(devices);
      
      if (videoDevices.length > 0 && !selectedDevices.videoDeviceId) {
        setSelectedDevices(prev => ({ ...prev, videoDeviceId: videoDevices[0].deviceId }));
      }
      if (audioDevices.length > 0 && !selectedDevices.audioDeviceId) {
        setSelectedDevices(prev => ({ ...prev, audioDeviceId: audioDevices[0].deviceId }));
      }
    } catch (error) {
      console.error('Failed to get media devices:', error);
    }
  }, [selectedDevices]);

  // Get user media
  const getUserMedia = useCallback(async (videoDeviceId?: string, audioDeviceId?: string) => {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          deviceId: videoDeviceId ? { exact: videoDeviceId } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: {
          deviceId: audioDeviceId ? { exact: audioDeviceId } : undefined,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      return stream;
    } catch (error) {
      console.error('Failed to get user media:', error);
      onError('Failed to access camera/microphone. Please check permissions.');
      throw error;
    }
  }, [onError]);

  // Initialize WebRTC connection
  const initializeConnection = useCallback(async () => {
    try {
      const stream = await getUserMedia();
      
      const pc = new RTCPeerConnection(ICE_SERVERS);
      peerConnectionRef.current = pc;

      // Add local stream tracks
      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream);
      });

      // Handle remote stream
      pc.ontrack = (event) => {
        const [remoteStream] = event.streams;
        setRemoteStream(remoteStream);
        onRemoteStream(remoteStream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate && wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: 'ice-candidate',
            candidate: event.candidate,
            roomId,
            userId
          }));
        }
      };

      // Handle connection state changes
      pc.onconnectionstatechange = () => {
        const status = pc.connectionState;
        setConnectionStatus(status as any);
        onConnectionStatusChange(status as any);
      };

      // Create data channel for game state
      const dataChannel = pc.createDataChannel('gameData', {
        ordered: true
      });
      dataChannelRef.current = dataChannel;

      dataChannel.onopen = () => {
        console.log('Data channel opened');
      };

      dataChannel.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // Handle game state messages
          console.log('Received game data:', data);
        } catch (error) {
          console.error('Failed to parse game data:', error);
        }
      };

      return pc;
    } catch (error) {
      console.error('Failed to initialize connection:', error);
      setConnectionStatus('failed');
      onConnectionStatusChange('failed');
      throw error;
    }
  }, [roomId, userId, getUserMedia, onRemoteStream, onConnectionStatusChange]);

  // WebSocket message handler
  const handleWebSocketMessage = useCallback(async (message: any) => {
    const pc = peerConnectionRef.current;
    if (!pc) return;

    try {
      switch (message.type) {
        case 'offer':
          await pc.setRemoteDescription(new RTCSessionDescription(message.offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
              type: 'answer',
              answer,
              roomId,
              userId
            }));
          }
          break;

        case 'answer':
          await pc.setRemoteDescription(new RTCSessionDescription(message.answer));
          break;

        case 'ice-candidate':
          await pc.addIceCandidate(new RTCIceCandidate(message.candidate));
          break;

        case 'peer-disconnected':
          setConnectionStatus('disconnected');
          onConnectionStatusChange('disconnected');
          break;

        case 'media-control':
          // Handle remote media control changes
          break;
      }
    } catch (error) {
      console.error('Failed to handle WebSocket message:', error);
    }
  }, [roomId, userId, onConnectionStatusChange]);

  // Initialize WebSocket connection
  const initializeWebSocket = useCallback(() => {
    const ws = new WebSocket(`ws://localhost:3001`); // Will be configured for production
    wsRef.current = ws;

    ws.onopen = async () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({
        type: 'join-room',
        roomId,
        userId
      }));

      try {
        const pc = await initializeConnection();
        
        // Create offer if initiator
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        
        ws.send(JSON.stringify({
          type: 'offer',
          offer,
          roomId,
          userId
        }));
      } catch (error) {
        console.error('Failed to create offer:', error);
      }
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        handleWebSocketMessage(message);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setConnectionStatus('disconnected');
      onConnectionStatusChange('disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      onError('Connection error. Please try again.');
    };
  }, [roomId, userId, initializeConnection, handleWebSocketMessage, onConnectionStatusChange, onError]);

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !mediaControls.videoEnabled;
        setMediaControls(prev => ({ ...prev, videoEnabled: !prev.videoEnabled }));
        
        // Notify remote peer
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: 'media-control',
            control: 'video',
            enabled: !mediaControls.videoEnabled,
            roomId,
            userId
          }));
        }
      }
    }
  }, [localStream, mediaControls.videoEnabled, roomId, userId]);

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !mediaControls.audioEnabled;
        setMediaControls(prev => ({ ...prev, audioEnabled: !prev.audioEnabled }));
        
        // Notify remote peer
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: 'media-control',
            control: 'audio',
            enabled: !mediaControls.audioEnabled,
            roomId,
            userId
          }));
        }
      }
    }
  }, [localStream, mediaControls.audioEnabled, roomId, userId]);

  // Change media device
  const changeMediaDevice = useCallback(async (deviceType: 'video' | 'audio', deviceId: string) => {
    try {
      const newStream = await getUserMedia(
        deviceType === 'video' ? deviceId : selectedDevices.videoDeviceId,
        deviceType === 'audio' ? deviceId : selectedDevices.audioDeviceId
      );
      
      // Update peer connection
      const pc = peerConnectionRef.current;
      if (pc) {
        const senders = pc.getSenders();
        const tracks = newStream.getTracks();
        
        tracks.forEach(track => {
          const sender = senders.find(s => s.track?.kind === track.kind);
          if (sender) {
            sender.replaceTrack(track);
          }
        });
      }
      
      setSelectedDevices(prev => ({
        ...prev,
        [`${deviceType}DeviceId`]: deviceId
      }));
    } catch (error) {
      console.error('Failed to change media device:', error);
      onError('Failed to change camera/microphone');
    }
  }, [getUserMedia, selectedDevices, onError]);

  // Send game data
  const sendGameData = useCallback((data: any) => {
    if (dataChannelRef.current?.readyState === 'open') {
      dataChannelRef.current.send(JSON.stringify(data));
    }
  }, []);

  // Cleanup
  const cleanup = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
    if (dataChannelRef.current) {
      dataChannelRef.current.close();
    }
  }, [localStream, remoteStream]);

  // Initialize on mount
  useEffect(() => {
    getMediaDevices();
    initializeWebSocket();
    
    return cleanup;
  }, []);

  // Handle device changes
  useEffect(() => {
    navigator.mediaDevices.addEventListener('devicechange', getMediaDevices);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getMediaDevices);
    };
  }, [getMediaDevices]);

  return (
    <div className="relative w-full h-full">
      {/* Connection Status */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg p-2"
      >
        <div className={`w-3 h-3 rounded-full ${
          connectionStatus === 'connected' ? 'bg-green-500' :
          connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
          'bg-red-500'
        }`} />
        <span className="text-white text-sm font-medium capitalize">
          {connectionStatus}
        </span>
      </motion.div>

      {/* Media Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full p-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleVideo}
          className={`p-3 rounded-full transition-colors ${
            mediaControls.videoEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {mediaControls.videoEnabled ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleAudio}
          className={`p-3 rounded-full transition-colors ${
            mediaControls.audioEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {mediaControls.audioEnabled ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSettingsOpen(true)}
          className="p-3 rounded-full bg-gray-600 hover:bg-gray-700 transition-colors"
        >
          <Settings className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Video Containers */}
      <div className="relative w-full h-full">
        {/* Remote Video */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover rounded-lg"
          style={{ transform: 'scaleX(-1)' }}
        />
        
        {/* Local Video (Picture-in-Picture) */}
        <div className="absolute top-4 right-4 w-32 h-24 bg-black rounded-lg overflow-hidden border-2 border-white/20">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
        </div>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Media Settings</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Camera</label>
                <select
                  value={selectedDevices.videoDeviceId}
                  onChange={(e) => changeMediaDevice('video', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  {availableDevices
                    .filter(d => d.kind === 'videoinput')
                    .map(device => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label || 'Camera'}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Microphone</label>
                <select
                  value={selectedDevices.audioDeviceId}
                  onChange={(e) => changeMediaDevice('audio', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  {availableDevices
                    .filter(d => d.kind === 'audioinput')
                    .map(device => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label || 'Microphone'}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-500 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Privacy Notice</span>
              </div>
              <p className="text-yellow-200 text-sm">
                Your video and audio are encrypted and transmitted directly to your partner. 
                No recordings are stored on our servers.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default WebRTCManager;