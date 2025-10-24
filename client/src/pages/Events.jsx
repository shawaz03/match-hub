import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import api from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    sport: '',
    search: '',
    status: 'upcoming',
  });

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.sport) params.append('sport', filters.sport);
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);

      const response = await api.get(`/events?${params.toString()}`);
      setEvents(response.data.events);
      setError(null);
    } catch (err) {
      setError('Failed to load events. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>🏆 Sports Events</h1>
        <p>Discover and register for exciting sports events</p>
      </div>

      <div className="filters-section">
        <input
          type="text"
          name="search"
          placeholder="Search events..."
          value={filters.search}
          onChange={handleFilterChange}
          className="search-input"
        />

        <select
          name="sport"
          value={filters.sport}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Sports</option>
          <option value="basketball">🏀 Basketball</option>
          <option value="football">🏈 Football</option>
          <option value="soccer">⚽ Soccer</option>
          <option value="tennis">🎾 Tennis</option>
          <option value="baseball">⚾ Baseball</option>
          <option value="volleyball">🏐 Volleyball</option>
          <option value="cricket">🏏 Cricket</option>
          <option value="other">🏅 Other</option>
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading events...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : events.length === 0 ? (
        <div className="no-events">
          <p>No events found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
