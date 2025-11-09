import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function CheckInPage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState({ totalRegistrations: 0, checkedIn: 0, notCheckedIn: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setMessage('');

    if (query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/search`, {
        params: { query }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (id) => {
    try {
      await axios.post(`${API_URL}/api/checkin/${id}`);
      setMessage('✓ Check-in successful!');
      
      // Update results
      setResults(results.map(r => 
        r.id === id ? { ...r, checkedIn: true, checkedInAt: new Date().toISOString() } : r
      ));

      // Refresh stats
      fetchStats();

      // Clear message after 2 seconds
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('✗ Check-in failed. Please try again.');
      console.error('Check-in error:', error);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/export/csv`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `registrations-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentChild.removeChild(link);
    } catch (error) {
      setMessage('✗ Export failed. Please try again.');
      console.error('Export error:', error);
    }
  };

  return (
    <div className="checkin-container">
      <div className="checkin-card">
        <h2>Check In</h2>

        {message && (
          <div className={message.includes('✓') ? 'success-message' : 'error-message'}>
            {message}
          </div>
        )}

        <div style={{ 
          background: '#f0f4ff', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#667eea', fontWeight: 'bold', marginBottom: '5px' }}>
            Total Registered: {stats.totalRegistrations}
          </p>
          <p style={{ color: '#4caf50', fontSize: '0.9rem' }}>
            ✓ Checked In: {stats.checkedIn}
          </p>
          <p style={{ color: '#ff9800', fontSize: '0.9rem' }}>
            ○ Not Checked In: {stats.notCheckedIn}
          </p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {loading && <p style={{ textAlign: 'center', color: '#999' }}>Searching...</p>}

        <div className="search-results">
          {results.length > 0 ? (
            results.map(person => (
              <div key={person.id} className="result-item">
                <div className="result-info">
                  <h3>{person.firstName} {person.lastName}</h3>
                  <p>{person.email}</p>
                  <p>{person.phone}</p>
                  {person.organization && <p>{person.organization}</p>}
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span className={`result-status ${person.checkedIn ? 'status-checked-in' : 'status-not-checked-in'}`}>
                    {person.checkedIn ? '✓ Checked In' : 'Pending'}
                  </span>
                  {!person.checkedIn && (
                    <button 
                      className="checkin-btn"
                      onClick={() => handleCheckIn(person.id)}
                    >
                      Check In
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : searchQuery.length >= 2 ? (
            <div className="no-results">
              <p>No registrations found</p>
            </div>
          ) : (
            <div className="no-results">
              <p>Enter at least 2 characters to search</p>
            </div>
          )}
        </div>

        <div className="form-actions" style={{ marginTop: '30px' }}>
          <button 
            className="btn btn-primary"
            onClick={handleExportCSV}
            style={{ flex: 1 }}
          >
            Export to CSV
          </button>
          <button 
            className="btn btn-back"
            onClick={() => onNavigate('landing')}
            style={{ flex: 1 }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckInPage;
