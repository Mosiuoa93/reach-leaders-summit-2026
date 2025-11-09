const axios = require('axios');

const API_URL = 'http://localhost:3001';

// Test data
const testRegistrations = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+27123456789',
    organization: 'Multi Ministries'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '+27987654321',
    organization: 'Community Church'
  },
  {
    firstName: 'Peter',
    lastName: 'Johnson',
    email: 'peter@example.com',
    phone: '+27555555555',
    organization: 'Faith Center'
  }
];

async function runTests() {
  console.log('🧪 Starting API Tests...\n');

  try {
    // Test 1: Register participants
    console.log('📝 Test 1: Registering participants...');
    const registeredIds = [];
    for (const reg of testRegistrations) {
      const response = await axios.post(`${API_URL}/api/register`, reg);
      registeredIds.push(response.data.registration.id);
      console.log(`  ✓ Registered: ${reg.firstName} ${reg.lastName}`);
    }
    console.log();

    // Test 2: Get all registrations
    console.log('📋 Test 2: Fetching all registrations...');
    const allRegs = await axios.get(`${API_URL}/api/registrations`);
    console.log(`  ✓ Total registrations: ${allRegs.data.length}`);
    console.log();

    // Test 3: Search functionality
    console.log('🔍 Test 3: Testing search...');
    const searchResult = await axios.get(`${API_URL}/api/search?query=john`);
    console.log(`  ✓ Search for "john": ${searchResult.data.length} results`);
    console.log();

    // Test 4: Get stats
    console.log('📊 Test 4: Fetching statistics...');
    const stats = await axios.get(`${API_URL}/api/stats`);
    console.log(`  ✓ Total: ${stats.data.totalRegistrations}`);
    console.log(`  ✓ Checked In: ${stats.data.checkedIn}`);
    console.log(`  ✓ Not Checked In: ${stats.data.notCheckedIn}`);
    console.log();

    // Test 5: Check-in
    console.log('✅ Test 5: Testing check-in...');
    const checkinResult = await axios.post(`${API_URL}/api/checkin/${registeredIds[0]}`);
    console.log(`  ✓ Checked in: ${checkinResult.data.registration.firstName}`);
    console.log();

    // Test 6: Update registration
    console.log('✏️ Test 6: Testing update...');
    const updateResult = await axios.put(`${API_URL}/api/registrations/${registeredIds[1]}`, {
      firstName: 'Jane',
      lastName: 'Smith-Updated',
      email: 'jane.updated@example.com',
      phone: '+27987654321',
      organization: 'Updated Church'
    });
    console.log(`  ✓ Updated: ${updateResult.data.registration.lastName}`);
    console.log();

    // Test 7: Export CSV
    console.log('📥 Test 7: Testing CSV export...');
    const csvResult = await axios.get(`${API_URL}/api/export/csv`, {
      responseType: 'blob'
    });
    console.log(`  ✓ CSV exported: ${csvResult.data.size} bytes`);
    console.log();

    // Test 8: Delete registration
    console.log('🗑️ Test 8: Testing delete...');
    const deleteResult = await axios.delete(`${API_URL}/api/registrations/${registeredIds[2]}`);
    console.log(`  ✓ Deleted: ${deleteResult.data.deleted.firstName}`);
    console.log();

    // Test 9: Final stats
    console.log('📊 Test 9: Final statistics...');
    const finalStats = await axios.get(`${API_URL}/api/stats`);
    console.log(`  ✓ Total: ${finalStats.data.totalRegistrations}`);
    console.log(`  ✓ Checked In: ${finalStats.data.checkedIn}`);
    console.log(`  ✓ Not Checked In: ${finalStats.data.notCheckedIn}`);
    console.log();

    console.log('✨ All tests passed!\n');
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

runTests();
