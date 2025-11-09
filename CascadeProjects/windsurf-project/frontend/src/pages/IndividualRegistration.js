import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function IndividualRegistration({ onNavigate, onPayment }) {
  const [isStudent, setIsStudent] = useState(false);
  const [accommodation, setAccommodation] = useState('dorm');
  const [price, setPrice] = useState(1400);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    gender: ''
  });

  // Calculate price based on selections
  useEffect(() => {
    const now = new Date();
    const earlyBirdDate = new Date('2026-02-28');
    const isEarlyBird = now <= earlyBirdDate;

    if (isStudent) {
      setPrice(1155);
    } else if (accommodation === 'dorm') {
      setPrice(isEarlyBird ? 1400 : 1650);
    } else if (accommodation === 'guesthouse') {
      setPrice(isEarlyBird ? 1650 : 1900);
    }
  }, [isStudent, accommodation]);

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
        registrationType: isStudent ? 'student' : 'individual',
        ...formData,
        isStudent,
        accommodation: isStudent ? 'dorm' : accommodation
      });

      setMessage('✓ Registration successful! Proceeding to payment...');
      
      // Navigate to payment page with registration data
      setTimeout(() => {
        onPayment({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          gender: formData.gender,
          registrationType: isStudent ? 'student' : 'individual',
          accommodation: isStudent ? 'dorm' : accommodation,
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
        <h2>Individual Registration</h2>

        {message && (
          <div className={message.includes('✓') ? 'success-message' : 'error-message'}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Student Option */}
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={isStudent}
                onChange={(e) => setIsStudent(e.target.checked)}
              />
              <span>I am a student</span>
            </label>
            {isStudent && (
              <p className="info-text">✓ Student accommodation: Dormitories only (R1,155)</p>
            )}
          </div>

          {/* Personal Information */}
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

          {/* Gender Selection */}
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

          {/* Accommodation Selection (not for students) */}
          {!isStudent && (
            <div className="form-group">
              <label htmlFor="accommodation">Accommodation *</label>
              <select
                id="accommodation"
                value={accommodation}
                onChange={(e) => setAccommodation(e.target.value)}
                required
              >
                <option value="dorm">Dormitories</option>
                <option value="guesthouse">Guest House</option>
              </select>
            </div>
          )}

          {/* Price Display */}
          <div className="price-box">
            <div className="price-label">Total Price:</div>
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

export default IndividualRegistration;
