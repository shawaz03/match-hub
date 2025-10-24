import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('registrations');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch user's registrations
      const regResponse = await api.get('/registrations/my-registrations');
      setRegistrations(regResponse.data);

      // If user is an organizer, fetch their events
      if (user?.role === 'organizer' || user?.role === 'admin') {
        const eventsResponse = await api.get('/events/organizer/my-events');
        setMyEvents(eventsResponse.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async (registrationId) => {
    if (!window.confirm('Are you sure you want to cancel this registration?')) {
      return;
    }

    try {
      await api.put(`/registrations/${registrationId}/cancel`);
      alert('Registration cancelled successfully');
      fetchDashboardData();
    } catch (error) {
      alert('Failed to cancel registration');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}! 🏆</h1>
        <p>Manage your events and registrations</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'registrations' ? 'active' : ''}`}
          onClick={() => setActiveTab('registrations')}
        >
          My Registrations
        </button>
        {(user?.role === 'organizer' || user?.role === 'admin') && (
          <button
            className={`tab ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            My Events
          </button>
        )}
      </div>

      <div className="dashboard-content">
        {activeTab === 'registrations' && (
          <div className="registrations-section">
            <div className="section-header">
              <h2>My Event Registrations</h2>
            </div>

            {registrations.length === 0 ? (
              <div className="empty-state">
                <p>You haven't registered for any events yet.</p>
                <Link to="/events" className="btn btn-primary">
                  Browse Events
                </Link>
              </div>
            ) : (
              <div className="registrations-list">
                {registrations.map((registration) => (
                  <div key={registration._id} className="registration-card">
                    <div className="registration-header">
                      <h3>{registration.event.title}</h3>
                      <span className={`status-badge status-${registration.status}`}>
                        {registration.status}
                      </span>
                    </div>
                    <div className="registration-details">
                      <p>
                        <strong>Sport:</strong> {registration.event.sport}
                      </p>
                      <p>
                        <strong>Date:</strong> {formatDate(registration.event.date)}
                      </p>
                      <p>
                        <strong>Location:</strong> {registration.event.location.city},{' '}
                        {registration.event.location.state}
                      </p>
                      <p>
                        <strong>Payment:</strong>{' '}
                        <span className={`payment-${registration.paymentStatus}`}>
                          {registration.paymentStatus}
                        </span>
                      </p>
                      <p>
                        <strong>Registered:</strong> {formatDate(registration.createdAt)}
                      </p>
                    </div>
                    <div className="registration-actions">
                      <Link
                        to={`/events/${registration.event._id}`}
                        className="btn btn-secondary"
                      >
                        View Event
                      </Link>
                      {registration.status === 'registered' && (
                        <button
                          onClick={() => handleCancelRegistration(registration._id)}
                          className="btn btn-danger"
                        >
                          Cancel Registration
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-section">
            <div className="section-header">
              <h2>My Events</h2>
              <Link to="/create-event" className="btn btn-primary">
                Create New Event
              </Link>
            </div>

            {myEvents.length === 0 ? (
              <div className="empty-state">
                <p>You haven't created any events yet.</p>
                <Link to="/create-event" className="btn btn-primary">
                  Create Your First Event
                </Link>
              </div>
            ) : (
              <div className="events-list">
                {myEvents.map((event) => (
                  <div key={event._id} className="event-card-dashboard">
                    <div className="event-header">
                      <h3>{event.title}</h3>
                      <span className={`status-badge status-${event.status}`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="event-details">
                      <p>
                        <strong>Sport:</strong> {event.sport}
                      </p>
                      <p>
                        <strong>Date:</strong> {formatDate(event.date)}
                      </p>
                      <p>
                        <strong>Capacity:</strong> {event.capacity}
                      </p>
                      <p>
                        <strong>Available Slots:</strong> {event.availableSlots}
                      </p>
                      <p>
                        <strong>Fee:</strong> ${event.registrationFee}
                      </p>
                    </div>
                    <div className="event-actions">
                      <Link to={`/events/${event._id}`} className="btn btn-secondary">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
