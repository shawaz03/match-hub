import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-icon">🏆</span>
            Welcome to Match Hub
          </h1>
          <p className="hero-subtitle">
            Your Premier Sports Event Management Platform
          </p>
          <p className="hero-description">
            Discover, register, and compete in sports events near you. 
            Connect with athletes and sports enthusiasts through our ESPN-inspired platform.
          </p>
          <div className="hero-buttons">
            <Link to="/events" className="btn btn-primary">
              Browse Events
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2 className="section-title">Why Choose Match Hub?</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Easy Registration</h3>
              <p>Simple and quick event registration process with secure payment integration</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Find Events</h3>
              <p>Search and filter events by sport, location, date, and more</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Secure Payments</h3>
              <p>Safe and secure payment processing for all event registrations</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Event Management</h3>
              <p>Comprehensive tools for organizers to manage events and participants</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📧</div>
              <h3>Notifications</h3>
              <p>Stay updated with email notifications about your events and registrations</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>Access Match Hub on any device - desktop, tablet, or mobile</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sports-section">
        <div className="sports-container">
          <h2 className="section-title">Featured Sports</h2>
          <div className="sports-grid">
            <div className="sport-item">🏀 Basketball</div>
            <div className="sport-item">🏈 Football</div>
            <div className="sport-item">⚽ Soccer</div>
            <div className="sport-item">🎾 Tennis</div>
            <div className="sport-item">⚾ Baseball</div>
            <div className="sport-item">🏐 Volleyball</div>
            <div className="sport-item">🏏 Cricket</div>
            <div className="sport-item">🏅 More Sports</div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of athletes and sports enthusiasts on Match Hub</p>
          <Link to="/register" className="btn btn-large">
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
