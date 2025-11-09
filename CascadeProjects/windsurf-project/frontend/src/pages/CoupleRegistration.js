import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function CoupleRegistration({ onNavigate, onPayment }) {
  const [price, setPrice] = useState(3000);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    gender: '',
    partner1FirstName: '',
    partner1LastName: '',
    partner1Gender: '',
    partner2FirstName: '',
    partner2LastName: '',
    partner2Gender: ''
  });

  // Calculate price
  useEffect(() => {
    const now = new Date();
    const earlyBirdDate = new Date('2026-02-28');
    const isEarlyBird = now <= earlyBirdDate;
    setPrice(isEarlyBird ? 3000 : 3500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post(`${API_URL}/api/register`, {
        registrationType: 'couple',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        partner1: {
          firstName: formData.partner1FirstName,
          lastName: formData.partner1LastName
        },
        partner2: {
          firstName: formData.partner2FirstName,
          lastName: formData.partner2LastName
        }
      });

      setMessage('✓ Couple registration successful! Proceeding to payment...');
      
      // Navigate to payment page with registration data
      setTimeout(() => {
        onPayment({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          gender: formData.gender,
          registrationType: 'couple',
          partner1: {
            firstName: formData.partner1FirstName,
            lastName: formData.partner1LastName,
            gender: formData.partner1Gender
          },
          partner2: {
            firstName: formData.partner2FirstName,
            lastName: formData.partner2LastName,
            gender: formData.partner2Gender
          },
          price: price
        });
      }, 1500);
    } catch (error) {
      setMessage('✗ Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Couple Registration</h2>

        {message && (
          <div className={message.includes('✓') ? 'success-message' : 'error-message'}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Primary Contact */}
          <div className="form-section">
            <h3>Primary Contact</h3>

            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+27 123 456 7890"
              />
            </div>

            <div className="form-group">
              <label htmlFor="organization">Organization</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Your organization"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Partner 1 */}
          <div className="form-section">
            <h3>Partner 1</h3>

            <div className="form-group">
              <label htmlFor="partner1FirstName">First Name *</label>
              <input
                type="text"
                id="partner1FirstName"
                name="partner1FirstName"
                value={formData.partner1FirstName}
                onChange={handleChange}
                required
                placeholder="Jane"
              />
            </div>

            <div className="form-group">
              <label htmlFor="partner1LastName">Last Name *</label>
              <input
                type="text"
                id="partner1LastName"
                name="partner1LastName"
                value={formData.partner1LastName}
                onChange={handleChange}
                required
                placeholder="Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="partner1Gender">Gender *</label>
              <select
                id="partner1Gender"
                name="partner1Gender"
                value={formData.partner1Gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Partner 2 */}
          <div className="form-section">
            <h3>Partner 2</h3>

            <div className="form-group">
              <label htmlFor="partner2FirstName">First Name *</label>
              <input
                type="text"
                id="partner2FirstName"
                name="partner2FirstName"
                value={formData.partner2FirstName}
                onChange={handleChange}
                required
                placeholder="James"
              />
            </div>

            <div className="form-group">
              <label htmlFor="partner2LastName">Last Name *</label>
              <input
                type="text"
                id="partner2LastName"
                name="partner2LastName"
                value={formData.partner2LastName}
                onChange={handleChange}
                required
                placeholder="Smith"
              />
            </div>

            <div className="form-group">
              <label htmlFor="partner2Gender">Gender *</label>
              <select
                id="partner2Gender"
                name="partner2Gender"
                value={formData.partner2Gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Price Display */}
          <div className="price-box">
            <div className="price-label">Total Price (for 2 people):</div>
            <div className="price-amount">R{price.toLocaleString()}</div>
            <div className="price-note">
              {new Date() <= new Date('2026-02-28') ? '✓ Early bird pricing' : 'Regular pricing'}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            <button 
              type="button" 
              className="btn btn-back"
              onClick={() => onNavigate('choice')}
              disabled={loading}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CoupleRegistration;
