# 🏆 Match Hub - Sports Event Management Platform

A comprehensive, full-stack web application designed for managing sports events, registrations, and payments. Match Hub is a modern platform that connects event organizers with athletes and sports enthusiasts through an intuitive, ESPN-inspired interface.

## 📋 Features

### For Participants
- **Browse Events**: Search and filter sports events by sport type, location, and date
- **Event Registration**: Easy registration process with secure payment integration
- **User Dashboard**: Track your registered events and participation history
- **Event Details**: View comprehensive information about events including location, rules, and organizer info

### For Organizers
- **Create Events**: Intuitive form to create and manage sports events
- **Participant Management**: View and manage event registrations
- **Event Analytics**: Track available slots, registration count, and participation
- **Check-in System**: Manage participant check-ins on event day

### Platform Features
- **Authentication & Authorization**: Secure user registration and login with JWT
- **Role-based Access**: Different capabilities for users, organizers, and admins
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **ESPN-inspired UI**: Modern, sports-focused design aesthetic
- **Real-time Updates**: Dynamic content updates and notifications

## 🚀 Technology Stack

### Backend
- **Node.js** & **Express.js** - Server and API
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling (ESPN-inspired design)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/shawaz03/match-hub.git
   cd match-hub
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

   Or use the convenience script:
   ```bash
   npm run install-all
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/match-hub
   JWT_SECRET=your_jwt_secret_key_here
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running:
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the application**

   **Development Mode (run both frontend and backend):**
   
   Terminal 1 - Backend:
   ```bash
   npm run dev
   ```
   
   Terminal 2 - Frontend:
   ```bash
   npm run client
   ```

   The backend API will run on `http://localhost:5000`
   
   The frontend will run on `http://localhost:5173`

## 🎯 Usage

### Creating an Account

1. Navigate to `http://localhost:5173`
2. Click "Register" in the navigation bar
3. Choose account type:
   - **Participant**: Register for events
   - **Event Organizer**: Create and manage events
4. Fill in your details and create your account

### For Participants

1. **Browse Events**: Click "Events" to see all available events
2. **Filter Events**: Use the search and filter options to find specific events
3. **Register**: Click on an event, review details, and click "Register Now"
4. **View Dashboard**: Check your registrations in the dashboard

### For Organizers

1. **Create Event**: Click "Create Event" in the navigation
2. **Fill Event Details**: Complete the form with event information
3. **Manage Events**: View your events in the dashboard
4. **View Registrations**: See who registered for your events

## 📁 Project Structure

```
match-hub/
├── client/                   # Frontend React application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── EventCard.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── EventDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── CreateEvent.jsx
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── utils/           # Utility functions
│   │   │   └── AuthContext.jsx
│   │   ├── styles/          # CSS files
│   │   │   └── index.css
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                   # Backend Express application
│   ├── controllers/         # Route controllers
│   │   ├── eventController.js
│   │   ├── userController.js
│   │   └── registrationController.js
│   ├── models/              # Mongoose models
│   │   ├── Event.js
│   │   ├── User.js
│   │   └── Registration.js
│   ├── routes/              # API routes
│   │   ├── events.js
│   │   ├── users.js
│   │   └── registrations.js
│   ├── middleware/          # Custom middleware
│   │   └── auth.js
│   └── config/              # Configuration files
├── server.js                # Express server entry point
├── .env.example             # Environment variables example
├── .gitignore
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Events
- `GET /api/events` - Get all events (with filters)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (organizer only)
- `PUT /api/events/:id` - Update event (organizer only)
- `DELETE /api/events/:id` - Delete event (organizer only)
- `GET /api/events/organizer/my-events` - Get organizer's events (protected)

### Registrations
- `POST /api/registrations` - Create registration (protected)
- `GET /api/registrations/my-registrations` - Get user registrations (protected)
- `GET /api/registrations/:id` - Get single registration (protected)
- `PUT /api/registrations/:id/cancel` - Cancel registration (protected)
- `GET /api/registrations/event/:eventId` - Get event registrations (organizer only)
- `PUT /api/registrations/:id` - Update registration (organizer only)

## 🎨 Design Features

- **ESPN-inspired color scheme** with red (#d32f2f) as primary color
- **Dark theme** for modern sports aesthetic
- **Responsive grid layouts** for all screen sizes
- **Smooth animations** and transitions
- **Sport-specific emojis** and icons
- **Status badges** for events and registrations
- **Card-based UI** for content organization

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- Role-based authorization
- Input validation with express-validator
- CORS configuration
- Secure HTTP headers

## 🚧 Future Enhancements

- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Event image uploads
- [ ] Team registration support
- [ ] Live event updates
- [ ] Social sharing features
- [ ] Event calendar view
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Push notifications

## 📝 License

ISC License

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for the sports community**

