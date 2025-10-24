import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import api from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/events/${id}`);
      setEvent(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load event details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!window.confirm('Are you sure you want to register for this event?')) {
      return;
    }

    setRegistering(true);
    try {
      await api.post('/registrations', {
        eventId: event._id,
        participantInfo: {
          name: 'Participant Name', // This should come from a form
          email: 'participant@email.com',
          phone: '123-456-7890',
        },
      });
      alert('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <div className="loading">Loading event...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!event) return <div className="error">Event not found</div>;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="event-detail">
      <div className="event-detail-header">
        <div className="event-detail-badges">
          <span className="sport-badge-large">
            {event.sport.charAt(0).toUpperCase() + event.sport.slice(1)}
          </span>
          <span className={`status-badge-large status-${event.status}`}>
            {event.status}
          </span>
        </div>
        <h1>{event.title}</h1>
      </div>

      <div className="event-detail-content">
        <div className="event-detail-main">
          <section className="detail-section">
            <h2>About This Event</h2>
            <p>{event.description}</p>
          </section>

          <section className="detail-section">
            <h2>Event Details</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <strong>📅 Date:</strong>
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="detail-item">
                <strong>🕐 Time:</strong>
                <span>{formatTime(event.date)}</span>
              </div>
              <div className="detail-item">
                <strong>📍 Venue:</strong>
                <span>{event.location.venue}</span>
              </div>
              <div className="detail-item">
                <strong>🗺️ Address:</strong>
                <span>
                  {event.location.address}, {event.location.city}, {event.location.state} {event.location.zipCode}
                </span>
              </div>
              <div className="detail-item">
                <strong>👥 Capacity:</strong>
                <span>{event.capacity} participants</span>
              </div>
              <div className="detail-item">
                <strong>✅ Available Slots:</strong>
                <span>{event.availableSlots} remaining</span>
              </div>
              <div className="detail-item">
                <strong>💰 Registration Fee:</strong>
                <span>${event.registrationFee}</span>
              </div>
              <div className="detail-item">
                <strong>⏰ Registration Deadline:</strong>
                <span>{formatDate(event.registrationDeadline)}</span>
              </div>
            </div>
          </section>

          {event.rules && (
            <section className="detail-section">
              <h2>Rules & Regulations</h2>
              <p>{event.rules}</p>
            </section>
          )}

          <section className="detail-section">
            <h2>Contact Information</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <strong>📧 Email:</strong>
                <span>{event.contactEmail}</span>
              </div>
              {event.contactPhone && (
                <div className="detail-item">
                  <strong>📞 Phone:</strong>
                  <span>{event.contactPhone}</span>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="event-detail-sidebar">
          <div className="registration-card">
            <h3>Register Now</h3>
            <div className="registration-info">
              <p className="price">${event.registrationFee}</p>
              <p className="slots">
                {event.availableSlots > 0 
                  ? `${event.availableSlots} slots available`
                  : 'Sold out'}
              </p>
            </div>
            <button
              onClick={handleRegister}
              disabled={registering || event.availableSlots === 0}
              className="register-btn"
            >
              {registering ? 'Processing...' : event.availableSlots === 0 ? 'Sold Out' : 'Register Now'}
            </button>
            {!isAuthenticated && (
              <p className="auth-notice">Please log in to register</p>
            )}
          </div>

          {event.organizer && (
            <div className="organizer-card">
              <h3>Organized By</h3>
              <p className="organizer-name">{event.organizer.name}</p>
              <p className="organizer-email">{event.organizer.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
