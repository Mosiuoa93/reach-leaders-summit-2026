import React from 'react';

function ChoicePage({ onNavigate }) {
  return (
    <div className="choice-container">
      <div className="choice-card">
        <h2>Choose Registration Type</h2>
        <p className="choice-subtitle">Select how you'd like to register for REACH LEADER'S SUMMIT 2026</p>

        <div className="choice-grid">
          <button 
            className="choice-btn individual-btn"
            onClick={() => onNavigate('register-individual')}
          >
            <div className="choice-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="choice-title">Individual</div>
            <div className="choice-desc">Register as an individual participant</div>
            <div className="choice-price">From R1,155</div>
          </button>

          <button 
            className="choice-btn couple-btn"
            onClick={() => onNavigate('register-couple')}
          >
            <div className="choice-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="choice-title">Couple</div>
            <div className="choice-desc">Register as a couple</div>
            <div className="choice-price">From R3,000</div>
          </button>

          <button 
            className="choice-btn group-btn"
            onClick={() => onNavigate('register-group')}
          >
            <div className="choice-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                <path d="M12 14h.01"></path>
                <path d="M12 14a4 4 0 0 0 4-4V7a4 4 0 0 0-8 0v3a4 4 0 0 0 4 4z"></path>
              </svg>
            </div>
            <div className="choice-title">Group</div>
            <div className="choice-desc">Register a group of participants</div>
            <div className="choice-price">From R1,400</div>
          </button>
        </div>

        <div className="pricing-info">
          <p><strong>Early Bird Pricing</strong> until 28 February 2026</p>
          <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>📅 Event: 31 August - 3 September 2026</p>
        </div>

        <button 
          className="btn btn-back"
          onClick={() => onNavigate('landing')}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ChoicePage;
