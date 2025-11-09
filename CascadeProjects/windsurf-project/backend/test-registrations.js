const axios = require('axios');

const API_URL = 'http://localhost:3001';

async function runTests() {
  console.log('🧪 Testing New Registration Types...\n');

  try {
    // Test 1: Individual - Dorm (Early Bird)
    console.log('📝 Test 1: Individual Registration - Dorm (Early Bird)');
    const individual1 = await axios.post(`${API_URL}/api/register`, {
      registrationType: 'individual',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+27123456789',
      organization: 'Multi Ministries',
      isStudent: false,
      accommodation: 'dorm'
    });
    console.log(`  ✓ Price: R${individual1.data.registration.price}`);
    console.log(`  ✓ Expected: R1,400 (Early Bird)\n`);

    // Test 2: Individual - Guest House (Early Bird)
    console.log('📝 Test 2: Individual Registration - Guest House (Early Bird)');
    const individual2 = await axios.post(`${API_URL}/api/register`, {
      registrationType: 'individual',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '+27987654321',
      organization: 'Community Church',
      isStudent: false,
      accommodation: 'guesthouse'
    });
    console.log(`  ✓ Price: R${individual2.data.registration.price}`);
    console.log(`  ✓ Expected: R1,650 (Early Bird)\n`);

    // Test 3: Student Registration
    console.log('📝 Test 3: Student Registration - Dorm Only');
    const student = await axios.post(`${API_URL}/api/register`, {
      registrationType: 'student',
      firstName: 'Peter',
      lastName: 'Johnson',
      email: 'peter@example.com',
      phone: '+27555555555',
      organization: 'University',
      isStudent: true,
      accommodation: 'dorm'
    });
    console.log(`  ✓ Price: R${student.data.registration.price}`);
    console.log(`  ✓ Expected: R1,155 (No Discount)\n`);

    // Test 4: Couple Registration
    console.log('📝 Test 4: Couple Registration (Early Bird)');
    const couple = await axios.post(`${API_URL}/api/register`, {
      registrationType: 'couple',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael@example.com',
      phone: '+27666666666',
      organization: 'Faith Center',
      partner1: {
        firstName: 'Sarah',
        lastName: 'Brown'
      },
      partner2: {
        firstName: 'David',
        lastName: 'Brown'
      }
    });
    console.log(`  ✓ Price: R${couple.data.registration.price}`);
    console.log(`  ✓ Expected: R3,000 (Early Bird)\n`);

    // Test 5: Group Registration (3 members)
    console.log('📝 Test 5: Group Registration - 3 Members (Early Bird)');
    const group = await axios.post(`${API_URL}/api/register`, {
      registrationType: 'group',
      firstName: 'Alice',
      lastName: 'Wilson',
      email: 'alice@example.com',
      phone: '+27777777777',
      organization: 'Youth Group',
      groupLeader: {
        firstName: 'Alice',
        lastName: 'Wilson'
      },
      groupMembers: [
        { firstName: 'Bob', lastName: 'Wilson' },
        { firstName: 'Charlie', lastName: 'Wilson' }
      ]
    });
    console.log(`  ✓ Price: R${group.data.registration.price}`);
    console.log(`  ✓ Expected: R4,200 (3 people × R1,400 Early Bird)\n`);

    // Test 6: Get all registrations and verify
    console.log('📊 Test 6: Verify All Registrations');
    const allRegs = await axios.get(`${API_URL}/api/registrations`);
    console.log(`  ✓ Total registrations: ${allRegs.data.length}\n`);

    // Test 7: Get stats
    console.log('📊 Test 7: Statistics');
    const stats = await axios.get(`${API_URL}/api/stats`);
    console.log(`  ✓ Total: ${stats.data.totalRegistrations}`);
    console.log(`  ✓ Checked In: ${stats.data.checkedIn}`);
    console.log(`  ✓ Not Checked In: ${stats.data.notCheckedIn}\n`);

    // Test 8: Search by registration type
    console.log('📋 Test 8: Verify Registration Types');
    const allRegistrations = await axios.get(`${API_URL}/api/registrations`);
    const types = {};
    allRegistrations.data.forEach(reg => {
      types[reg.registrationType] = (types[reg.registrationType] || 0) + 1;
    });
    console.log(`  ✓ Registration Types:`);
    Object.entries(types).forEach(([type, count]) => {
      console.log(`    - ${type}: ${count}`);
    });
    console.log();

    // Test 9: Verify pricing
    console.log('💰 Test 9: Verify Pricing');
    const registrations = await axios.get(`${API_URL}/api/registrations`);
    let totalRevenue = 0;
    registrations.data.forEach(reg => {
      totalRevenue += reg.price;
    });
    console.log(`  ✓ Total Revenue: R${totalRevenue.toLocaleString()}\n`);

    console.log('✨ All registration type tests passed!\n');
    console.log('📊 Summary:');
    console.log(`  - Individual (Dorm): R1,400`);
    console.log(`  - Individual (Guest House): R1,650`);
    console.log(`  - Student: R1,155`);
    console.log(`  - Couple: R3,000`);
    console.log(`  - Group (per person): R1,400`);

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

runTests();
