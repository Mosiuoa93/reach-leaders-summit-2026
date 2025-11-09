import React, { useState } from 'react';

function PaymentPage({ onNavigate, registration }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(registration.price.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOnlinePayment = () => {
    window.open('https://multiministries.co.za/get-involved/#donate', '_blank');
  };

  const handlePaymentConfirm = () => {
    onNavigate('confirmation');
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Payment Required</h2>
        
        {/* Registration Summary */}
        <div className="payment-summary">
          <div className="summary-item">
            <span className="label">Name:</span>
            <span className="value">{registration.firstName} {registration.lastName}</span>
          </div>
          <div className="summary-item">
            <span className="label">Registration Type:</span>
            <span className="value">{registration.registrationType.charAt(0).toUpperCase() + registration.registrationType.slice(1)}</span>
          </div>
          <div className="summary-item">
            <span className="label">Amount Due:</span>
            <span className="value amount">R{registration.price.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="payment-options">
          {/* Option 1: Online Payment */}
          <div className="payment-option">
            <button 
              className={`option-btn ${selectedPayment === 'online' ? 'selected' : ''}`}
              onClick={() => setSelectedPayment('online')}
            >
              <div className="option-icon">💳</div>
              <div className="option-title">Online Payment</div>
              <div className="option-desc">Pay via Multi Ministries website</div>
            </button>

            {selectedPayment === 'online' && (
              <div className="option-details">
                <div className="payment-instructions">
                  <h4>📝 Payment Instructions:</h4>
                  <ol>
                    <li>Click "Pay Now" button below</li>
                    <li>Go to Multi Ministries donation page</li>
                    <li>Enter exact amount: <strong>R{registration.price}</strong></li>
                    <li>Use your name as reference: <strong>{registration.firstName} {registration.lastName}</strong></li>
                    <li>Complete the payment</li>
                    <li>⚠️ <strong>Keep proof of payment</strong> for check-in</li>
                  </ol>
                </div>

                <div className="amount-box">
                  <div className="amount-label">Amount to Pay:</div>
                  <div className="amount-display">R{registration.price}</div>
                  <button 
                    className="btn btn-copy"
                    onClick={handleCopyAmount}
                  >
                    {copied ? '✓ Copied!' : 'Copy Amount'}
                  </button>
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={handleOnlinePayment}
                >
                  💳 Pay Now Online
                </button>

                <div className="payment-note">
                  <strong>⚠️ Important:</strong> After payment, please keep your proof of payment. You will need to show it at check-in.
                </div>
              </div>
            )}
          </div>

          {/* Option 2: Pay at Venue */}
          <div className="payment-option">
            <button 
              className={`option-btn ${selectedPayment === 'venue' ? 'selected' : ''}`}
              onClick={() => setSelectedPayment('venue')}
            >
              <div className="option-icon">🏢</div>
              <div className="option-title">Pay at Venue</div>
              <div className="option-desc">Pay on arrival at the event</div>
            </button>

            {selectedPayment === 'venue' && (
              <div className="option-details">
                <div className="payment-instructions">
                  <h4>📍 Venue Payment:</h4>
                  <ol>
                    <li>Arrive at Joy Unspeakable, Pretoria</li>
                    <li>Go to the registration desk</li>
                    <li>Provide your name and email</li>
                    <li>Pay amount: <strong>R{registration.price}</strong></li>
                    <li>Receive your receipt and check-in</li>
                  </ol>
                </div>

                <div className="venue-info">
                  <h4>📅 Event Details:</h4>
                  <p><strong>Dates:</strong> 31 August - 3 September 2026</p>
                  <p><strong>Venue:</strong> Joy Unspeakable, Pretoria</p>
                  <p><strong>Amount:</strong> R{registration.price}</p>
                </div>

                <div className="payment-note">
                  <strong>ℹ️ Note:</strong> Please arrive early to complete payment and check-in before the event starts.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="payment-actions">
          {selectedPayment && (
            <button 
              className="btn btn-success"
              onClick={handlePaymentConfirm}
            >
              ✓ Continue
            </button>
          )}
          <button 
            className="btn btn-back"
            onClick={() => onNavigate('landing')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
