import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getSportEmoji = (sport) => {
    const sportEmojis = {
      basketball: '🏀',
      football: '🏈',
      soccer: '⚽',
      tennis: '🎾',
      baseball: '⚾',
      volleyball: '🏐',
      cricket: '🏏',
      other: '🏅',
    };
    return sportEmojis[sport] || '🏅';
  };

  return (
    <div className="event-card">
      <div className="event-card-header">
        <span className="sport-badge">
          {getSportEmoji(event.sport)} {event.sport}
        </span>
        <span className={`status-badge status-${event.status}`}>
          {event.status}
        </span>
      </div>
      
      <h3 className="event-title">{event.title}</h3>
      
      <div className="event-details">
        <div className="event-detail-item">
          <span className="icon">📅</span>
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="event-detail-item">
          <span className="icon">📍</span>
          <span>{event.location.city}, {event.location.state}</span>
        </div>
        <div className="event-detail-item">
          <span className="icon">👥</span>
          <span>{event.availableSlots} / {event.capacity} slots</span>
        </div>
        <div className="event-detail-item">
          <span className="icon">💰</span>
          <span>${event.registrationFee}</span>
        </div>
      </div>

      <p className="event-description">
        {event.description.substring(0, 100)}
        {event.description.length > 100 && '...'}
      </p>

      <Link to={`/events/${event._id}`} className="view-details-btn">
        View Details →
      </Link>
    </div>
  );
};

export default EventCard;
