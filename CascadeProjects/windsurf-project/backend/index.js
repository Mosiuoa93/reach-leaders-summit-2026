const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const dataDir = path.join(__dirname, 'data');
const registrationsFile = path.join(dataDir, 'registrations.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize registrations file
if (!fs.existsSync(registrationsFile)) {
  fs.writeFileSync(registrationsFile, JSON.stringify([], null, 2));
}

// Helper functions
const getRegistrations = () => {
  const data = fs.readFileSync(registrationsFile, 'utf-8');
  return JSON.parse(data);
};

const saveRegistrations = (registrations) => {
  fs.writeFileSync(registrationsFile, JSON.stringify(registrations, null, 2));
};

// Routes

// Pricing configuration
const PRICING = {
  EARLY_BIRD_DATE: '2026-02-28',
  INDIVIDUAL: {
    DORM: { earlyBird: 1400, regular: 1650 },
    GUESTHOUSE: { earlyBird: 1650, regular: 1900 }
  },
  COUPLE: {
    earlyBird: 3000,
    regular: 3500
  },
  STUDENT: {
    DORM: 1155 // No discount
  },
  GROUP: {
    earlyBird: 1400,
    regular: 1650
  }
};

// Capacity limits
const CAPACITY_LIMITS = {
  GUESTHOUSE: 120,
  COUPLE: 74
};

// Helper function to calculate price
const calculatePrice = (registrationType, options = {}) => {
  const now = new Date();
  const earlyBirdDate = new Date(PRICING.EARLY_BIRD_DATE);
  const isEarlyBird = now <= earlyBirdDate;

  switch (registrationType) {
    case 'student':
      return PRICING.STUDENT.DORM;
    case 'individual':
      const accommodation = options.accommodation || 'dorm';
      if (accommodation === 'dorm') {
        return isEarlyBird ? PRICING.INDIVIDUAL.DORM.earlyBird : PRICING.INDIVIDUAL.DORM.regular;
      } else if (accommodation === 'guesthouse') {
        return isEarlyBird ? PRICING.INDIVIDUAL.GUESTHOUSE.earlyBird : PRICING.INDIVIDUAL.GUESTHOUSE.regular;
      }
      break;
    case 'couple':
      return isEarlyBird ? PRICING.COUPLE.earlyBird : PRICING.COUPLE.regular;
    case 'group':
      const pricePerPerson = isEarlyBird ? PRICING.GROUP.earlyBird : PRICING.GROUP.regular;
      const memberCount = (options.groupMembers ? options.groupMembers.length : 0) + 1; // +1 for leader
      return pricePerPerson * memberCount;
    default:
      return 0;
  }
};

// Helper function to check capacity
const checkCapacity = (registrationType, accommodation, registrations) => {
  if (registrationType === 'individual' && accommodation === 'guesthouse') {
    const guestHouseCount = registrations.filter(
      reg => reg.registrationType === 'individual' && reg.accommodation === 'guesthouse'
    ).length;
    return {
      available: guestHouseCount < CAPACITY_LIMITS.GUESTHOUSE,
      current: guestHouseCount,
      limit: CAPACITY_LIMITS.GUESTHOUSE,
      type: 'Guest House'
    };
  }
  
  if (registrationType === 'couple') {
    const coupleCount = registrations.filter(reg => reg.registrationType === 'couple').length;
    return {
      available: coupleCount < CAPACITY_LIMITS.COUPLE,
      current: coupleCount,
      limit: CAPACITY_LIMITS.COUPLE,
      type: 'Couple'
    };
  }
  
  return { available: true, current: 0, limit: null, type: null };
};

// Register a participant
app.post('/api/register', (req, res) => {
  try {
    const { registrationType, firstName, lastName, email, phone, organization, isStudent, accommodation, groupLeader, groupMembers, partner1, partner2 } = req.body;

    // Validation
    if (!registrationType || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const registrations = getRegistrations();
    
    // Check capacity
    const capacityCheck = checkCapacity(registrationType, accommodation, registrations);
    if (!capacityCheck.available) {
      return res.status(400).json({ 
        error: `${capacityCheck.type} registration is full (${capacityCheck.current}/${capacityCheck.limit} slots taken)`,
        capacityFull: true,
        current: capacityCheck.current,
        limit: capacityCheck.limit
      });
    }
    
    const price = calculatePrice(registrationType, { accommodation, groupMembers });

    const newRegistration = {
      id: uuidv4(),
      registrationType,
      firstName,
      lastName,
      email,
      phone,
      organization,
      gender: req.body.gender || null,
      isStudent,
      accommodation,
      price,
      registeredAt: new Date().toISOString(),
      checkedIn: false,
      checkedInAt: null,
      // Couple registration data
      partner1: partner1 || null,
      partner2: partner2 || null,
      // Group registration data
      groupLeader: groupLeader || null,
      groupMembers: groupMembers || null
    };

    registrations.push(newRegistration);
    saveRegistrations(registrations);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      registration: newRegistration
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Get all registrations
app.get('/api/registrations', (req, res) => {
  try {
    const registrations = getRegistrations();
    res.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// Search registrations (for check-in)
app.get('/api/search', (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.length < 2) {
      return res.status(400).json({ error: 'Query must be at least 2 characters' });
    }

    const registrations = getRegistrations();
    const results = registrations.filter(reg =>
      reg.firstName.toLowerCase().includes(query.toLowerCase()) ||
      reg.lastName.toLowerCase().includes(query.toLowerCase()) ||
      reg.email.toLowerCase().includes(query.toLowerCase()) ||
      reg.phone.includes(query)
    );

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Check in a participant
app.post('/api/checkin/:id', (req, res) => {
  try {
    const { id } = req.params;
    const registrations = getRegistrations();
    
    const registration = registrations.find(reg => reg.id === id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    registration.checkedIn = true;
    registration.checkedInAt = new Date().toISOString();
    
    saveRegistrations(registrations);

    res.json({
      success: true,
      message: 'Check-in successful',
      registration
    });
  } catch (error) {
    console.error('Check-in error:', error);
    res.status(500).json({ error: 'Check-in failed' });
  }
});

// Export to CSV
app.get('/api/export/csv', (req, res) => {
  try {
    const registrations = getRegistrations();

    if (registrations.length === 0) {
      return res.status(400).json({ error: 'No registrations to export' });
    }

    const fields = ['id', 'firstName', 'lastName', 'email', 'phone', 'organization', 'registeredAt', 'checkedIn', 'checkedInAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(registrations);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=registrations.csv');
    res.send(csv);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Export failed' });
  }
});

// Get capacity information
app.get('/api/capacity', (req, res) => {
  try {
    const registrations = getRegistrations();
    
    const guestHouseCount = registrations.filter(
      reg => reg.registrationType === 'individual' && reg.accommodation === 'guesthouse'
    ).length;
    
    const coupleCount = registrations.filter(
      reg => reg.registrationType === 'couple'
    ).length;

    res.json({
      guestHouse: {
        current: guestHouseCount,
        limit: CAPACITY_LIMITS.GUESTHOUSE,
        available: CAPACITY_LIMITS.GUESTHOUSE - guestHouseCount,
        isFull: guestHouseCount >= CAPACITY_LIMITS.GUESTHOUSE
      },
      couple: {
        current: coupleCount,
        limit: CAPACITY_LIMITS.COUPLE,
        available: CAPACITY_LIMITS.COUPLE - coupleCount,
        isFull: coupleCount >= CAPACITY_LIMITS.COUPLE
      }
    });
  } catch (error) {
    console.error('Capacity error:', error);
    res.status(500).json({ error: 'Failed to fetch capacity' });
  }
});

// Get statistics
app.get('/api/stats', (req, res) => {
  try {
    const registrations = getRegistrations();
    const checkedIn = registrations.filter(reg => reg.checkedIn).length;
    
    // Breakdown by registration type
    const individual = registrations.filter(reg => reg.registrationType === 'individual').length;
    const couple = registrations.filter(reg => reg.registrationType === 'couple').length;
    const group = registrations.filter(reg => reg.registrationType === 'group').length;
    const student = registrations.filter(reg => reg.registrationType === 'student').length;
    
    // Capacity tracking
    const guestHouseCount = registrations.filter(
      reg => reg.registrationType === 'individual' && reg.accommodation === 'guesthouse'
    ).length;
    const coupleCount = registrations.filter(reg => reg.registrationType === 'couple').length;

    res.json({
      totalRegistrations: registrations.length,
      checkedIn,
      notCheckedIn: registrations.length - checkedIn,
      byType: {
        individual,
        couple,
        group,
        student
      },
      capacity: {
        guestHouse: {
          current: guestHouseCount,
          limit: 120,
          available: 120 - guestHouseCount
        },
        couple: {
          current: coupleCount,
          limit: 74,
          available: 74 - coupleCount
        }
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Delete a registration
app.delete('/api/registrations/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || id === 'undefined') {
      return res.status(400).json({ error: 'Invalid registration ID' });
    }

    const registrations = getRegistrations();
    
    const index = registrations.findIndex(reg => reg.id === id);
    if (index === -1) {
      console.log(`Registration not found with ID: ${id}`);
      console.log(`Available IDs: ${registrations.map(r => r.id).join(', ')}`);
      return res.status(404).json({ error: 'Registration not found' });
    }

    const deleted = registrations.splice(index, 1);
    saveRegistrations(registrations);

    res.json({
      success: true,
      message: 'Registration deleted successfully',
      deleted: deleted[0]
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Delete failed: ' + error.message });
  }
});

// Update a registration
app.put('/api/registrations/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, organization } = req.body;
    const registrations = getRegistrations();
    
    const registration = registrations.find(reg => reg.id === id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    registration.firstName = firstName || registration.firstName;
    registration.lastName = lastName || registration.lastName;
    registration.email = email || registration.email;
    registration.phone = phone || registration.phone;
    registration.organization = organization || registration.organization;
    
    saveRegistrations(registrations);

    res.json({
      success: true,
      message: 'Registration updated',
      registration
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Update failed' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
