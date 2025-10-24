# Testing Guide for Match Hub

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- A modern web browser

## Setup for Testing

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and update the values:
```bash
cp .env.example .env
```

Update the `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/match-hub
JWT_SECRET=your_secure_jwt_secret_here
CLIENT_URL=http://localhost:5173
```

### 3. Start MongoDB
If using local MongoDB:
```bash
mongod
```

If using MongoDB Atlas, update `MONGODB_URI` with your connection string.

### 4. Start the Application

**Option 1: Run Backend and Frontend Separately (Recommended)**

Terminal 1 - Backend:
```bash
npm run dev
```

Terminal 2 - Frontend:
```bash
npm run client
```

**Option 2: Manual Start**

Backend:
```bash
node server.js
```

Frontend:
```bash
cd client
npm run dev
```

## Testing Checklist

### Backend API Testing

#### 1. Health Check
```bash
curl http://localhost:5000/api/health
```
Expected: `{"status":"ok","message":"Match Hub API is running"}`

#### 2. User Registration
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "user"
  }'
```
Expected: JWT token and user object

#### 3. User Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```
Expected: JWT token and user object

#### 4. Create Event (Organizer)
First, register/login as an organizer, then:
```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Summer Basketball Tournament",
    "description": "Annual basketball tournament for all skill levels",
    "sport": "basketball",
    "date": "2025-07-15T10:00:00",
    "location": {
      "venue": "City Sports Complex",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001"
    },
    "capacity": 50,
    "registrationFee": 25.00,
    "registrationDeadline": "2025-07-10T23:59:59",
    "contactEmail": "organizer@example.com"
  }'
```

#### 5. Get All Events
```bash
curl http://localhost:5000/api/events
```

#### 6. Register for Event
```bash
curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "eventId": "EVENT_ID",
    "participantInfo": {
      "name": "Test Participant",
      "email": "participant@example.com",
      "phone": "555-1234"
    }
  }'
```

### Frontend Testing

#### 1. Landing Page
- Navigate to `http://localhost:5173`
- Verify hero section displays
- Check all navigation links work
- Verify features section renders
- Test responsive design (resize browser)

#### 2. Events Page
- Click "Events" or navigate to `/events`
- Verify events list loads
- Test search functionality
- Test sport filter dropdown
- Test status filter dropdown
- Click on an event card to view details

#### 3. User Registration
- Click "Register" in navbar
- Fill in registration form:
  - Name: "Test User"
  - Email: "testuser@example.com"
  - Password: "password123"
  - Confirm Password: "password123"
  - Role: "Participant"
- Submit form
- Verify redirect to dashboard

#### 4. User Login
- Click "Login" in navbar
- Enter credentials:
  - Email: "testuser@example.com"
  - Password: "password123"
- Submit form
- Verify redirect to dashboard

#### 5. Dashboard
- Verify user name displays
- Check "My Registrations" tab
- If organizer, check "My Events" tab
- Verify empty state shows when no data

#### 6. Event Detail Page
- Click on any event from events list
- Verify all event details display:
  - Title, description, sport
  - Date, time, location
  - Capacity and available slots
  - Registration fee
  - Contact information
- Test "Register Now" button:
  - If not logged in, should redirect to login
  - If logged in, should create registration

#### 7. Create Event (Organizer Only)
- Register/login as organizer
- Click "Create Event" in navbar
- Fill in all required fields
- Submit form
- Verify event is created
- Check event appears in "My Events" dashboard

### Rate Limiting Testing

#### Test Authentication Rate Limit (5 requests per 15 minutes)
```bash
# Try 6 login attempts rapidly
for i in {1..6}; do
  curl -X POST http://localhost:5000/api/users/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}'
  echo "Attempt $i"
done
```
Expected: 6th attempt should return rate limit error

#### Test Event Creation Rate Limit (10 per hour)
Create 11 events rapidly with valid token
Expected: 11th attempt should return rate limit error

### Security Testing

#### 1. Test Authentication
- Try accessing protected routes without token
- Try accessing organizer routes as regular user
- Try accessing admin routes as organizer

#### 2. Test Input Validation
- Try registering with invalid email
- Try password less than 6 characters
- Try creating event with missing required fields

#### 3. Test Authorization
- Try updating another user's event
- Try deleting another user's registration
- Try accessing another user's profile

## Browser Compatibility Testing

Test on:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Responsive Design Testing

Test at these breakpoints:
- [ ] Mobile: 375px
- [ ] Tablet: 768px
- [ ] Desktop: 1024px
- [ ] Large Desktop: 1440px

## Performance Testing

### Backend
1. **Response Time**: API responses should be < 200ms
2. **Database Queries**: Monitor query performance
3. **Concurrent Users**: Test with 10+ concurrent requests

### Frontend
1. **Initial Load**: Should load < 3 seconds
2. **Navigation**: Page transitions should be instant
3. **Search/Filter**: Results should update immediately

## Common Issues and Solutions

### Issue: MongoDB Connection Failed
**Solution**: 
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- Check network connectivity

### Issue: Port Already in Use
**Solution**:
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Issue: CORS Error
**Solution**: 
- Check backend CORS configuration
- Verify CLIENT_URL in .env matches frontend URL

### Issue: JWT Token Invalid
**Solution**:
- Clear localStorage in browser
- Re-login to get new token
- Check JWT_SECRET matches between sessions

## Manual Testing Scenarios

### Scenario 1: Complete User Journey
1. User visits homepage
2. Browses events
3. Clicks on an event
4. Clicks "Register Now"
5. Redirected to login
6. Creates account
7. Redirected to dashboard
8. Returns to event
9. Completes registration
10. Views registration in dashboard

### Scenario 2: Organizer Journey
1. Organizer creates account (role: organizer)
2. Logs in
3. Creates new event
4. Views event in "My Events"
5. Waits for participants to register
6. Views registrations for event
7. Updates event details
8. Changes event status

### Scenario 3: Registration Cancellation
1. User registers for event
2. Views registration in dashboard
3. Clicks "Cancel Registration"
4. Confirms cancellation
5. Verifies registration removed
6. Checks event still exists

## Automated Testing (Future Enhancement)

### Unit Tests (To be implemented)
```bash
npm test
```

### Integration Tests (To be implemented)
```bash
npm run test:integration
```

### E2E Tests (To be implemented)
```bash
npm run test:e2e
```

## Test Data

### Sample Users
```json
[
  {
    "name": "John Participant",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  },
  {
    "name": "Sarah Organizer",
    "email": "sarah@example.com",
    "password": "password123",
    "role": "organizer"
  },
  {
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
  }
]
```

### Sample Events
```json
{
  "title": "Summer Basketball League",
  "description": "Competitive basketball league for adults",
  "sport": "basketball",
  "date": "2025-07-15T10:00:00",
  "location": {
    "venue": "City Sports Complex",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "capacity": 50,
  "registrationFee": 25.00,
  "registrationDeadline": "2025-07-10T23:59:59",
  "contactEmail": "league@example.com"
}
```

## Monitoring During Testing

Watch for:
- [ ] Console errors in browser
- [ ] Network errors in DevTools
- [ ] Server errors in terminal
- [ ] MongoDB connection status
- [ ] Memory usage
- [ ] Response times

## Success Criteria

All features should:
- ✅ Load without errors
- ✅ Display correctly on all devices
- ✅ Handle user input properly
- ✅ Show appropriate error messages
- ✅ Maintain security measures
- ✅ Perform within acceptable limits
- ✅ Save data correctly to database

## Reporting Issues

When reporting issues, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Screenshots/console logs
5. Browser/environment info
6. Error messages

## Next Steps After Testing

1. Document any bugs found
2. Create issue tickets
3. Prioritize fixes
4. Implement fixes
5. Re-test
6. Prepare for deployment
