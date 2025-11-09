import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function AdminDashboard({ onNavigate }) {
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({ totalRegistrations: 0, checkedIn: 0, notCheckedIn: 0 });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [regsResponse, statsResponse] = await Promise.all([
        axios.get(`${API_URL}/api/registrations`),
        axios.get(`${API_URL}/api/stats`)
      ]);
      setRegistrations(regsResponse.data);
      setStats(statsResponse.data);
    } catch (error) {
      setMessage('✗ Failed to load data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      setMessage('✗ Delete failed: No ID found');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this registration?')) {
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/api/registrations/${id}`);
      if (response.data.success) {
        setMessage('✓ Registration deleted successfully');
        fetchData();
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage('✗ Delete failed: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Delete failed';
      setMessage('✗ ' + errorMsg);
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (registration) => {
    setEditingId(registration.id);
    setEditData({
      firstName: registration.firstName,
      lastName: registration.lastName,
      email: registration.email,
      phone: registration.phone,
      organization: registration.organization
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`${API_URL}/api/registrations/${id}`, editData);
      setMessage('✓ Registration updated');
      setEditingId(null);
      fetchData();
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('✗ Update failed');
      console.error('Update error:', error);
    }
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
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
      setMessage('✓ CSV exported');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('✗ Export failed');
      console.error('Export error:', error);
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.phone.includes(searchTerm)
  );

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <button 
            className="btn btn-back"
            onClick={() => onNavigate('landing')}
            style={{ marginTop: 0 }}
          >
            Back
          </button>
        </div>

        {message && (
          <div className={message.includes('✓') ? 'success-message' : 'error-message'}>
            {message}
          </div>
        )}

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalRegistrations}</div>
            <div className="stat-label">Total Registrations</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#4caf50' }}>{stats.checkedIn}</div>
            <div className="stat-label">Checked In</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#ff9800' }}>{stats.notCheckedIn}</div>
            <div className="stat-label">Not Checked In</div>
          </div>
          {stats.byType && (
            <>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#1B3A6B' }}>{stats.byType.individual}</div>
                <div className="stat-label">Individual</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#E85D04' }}>{stats.byType.couple}</div>
                <div className="stat-label">Couple</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#9c27b0' }}>{stats.byType.group}</div>
                <div className="stat-label">Group</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#00bcd4' }}>{stats.byType.student}</div>
                <div className="stat-label">Student</div>
              </div>
            </>
          )}
          {stats.byGender && (
            <>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#1B3A6B' }}>{stats.byGender.male}</div>
                <div className="stat-label">Male</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#E85D04' }}>{stats.byGender.female}</div>
                <div className="stat-label">Female</div>
              </div>
            </>
          )}
          {stats.groupStats && (
            <>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#9c27b0' }}>{stats.groupStats.groupCount}</div>
                <div className="stat-label">Groups</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#ff5722' }}>{stats.groupStats.totalGroupMembers}</div>
                <div className="stat-label">Group Members</div>
              </div>
            </>
          )}
          {stats.capacity && (
            <>
              <div className="stat-card">
                <div className="stat-number">{stats.capacity.guestHouse.available}/{stats.capacity.guestHouse.limit}</div>
                <div className="stat-label">Guest House Available</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.capacity.couple.available}/{stats.capacity.couple.limit}</div>
                <div className="stat-label">Couple Available</div>
              </div>
            </>
          )}
        </div>

        {/* Search and Export */}
        <div className="admin-controls">
          <input
            type="text"
            placeholder="Search registrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button 
            className="btn btn-primary"
            onClick={handleExportCSV}
          >
            Export to CSV
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => onNavigate('checkin')}
          >
            Check In
          </button>
        </div>

        {/* Registrations Table */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#999' }}>Loading...</p>
        ) : filteredRegistrations.length > 0 ? (
          <div className="registrations-table">
            <div className="table-header">
              <div className="col-name">Name</div>
              <div className="col-email">Email</div>
              <div className="col-phone">Phone</div>
              <div className="col-gender">Gender</div>
              <div className="col-type">Type</div>
              <div className="col-status">Status</div>
              <div className="col-actions">Actions</div>
            </div>

            {filteredRegistrations.map(registration => (
              <div key={registration.id} className="table-row">
                {editingId === registration.id ? (
                  <>
                    <div className="col-name">
                      <input
                        type="text"
                        value={editData.firstName}
                        onChange={(e) => handleEditChange('firstName', e.target.value)}
                        placeholder="First name"
                      />
                      <input
                        type="text"
                        value={editData.lastName}
                        onChange={(e) => handleEditChange('lastName', e.target.value)}
                        placeholder="Last name"
                      />
                    </div>
                    <div className="col-email">
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleEditChange('email', e.target.value)}
                        placeholder="Email"
                      />
                    </div>
                    <div className="col-phone">
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => handleEditChange('phone', e.target.value)}
                        placeholder="Phone"
                      />
                    </div>
                    <div className="col-gender">
                      <span style={{ textTransform: 'capitalize' }}>
                        {registration.gender || '-'}
                      </span>
                    </div>
                    <div className="col-org">
                      <input
                        type="text"
                        value={editData.organization}
                        onChange={(e) => handleEditChange('organization', e.target.value)}
                        placeholder="Organization"
                      />
                    </div>
                    <div className="col-type">
                      <span className="type-badge">{registration.registrationType}</span>
                    </div>
                    <div className="col-status">
                      <span className={`status-badge ${registration.checkedIn ? 'checked-in' : 'pending'}`}>
                        {registration.checkedIn ? '✓ Checked In' : 'Pending'}
                      </span>
                    </div>
                    <div className="col-actions">
                      <button 
                        className="action-btn save-btn"
                        onClick={() => handleSaveEdit(registration.id)}
                      >
                        Save
                      </button>
                      <button 
                        className="action-btn cancel-btn"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-name">
                      {registration.firstName} {registration.lastName}
                      {registration.registrationType === 'couple' && registration.partner1 && (
                        <div style={{ fontSize: '0.85rem', color: '#999', marginTop: '4px' }}>
                          + {registration.partner1.firstName} {registration.partner1.lastName}
                          {registration.partner2 && ` + ${registration.partner2.firstName} ${registration.partner2.lastName}`}
                        </div>
                      )}
                      {registration.registrationType === 'group' && registration.groupMembers && (
                        <div style={{ fontSize: '0.85rem', color: '#999', marginTop: '4px' }}>
                          <strong>Group ({registration.groupMembers.length + 1} members):</strong>
                          <div style={{ marginTop: '2px' }}>
                            • {registration.firstName} {registration.lastName} (Leader)
                            {registration.groupMembers.map((member, idx) => (
                              <div key={idx}>• {member.firstName} {member.lastName}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-email">{registration.email}</div>
                    <div className="col-phone">{registration.phone}</div>
                    <div className="col-gender">
                      <span style={{
                        textTransform: 'capitalize',
                        fontWeight: '600',
                        color: registration.gender === 'male' ? '#1B3A6B' : '#E85D04'
                      }}>
                        {registration.gender || '-'}
                      </span>
                    </div>
                    <div className="col-type">
                      <span className="type-badge" style={{
                        background: registration.registrationType === 'couple' ? '#E85D04' :
                                   registration.registrationType === 'group' ? '#9c27b0' :
                                   registration.registrationType === 'student' ? '#00bcd4' : '#1B3A6B',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        display: 'inline-block'
                      }}>
                        {registration.registrationType.charAt(0).toUpperCase() + registration.registrationType.slice(1)}
                      </span>
                    </div>
                    <div className="col-status">
                      <span className={`status-badge ${registration.checkedIn ? 'checked-in' : 'pending'}`}>
                        {registration.checkedIn ? '✓ Checked In' : 'Pending'}
                      </span>
                    </div>
                    <div className="col-actions">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(registration)}
                      >
                        Edit
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(registration.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
            No registrations found
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
