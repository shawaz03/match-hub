# Quick Start Guide - Match Hub

Get Match Hub running in 5 minutes!

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm

## Installation

### 1. Clone and Install
```bash
git clone https://github.com/shawaz03/match-hub.git
cd match-hub
npm install
cd client && npm install && cd ..
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### 3. Start MongoDB
```bash
mongod
# Or use MongoDB Atlas connection string
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

### 5. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## First Steps

1. **Register an Account**
   - Go to http://localhost:5173
   - Click "Register"
   - Choose "Event Organizer" to create events
   - Or choose "Participant" to register for events

2. **Create an Event** (as Organizer)
   - Login
   - Click "Create Event"
   - Fill in event details
   - Submit

3. **Register for an Event** (as Participant)
   - Browse events
   - Click on an event
   - Click "Register Now"
   - Confirm registration

## Common Commands

```bash
# Start backend in development
npm run dev

# Start frontend in development
npm run client

# Build frontend for production
cd client && npm run build

# Run both frontend and backend
# (use two terminals)
npm run dev        # Terminal 1
npm run client     # Terminal 2
```

## Testing the API

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"user"}'

# Get events
curl http://localhost:5000/api/events
```

## Troubleshooting

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify MONGODB_URI in .env

**Port Already in Use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Frontend Won't Load:**
- Check if backend is running
- Verify proxy in client/vite.config.js

## Next Steps

- Read [README.md](README.md) for full documentation
- Review [TESTING.md](TESTING.md) for testing guide
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Review [SECURITY.md](SECURITY.md) for security best practices

## Need Help?

Open an issue at: https://github.com/shawaz03/match-hub/issues

---

**Happy Coding! 🏆**
