import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sport: 'basketball',
    date: '',
    venue: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    capacity: '',
    registrationFee: '',
    registrationDeadline: '',
    contactEmail: '',
    contactPhone: '',
    rules: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        sport: formData.sport,
        date: new Date(formData.date),
        location: {
          venue: formData.venue,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        capacity: parseInt(formData.capacity),
        registrationFee: parseFloat(formData.registrationFee),
        registrationDeadline: new Date(formData.registrationDeadline),
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        rules: formData.rules,
      };

      const response = await api.post('/events', eventData);
      alert('Event created successfully!');
      navigate(`/events/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">
      <div className="create-event-container">
        <div className="page-header">
          <h1>🏆 Create New Event</h1>
          <p>Fill in the details to create your sports event</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="create-event-form">
          <section className="form-section">
            <h2>Basic Information</h2>

            <div className="form-group">
              <label htmlFor="title">Event Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Summer Basketball Tournament 2025"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe your event..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sport">Sport *</label>
                <select
                  id="sport"
                  name="sport"
                  value={formData.sport}
                  onChange={handleChange}
                  required
                >
                  <option value="basketball">🏀 Basketball</option>
                  <option value="football">🏈 Football</option>
                  <option value="soccer">⚽ Soccer</option>
                  <option value="tennis">🎾 Tennis</option>
                  <option value="baseball">⚾ Baseball</option>
                  <option value="volleyball">🏐 Volleyball</option>
                  <option value="cricket">🏏 Cricket</option>
                  <option value="other">🏅 Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date">Event Date *</label>
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Location</h2>

            <div className="form-group">
              <label htmlFor="venue">Venue Name *</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
                placeholder="e.g., City Sports Complex"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Street Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="123 Main Street"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="New York"
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="NY"
                />
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  placeholder="10001"
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Registration Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="capacity">Capacity *</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="50"
                />
              </div>

              <div className="form-group">
                <label htmlFor="registrationFee">Registration Fee ($) *</label>
                <input
                  type="number"
                  id="registrationFee"
                  name="registrationFee"
                  value={formData.registrationFee}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="25.00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="registrationDeadline">Registration Deadline *</label>
                <input
                  type="datetime-local"
                  id="registrationDeadline"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Contact Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactEmail">Contact Email *</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  placeholder="contact@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactPhone">Contact Phone</label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Additional Information</h2>

            <div className="form-group">
              <label htmlFor="rules">Rules & Regulations</label>
              <textarea
                id="rules"
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                rows={4}
                placeholder="Enter event rules and regulations (optional)"
              />
            </div>
          </section>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating Event...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
