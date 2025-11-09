import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function GroupRegistration({ onNavigate, onPayment }) {
  const [price, setPrice] = useState(1400);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [memberCount, setMemberCount] = useState(1);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    gender: '',
    members: [{ firstName: '', lastName: '', gender: '' }]
  });

  // Calculate price per member
  useEffect(() => {
    const now = new Date();
    const earlyBirdDate = new Date('2026-02-28');
    const isEarlyBird = now <= earlyBirdDate;
    const pricePerMember = isEarlyBird ? 1400 : 1650;
    setPrice(pricePerMember * (memberCount + 1)); // +1 for leader
  }, [memberCount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...formData.members];
    newMembers[index][field] = value;
    setFormData(prev => ({
      ...prev,
      members: newMembers
    }));
  };

  const addMember = () => {
    setFormData(prev => ({
      ...prev,
      members: [...prev.members, { firstName: '', lastName: '', gender: '' }]
    }));
    setMemberCount(memberCount + 1);
  };

  const removeMember = (index) => {
    if (formData.members.length > 1) {
      const newMembers = formData.members.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        members: newMembers
      }));
      setMemberCount(memberCount - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post(`${API_URL}/api/register`, {
        registrationType: 'group',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        groupLeader: {
          firstName: formData.firstName,
          lastName: formData.lastName
        },
        groupMembers: formData.members
      });

      setMessage('✓ Group registration successful! Proceeding to payment...');
      
      // Navigate to payment page with registration data
      setTimeout(() => {
        onPayment({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          gender: formData.gender,
          registrationType: 'group',
          groupLeader: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            gender: formData.gender
          },
          groupMembers: formData.members,
          memberCount: memberCount,
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
        <h2>Group Registration</h2>

        {message && (
          <div className={message.includes('✓') ? 'success-message' : 'error-message'}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Group Leader */}
          <div className="form-section">
            <h3>Group Leader</h3>

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

          {/* Group Members */}
          <div className="form-section">
            <h3>Group Members ({formData.members.length})</h3>

            {formData.members.map((member, index) => (
              <div key={index} className="member-card">
                <div className="member-header">
                  <span>Member {index + 1}</span>
                  {formData.members.length > 1 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeMember(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    value={member.firstName}
                    onChange={(e) => handleMemberChange(index, 'firstName', e.target.value)}
                    required
                    placeholder="Jane"
                  />
                </div>

                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    value={member.lastName}
                    onChange={(e) => handleMemberChange(index, 'lastName', e.target.value)}
                    required
                    placeholder="Doe"
                  />
                </div>

                <div className="form-group">
                  <label>Gender *</label>
                  <select
                    value={member.gender}
                    onChange={(e) => handleMemberChange(index, 'gender', e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-secondary"
              onClick={addMember}
              style={{ marginTop: '15px' }}
            >
              + Add Member
            </button>
          </div>

          {/* Price Display */}
          <div className="price-box">
            <div className="price-label">Total Price ({memberCount + 1} people):</div>
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

export default GroupRegistration;
