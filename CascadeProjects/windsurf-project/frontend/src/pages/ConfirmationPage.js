import React from 'react';

function ConfirmationPage({ onNavigate, registration }) {
  const getRegistrationTypeLabel = (type) => {
    const labels = {
      individual: 'Individual',
      student: 'Student',
      couple: 'Couple',
      group: 'Group'
    };
    return labels[type] || type;
  };

  const getAccommodationLabel = (accommodation) => {
    const labels = {
      dorm: 'Dormitories',
      guesthouse: 'Guest House'
    };
    return labels[accommodation] || accommodation;
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <div className="success-icon">✓</div>
          <h2>Registration Confirmed!</h2>
          <p className="confirmation-subtitle">Thank you for registering for REACH LEADER'S SUMMIT 2026</p>
        </div>

        {/* Registration Details */}
        <div className="confirmation-section">
          <h3>Registration Details</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{registration.firstName} {registration.lastName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{registration.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{registration.phone}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Gender:</span>
              <span className="detail-value">{registration.gender.charAt(0).toUpperCase() + registration.gender.slice(1)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Registration Type:</span>
              <span className="detail-value">{getRegistrationTypeLabel(registration.registrationType)}</span>
            </div>
            {registration.accommodation && (
              <div className="detail-item">
                <span className="detail-label">Accommodation:</span>
                <span className="detail-value">{getAccommodationLabel(registration.accommodation)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Couple Details */}
        {registration.registrationType === 'couple' && registration.partner1 && (
          <div className="confirmation-section">
            <h3>Partner Information</h3>
            <div className="partner-info">
              <div className="partner-card">
                <h4>Partner 1</h4>
                <p><strong>Name:</strong> {registration.partner1.firstName} {registration.partner1.lastName}</p>
                <p><strong>Gender:</strong> {registration.partner1.gender.charAt(0).toUpperCase() + registration.partner1.gender.slice(1)}</p>
              </div>
              <div className="partner-card">
                <h4>Partner 2</h4>
                <p><strong>Name:</strong> {registration.partner2.firstName} {registration.partner2.lastName}</p>
                <p><strong>Gender:</strong> {registration.partner2.gender.charAt(0).toUpperCase() + registration.partner2.gender.slice(1)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Group Details */}
        {registration.registrationType === 'group' && registration.groupMembers && (
          <div className="confirmation-section">
            <h3>Group Members ({registration.groupMembers.length})</h3>
            <div className="members-list">
              {registration.groupMembers.map((member, index) => (
                <div key={index} className="member-item">
                  <span className="member-number">Member {index + 1}:</span>
                  <span className="member-name">{member.firstName} {member.lastName}</span>
                  <span className="member-gender">({member.gender.charAt(0).toUpperCase() + member.gender.slice(1)})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Information */}
        <div className="confirmation-section payment-info">
          <h3>Payment Information</h3>
          <div className="payment-details">
            <div className="payment-row">
              <span className="payment-label">Total Amount:</span>
              <span className="payment-amount">R{registration.price.toLocaleString()}</span>
            </div>
            <div className="payment-row">
              <span className="payment-label">Status:</span>
              <span className="payment-status">Awaiting Payment</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="confirmation-section next-steps">
          <h3>Next Steps</h3>
          <ol className="steps-list">
            <li>
              <strong>Complete Payment</strong>
              <p>Pay the amount shown above using your preferred payment method</p>
            </li>
            <li>
              <strong>Keep Proof of Payment</strong>
              <p>You will need to show proof of payment at check-in</p>
            </li>
            <li>
              <strong>Arrive at Event</strong>
              <p>Come to Joy Unspeakable, Pretoria on 31 August 2026</p>
            </li>
            <li>
              <strong>Check In</strong>
              <p>Present your proof of payment and ID at the registration desk</p>
            </li>
          </ol>
        </div>

        {/* Important Notes */}
        <div className="confirmation-section important-notes">
          <h4>📌 Important Notes</h4>
          <ul className="notes-list">
            <li>A confirmation email has been sent to <strong>{registration.email}</strong></li>
            <li>Keep your proof of payment safe - you'll need it at check-in</li>
            <li>Event dates: <strong>31 August - 3 September 2026</strong></li>
            <li>Venue: <strong>Joy Unspeakable, Pretoria</strong></li>
            <li>For questions, contact Multi Ministries</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="confirmation-actions">
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate('landing')}
          >
            Back to Home
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => window.print()}
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
