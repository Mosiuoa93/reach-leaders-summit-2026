import React, { useState } from 'react';

function LandingPage({ onNavigate }) {
  const [logoClicks, setLogoClicks] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);

    if (newClicks === 3) {
      setShowAdmin(true);
      setLogoClicks(0);
      // Auto-hide after 10 seconds
      setTimeout(() => setShowAdmin(false), 10000);
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        {/* Logo */}
        <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src="/logo.png" alt="Multi Ministries" className="logo" />
        </div>

        {/* Title */}
        <h1 onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          REACH LEADER'S SUMMIT 2026
        </h1>
        
        {/* Subtitle */}
        <p className="subtitle">Multi Ministries Annual Leaders Summit</p>
        
        {/* Event Details */}
        <div className="event-details">
          <p className="event-date">📅 31 August - 3 September 2026</p>
          <p className="event-location">📍 Joy Unspeakable, Pretoria</p>
          <a 
            href="https://www.google.com/maps/search/Joy+Unspeakable+Pretoria" 
            target="_blank" 
            rel="noopener noreferrer"
            className="venue-link"
          >
            View Venue Location →
          </a>
        </div>
        
        <div className="button-group">
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate('choice')}
          >
            Register
          </button>
          {showAdmin && (
            <button 
              className="btn btn-admin"
              onClick={() => onNavigate('admin')}
            >
              🔒 Admin Portal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
