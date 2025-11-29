# Strip in the Dark - Deployment Guide

## Overview
This guide provides comprehensive instructions for deploying "Strip in the Dark – TENSIONS Online Spicy Edition" in production environments.

## Prerequisites

### System Requirements
- **Node.js**: 18.x or higher
- **Docker**: 20.10 or higher (for containerized deployment)
- **Nginx**: 1.21 or higher (for reverse proxy)
- **SSL Certificate**: For HTTPS (required for WebRTC)
- **RAM**: Minimum 2GB (4GB recommended)
- **Storage**: 10GB minimum
- **Network**: Stable internet connection with sufficient bandwidth for video streaming

### Security Prerequisites
- SSL/TLS certificate (Let's Encrypt recommended)
- Firewall configuration
- Rate limiting setup
- Monitoring and logging

## Deployment Options

### Option 1: Docker Compose (Recommended)

#### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd strip-in-the-dark

# Create environment file
cp .env.example .env
# Edit .env with your configuration

# Start with Docker Compose
docker-compose up -d

# Check status
docker-compose ps
```

#### Environment Configuration
Create a `.env` file in the root directory:

```env
# Backend Configuration
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com

# Frontend Configuration
REACT_APP_BACKEND_URL=https://yourdomain.com
REACT_APP_WS_URL=wss://yourdomain.com

# Security
SESSION_SECRET=your-super-secure-session-secret
JWT_SECRET=your-jwt-secret-key

# SSL Configuration (for production)
SSL_CERT_PATH=/etc/letsencrypt/live/yourdomain.com/fullchain.pem
SSL_KEY_PATH=/etc/letsencrypt/live/yourdomain.com/privkey.pem
```

### Option 2: Manual Deployment

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm ci --only=production

# Start the server
npm start
```

#### Frontend Setup
```bash
# Navigate to root directory
npm ci --only=production

# Build the frontend
npm run build

# Serve with a static file server
serve -s build -p 3000
```

## SSL Configuration

### Using Let's Encrypt
```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Manual SSL Configuration
1. Place your certificate files in `./ssl/` directory
2. Update `nginx.conf` with your certificate paths
3. Restart nginx service

## Security Configuration

### Firewall Setup (UFW)
```bash
# Allow necessary ports
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### Nginx Security Headers
The nginx configuration includes:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: no-referrer
- Content-Security-Policy: Strict policy for WebRTC

### Rate Limiting
Configured in nginx.conf:
- API endpoints: 10 requests/second
- Login attempts: 5 requests/minute

## Monitoring and Logging

### Application Logs
```bash
# Backend logs
docker-compose logs -f backend

# Frontend logs
docker-compose logs -f frontend

# System logs
docker-compose logs -f nginx
```

### Health Checks
- Backend: `GET /api/health`
- Frontend: `GET /health`
- WebSocket: Connection test

### Monitoring Tools
- PM2 for process management
- Winston for logging
- Grafana/Prometheus for metrics (optional)

## Scaling Considerations

### Horizontal Scaling
```yaml
# docker-compose.yml
services:
  backend:
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### Load Balancing
- Use nginx upstream configuration
- Implement sticky sessions for WebRTC
- Consider using Redis for session storage

### Database Scaling
- Use PostgreSQL with connection pooling
- Implement read replicas for heavy load
- Use caching (Redis) for frequently accessed data

## Backup and Recovery

### Data Backup
```bash
# Backup user data and custom cards
docker exec strip-in-the-dark_backend_1 tar -czf /tmp/backup.tar.gz /app/data
docker cp strip-in-the-dark_backend_1:/tmp/backup.tar.gz ./backup-$(date +%Y%m%d).tar.gz
```

### Configuration Backup
```bash
# Backup configuration files
tar -czf config-backup.tar.gz \
  docker-compose.yml \
  nginx.conf \
  .env \
  backend/server.js
```

## Troubleshooting

### Common Issues

#### WebRTC Connection Failed
1. Check SSL certificate validity
2. Verify firewall rules
3. Test STUN/TURN servers
4. Check browser console for errors

#### Socket.IO Connection Issues
1. Verify WebSocket proxy configuration
2. Check CORS settings
3. Test with different browsers
4. Monitor network traffic

#### Performance Issues
1. Monitor CPU and memory usage
2. Check network bandwidth
3. Optimize video quality settings
4. Implement connection quality monitoring

### Debug Commands
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f [service-name]

# Access container shell
docker exec -it [container-name] /bin/bash

# Check network connectivity
docker network ls
docker network inspect [network-name]
```

## Maintenance

### Regular Updates
```bash
# Update Docker images
docker-compose pull

# Restart services
docker-compose restart

# Update SSL certificates
sudo certbot renew
```

### Security Updates
- Keep Node.js and dependencies updated
- Monitor security advisories
- Implement automated security scanning
- Regular penetration testing

## Performance Optimization

### Frontend Optimization
- Enable compression (gzip/brotli)
- Implement lazy loading
- Optimize images and assets
- Use CDN for static files

### Backend Optimization
- Enable response compression
- Implement caching strategies
- Optimize database queries
- Use connection pooling

### Network Optimization
- Enable HTTP/2
- Implement WebSocket compression
- Optimize video codec settings
- Monitor bandwidth usage

## Compliance and Legal

### Age Verification
- Implement robust age verification
- Maintain audit logs
- Comply with local regulations
- Regular compliance reviews

### Privacy Protection
- Encrypt sensitive data
- Implement data retention policies
- Provide user data deletion
- Regular privacy impact assessments

### Content Moderation
- Implement automated content filtering
- Provide reporting mechanisms
- Maintain content moderation logs
- Regular policy reviews

## Support and Maintenance

### Documentation
- Keep deployment documentation updated
- Maintain API documentation
- Document troubleshooting procedures
- Update security procedures

### Support Channels
- Email support
- Live chat (optional)
- Community forums (optional)
- Emergency contact procedures

### SLA Considerations
- Uptime guarantees
- Response time commitments
- Escalation procedures
- Backup support contacts

## Conclusion

This deployment guide provides a comprehensive framework for deploying "Strip in the Dark" in production environments. Regular monitoring, security updates, and performance optimization are essential for maintaining a stable and secure platform.

For additional support or questions, please refer to the project's documentation or contact the development team.

---

**Note**: This is an adult entertainment platform. Ensure all deployments comply with local laws and regulations regarding adult content, age verification, and privacy protection.