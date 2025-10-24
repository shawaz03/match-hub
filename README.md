# 🏆 MATCH HUB
### Modern Sports Event Management Platform

![Version](https://img.shields.io/badge/version-2.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**Match Hub** is a comprehensive, full-stack web application designed for managing sports events, registrations, and payments. Built with modern web technologies and featuring an ESPN-inspired dark theme, it provides a seamless experience for both event organizers and participants.

> *Where Champions Are Made. Every Match, Every Moment.* 💙

---

## ✨ Features

### For Event Organizers (Admin)
- 📊 **Complete Event Management** - Create, update, delete events
- 👥 **Registration Tracking** - View all participant registrations
- 💰 **Payment Management** - Track transaction IDs and payments
- 📈 **Dashboard Analytics** - Monitor event participation
- ⚙️ **Full CRUD Operations** - Complete control over events

### For Participants (Users)
- 🏆 **Browse Events** - Explore upcoming sports competitions
- 📝 **Easy Registration** - Simple registration forms with payment
- 💳 **QR Payment Integration** - Scan and pay registration fees
- 🔐 **Secure Authentication** - Login and signup with encryption
- ✉️ **Contact System** - Reach out to organizers
- 🎉 **Success Notifications** - Beautiful popup confirmations

### Modern UI/UX
- 🌙 **Dark Theme** - ESPN-inspired professional design
- ⚡ **Smooth Animations** - GPU-accelerated transitions
- 📱 **Fully Responsive** - Works on all devices
- 💙 **Electric Blue Theme** - Modern color palette
- ✨ **Neon Glow Effects** - Distinctive visual style
- 🎨 **Custom CSS Framework** - 700+ lines of modern styling

---

## 🚀 Live Demo

**Repository:** [https://github.com/shawaz03/match-hub](https://github.com/shawaz03/match-hub)

---

## 📋 Table of Contents

- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Features in Detail](#features-in-detail)
- [Screenshots](#screenshots)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account (for database)
- Git

### Clone the Repository

```bash
git clone https://github.com/shawaz03/match-hub.git
cd match-hub
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

### Run the Application

```bash
# Development mode with auto-reload
nodemon index.js

# Or production mode
node index.js
```

Visit `http://localhost:3000` in your browser.

---

## 💻 Tech Stack

### Frontend
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![EJS](https://img.shields.io/badge/EJS-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black)

### Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

### Database
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Design & Tools
![Font Awesome](https://img.shields.io/badge/Font_Awesome-%23339AF0.svg?style=for-the-badge&logo=fontawesome&logoColor=white)
![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

---

## 📁 Project Structure

```
match-hub/
├── index.js                 # Main server file
├── package.json            # Dependencies
├── .env                    # Environment variables
├── supabase-schema.sql     # Database schema
│
├── models/                 # Database models
│   ├── events.js
│   ├── RegisterModel.js
│   └── Registration.js
│
├── views/                  # EJS Templates
│   ├── index.ejs          # Home page ✨
│   ├── events.ejs         # Events listing ✨
│   ├── details.ejs        # Event details ✨
│   ├── login.ejs          # User login ✨
│   ├── signup.ejs         # User registration ✨
│   ├── contact.ejs        # Contact page ✨
│   ├── about.ejs          # About page
│   ├── adminDashboard.ejs
│   ├── adminViewEvents.ejs
│   └── adminViewRegistrations.ejs
│
└── public/                # Static assets
    ├── css/
    │   └── modern-style.css  # Main stylesheet (700+ lines)
    ├── js/
    │   ├── index.js
    │   └── script.js
    └── images/
        ├── logo.png
        └── qr.jpg
```

---

## 🔐 Environment Setup

### Required Environment Variables

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key-here

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Getting Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **API**
4. Copy your **Project URL** and **anon/public key**

---

## 🗄️ Database Setup

### Create Tables in Supabase

Run the `supabase-schema.sql` file in your Supabase SQL editor:

```sql
-- Events Table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  photo TEXT,
  datestart DATE,
  time TIME,
  venue VARCHAR(255),
  mode VARCHAR(50),
  registerationfee INTEGER,
  cashprice INTEGER,
  contact VARCHAR(100),
  eventcategory VARCHAR(100)
);

-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Event Registrations Table
CREATE TABLE event_registrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phnumber VARCHAR(20),
  year VARCHAR(10),
  event VARCHAR(255),
  amount INTEGER,
  transactionid VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## ⚡ Features in Detail

### 🎨 Design System

**Color Palette:**
- **Primary:** Electric Blue (#007BFF)
- **Secondary:** Charcoal (#1E1E1E)
- **Accent 1:** Neon Cyan (#00E5FF)
- **Accent 2:** Lime Green (#A6FF00)

**Typography:**
- **Display Font:** Bebas Neue (Headers)
- **Heading Font:** Poppins (Subheadings)
- **Body Font:** Inter (Content)

### 🔒 Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ SQL injection prevention
- ✅ XSS protection (EJS auto-escaping)
- ✅ Environment variables for secrets
- ✅ Session validation
- ✅ Input sanitization

### ⚡ Performance Optimizations

- ✅ CSS GPU acceleration
- ✅ `requestAnimationFrame` for smooth scrolling
- ✅ Lazy loading images
- ✅ Throttled event listeners
- ✅ Optimized animations (60fps)
- ✅ Minified and modular CSS

---

## 📸 Screenshots

### Home Page
Modern hero section with "COMPETE. CONNECT. CONQUER."

### Events Dashboard
Grid layout with modern event cards

### Event Details
Full event information with registration form

### Admin Panel
Complete CRUD operations for event management

---

## 🌐 API Endpoints

### Public Routes
```
GET  /                     # Home page
GET  /checkevents          # Events listing
GET  /fetchdetails/:id     # Event details
GET  /contactUs            # Contact page
GET  /loginUser            # Login page
GET  /registerUser         # Signup page
```

### Authentication Routes
```
POST /login               # User login
POST /register            # User registration
GET  /logout              # User logout
```

### Form Submission Routes
```
POST /testing             # Event registration
POST /submitContact       # Contact form
```

### Admin Routes
```
GET  /admin               # Admin dashboard
GET  /viewEvents          # View events
GET  /viewRegistrations   # View registrations
```

---

## 👨‍💻 Developer

**Shawaz**
- GitHub: [@shawaz03](https://github.com/shawaz03)
- Repository: [match-hub](https://github.com/shawaz03/match-hub)

### Original Contributors
- [Harinadh](https://www.github.com/harinadh76)
- [Prem Kumar](https://github.com/Prempk29)
- [Vani](https://github.com/R-Sree-Vani)

---

## 🤝 Contributing

Contributions are always welcome!

### Steps to Contribute:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

For any queries or suggestions, feel free to reach out:

- **Email:** matchhub@gmail.com
- **Location:** Mohan Babu University
- **Phone:** 7680950742

---

## 🙏 Acknowledgments

- ESPN for design inspiration
- Supabase for database infrastructure
- Font Awesome for icons
- Google Fonts for typography
- All contributors and users

---

## 📊 Project Stats

- **Total Files:** 36
- **Lines of Code:** 7,000+
- **CSS Framework:** 700+ lines
- **Pages:** 10 EJS templates
- **Database Tables:** 3 tables
- **API Routes:** 15+ endpoints

---

<div align="center">

**Made with ❤️ for Sports Enthusiasts**

*Where Champions Are Made. Every Match, Every Moment.* 🏆

[![GitHub stars](https://img.shields.io/github/stars/shawaz03/match-hub?style=social)](https://github.com/shawaz03/match-hub/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/shawaz03/match-hub?style=social)](https://github.com/shawaz03/match-hub/network/members)

</div>

