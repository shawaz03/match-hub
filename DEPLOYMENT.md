# Deployment Guide for Match Hub

This guide covers deploying the Match Hub platform to production.

## Overview

Match Hub consists of:
- **Backend**: Node.js/Express API
- **Frontend**: React/Vite application
- **Database**: MongoDB

## Deployment Options

### Option 1: Full-Stack Platform (Recommended for Quick Deploy)

#### Heroku + MongoDB Atlas

**Backend Deployment (Heroku)**

1. Install Heroku CLI:
```bash
npm install -g heroku
```

2. Login to Heroku:
```bash
heroku login
```

3. Create Heroku app:
```bash
heroku create match-hub-api
```

4. Set environment variables:
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_production_jwt_secret
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set CLIENT_URL=https://your-frontend-url.com
```

5. Deploy:
```bash
git push heroku main
```

6. Verify:
```bash
heroku open
heroku logs --tail
```

**Frontend Deployment (Vercel)**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to client directory:
```bash
cd client
```

3. Deploy:
```bash
vercel --prod
```

4. Set environment variables in Vercel dashboard:
   - `VITE_API_URL`: Your Heroku API URL

**Database Setup (MongoDB Atlas)**

1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create new cluster (Free tier available)
3. Create database user
4. Whitelist IP addresses (or use 0.0.0.0/0 for all)
5. Get connection string
6. Update backend MONGODB_URI

### Option 2: Separate Services

#### Backend Options

**1. Heroku**
- Easy to deploy
- Automatic SSL
- Free tier available
- Good for MVP

**2. AWS Elastic Beanstalk**
- Scalable
- AWS integration
- More control
- Slightly complex

**3. DigitalOcean App Platform**
- Simple deployment
- Reasonable pricing
- Good performance
- Easy scaling

**4. Railway**
- Modern platform
- Easy deployment
- Good free tier
- GitHub integration

#### Frontend Options

**1. Vercel (Recommended)**
- Optimized for React
- Automatic deployments
- Free tier
- Great performance
- Easy custom domains

**2. Netlify**
- Similar to Vercel
- Good free tier
- Form handling
- Split testing

**3. AWS S3 + CloudFront**
- Highly scalable
- Low cost
- AWS integration
- Requires more setup

**4. GitHub Pages**
- Free for public repos
- Simple setup
- Limited features

#### Database Options

**1. MongoDB Atlas (Recommended)**
- Managed MongoDB
- Free tier (512MB)
- Automatic backups
- High availability
- Global deployment

**2. AWS DocumentDB**
- MongoDB compatible
- AWS integration
- Enterprise features
- Higher cost

## Step-by-Step Deployment

### 1. Prepare for Deployment

#### Update package.json (root)
```json
{
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
}
```

#### Create Procfile (for Heroku)
```
web: node server.js
```

#### Update CORS in server.js
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
```

#### Build frontend for production
```bash
cd client
npm run build
```

### 2. Deploy Backend to Heroku

```bash
# Login
heroku login

# Create app
heroku create match-hub-backend

# Add MongoDB addon or use Atlas
# For Atlas, just set MONGODB_URI

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/match-hub
heroku config:set CLIENT_URL=https://match-hub.vercel.app

# Deploy
git push heroku main

# Check logs
heroku logs --tail

# Open app
heroku open
```

### 3. Deploy Frontend to Vercel

```bash
# Navigate to client directory
cd client

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts to connect GitHub repo (optional)
```

In Vercel dashboard:
1. Go to Settings > Environment Variables
2. Add: `VITE_API_URL` = `https://match-hub-backend.herokuapp.com`

### 4. Setup MongoDB Atlas

1. **Create Cluster**:
   - Go to mongodb.com/atlas
   - Sign up/Login
   - Create free cluster
   - Choose region closest to your backend

2. **Create Database User**:
   - Database Access > Add New Database User
   - Create username and password
   - Grant read/write access

3. **Network Access**:
   - Network Access > Add IP Address
   - For development: Add current IP
   - For production: Add 0.0.0.0/0 (all IPs)
   - Or add specific Heroku IPs

4. **Get Connection String**:
   - Clusters > Connect > Connect your application
   - Copy connection string
   - Replace `<password>` with your password
   - Add to Heroku config: `heroku config:set MONGODB_URI=...`

### 5. Configure Custom Domain (Optional)

**For Vercel (Frontend)**:
1. Vercel Dashboard > Domains
2. Add your domain
3. Update DNS records as instructed
4. Enable automatic HTTPS

**For Heroku (Backend)**:
```bash
heroku domains:add api.yourdomain.com
```
Then update DNS with provided values.

### 6. Setup CI/CD (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Match Hub

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "match-hub-backend"
          heroku_email: "your-email@example.com"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{secrets.VERCEL_TOKEN}}
          vercel-org-id: ${{secrets.ORG_ID}}
          vercel-project-id: ${{secrets.PROJECT_ID}}
```

### 7. Environment Variables Checklist

**Backend (Heroku)**:
- [ ] NODE_ENV=production
- [ ] PORT (auto-set by Heroku)
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] CLIENT_URL

**Frontend (Vercel)**:
- [ ] VITE_API_URL

### 8. Post-Deployment Verification

```bash
# Test backend health
curl https://match-hub-backend.herokuapp.com/api/health

# Test user registration
curl -X POST https://match-hub-backend.herokuapp.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'

# Test frontend
# Open https://match-hub.vercel.app in browser
```

### 9. Monitoring and Maintenance

**Heroku**:
```bash
# View logs
heroku logs --tail

# Restart app
heroku restart

# Check status
heroku ps

# Scale dynos
heroku ps:scale web=1
```

**MongoDB Atlas**:
- Monitor in Atlas dashboard
- Set up alerts
- Review slow queries
- Check connection limits

**Vercel**:
- View analytics in dashboard
- Check deployment logs
- Monitor performance

### 10. Security Checklist

- [ ] HTTPS enabled on all services
- [ ] JWT_SECRET is strong and secure
- [ ] MongoDB uses strong password
- [ ] MongoDB network access is restricted
- [ ] Rate limiting is enabled
- [ ] CORS is properly configured
- [ ] Environment variables are not in code
- [ ] Dependencies are up to date
- [ ] Error messages don't leak sensitive info

## Scaling Considerations

### Backend Scaling
- Start with 1 dyno (Heroku)
- Monitor response times
- Scale horizontally (more dynos) as needed
- Consider load balancer for high traffic

### Database Scaling
- Start with MongoDB Atlas M0 (free)
- Upgrade to M10+ for production
- Enable sharding for large datasets
- Implement caching (Redis) for frequently accessed data

### Frontend Scaling
- Vercel handles this automatically
- Consider CDN for static assets
- Optimize images and code splitting

## Cost Estimation

**Free Tier (MVP)**:
- Backend: Heroku Free Dyno (sleeps after 30min inactivity)
- Frontend: Vercel Free
- Database: MongoDB Atlas M0 (512MB)
- **Total**: $0/month

**Production (Small)**:
- Backend: Heroku Hobby ($7/month)
- Frontend: Vercel Pro ($20/month)
- Database: MongoDB Atlas M10 ($57/month)
- **Total**: ~$84/month

**Production (Medium)**:
- Backend: Heroku Standard ($25-50/month)
- Frontend: Vercel Pro ($20/month)
- Database: MongoDB Atlas M20 ($150/month)
- **Total**: ~$195-220/month

## Backup and Recovery

### Database Backups
- MongoDB Atlas: Automatic continuous backups
- Manual backups before major changes
- Test restore process regularly

### Code Backups
- Git repository (GitHub)
- Tag releases
- Document deployment process

## Troubleshooting

### Common Issues

**1. App Crashes on Heroku**
```bash
heroku logs --tail
# Check for:
# - MongoDB connection errors
# - Missing environment variables
# - Port binding issues
```

**2. Frontend Can't Connect to Backend**
- Check CORS configuration
- Verify API URL in frontend env
- Check Heroku app is running
- Test API endpoints directly

**3. MongoDB Connection Fails**
- Check connection string
- Verify database user credentials
- Check network access whitelist
- Ensure cluster is running

**4. Rate Limiting Issues**
- Check if Redis is needed
- Adjust rate limits
- Monitor legitimate traffic patterns

## Rollback Procedure

```bash
# List recent releases
heroku releases

# Rollback to previous version
heroku rollback v42

# Verify
heroku logs --tail
```

## Performance Optimization

1. **Backend**:
   - Enable gzip compression
   - Implement caching
   - Optimize database queries
   - Add database indexes

2. **Frontend**:
   - Code splitting
   - Lazy loading
   - Image optimization
   - Enable compression

3. **Database**:
   - Index frequently queried fields
   - Use aggregation pipelines
   - Implement pagination
   - Cache frequent queries

## Support and Maintenance

**Regular Tasks**:
- Monitor error logs daily
- Update dependencies monthly
- Review security advisories
- Backup critical data
- Test disaster recovery
- Monitor performance metrics

**Resources**:
- Heroku Dashboard: https://dashboard.heroku.com
- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com
- GitHub: https://github.com/shawaz03/match-hub

## Next Steps

After deployment:
1. Set up monitoring (e.g., Sentry for error tracking)
2. Configure analytics (e.g., Google Analytics)
3. Set up uptime monitoring (e.g., UptimeRobot)
4. Create documentation for team
5. Plan feature releases
6. Collect user feedback
7. Iterate and improve
