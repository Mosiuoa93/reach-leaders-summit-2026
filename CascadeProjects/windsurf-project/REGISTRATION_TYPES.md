# REACH 2025 - Registration Types & Pricing

## Overview
The registration system now supports 4 distinct registration types with dynamic pricing based on accommodation preferences and early bird status.

---

## Registration Types

### 1. Individual Registration
**For single participants**

#### Options:
- **Accommodation Choice**:
  - Dormitories (Dorm)
  - Guest House

#### Pricing (Early Bird until 28 Feb 2026):
- Dorm: R1,400 (Early Bird) / R1,650 (Regular)
- Guest House: R1,650 (Early Bird) / R1,900 (Regular)

#### Form Fields:
- First Name *
- Last Name *
- Email *
- Phone *
- Organization
- Student Checkbox
- Accommodation Selection

#### Features:
- ✓ Real-time price calculation
- ✓ Student option available
- ✓ Automatic early bird detection
- ✓ Accommodation preference display

---

### 2. Student Registration
**For students (special pricing)**

#### Options:
- **Accommodation**: Dormitories Only (No choice)

#### Pricing:
- Fixed: R1,155 (No early bird discount)

#### Form Fields:
- Same as Individual
- Student checkbox automatically checked
- Accommodation locked to "Dormitories"

#### Features:
- ✓ Fixed price (no discounts)
- ✓ Dorm accommodation only
- ✓ Clear student pricing display

---

### 3. Couple Registration
**For couples registering together**

#### Options:
- Register as a couple (2 people)
- Include both partners' information

#### Pricing (Early Bird until 28 Feb 2026):
- Early Bird: R3,000 (for 2 people)
- Regular: R3,500 (for 2 people)

#### Form Fields:
- Primary Contact Information:
  - First Name *
  - Last Name *
  - Email *
  - Phone *
  - Organization
- Partner 1 Information:
  - First Name *
  - Last Name *
- Partner 2 Information:
  - First Name *
  - Last Name *

#### Features:
- ✓ Single price for both partners
- ✓ All three people's info captured
- ✓ Automatic early bird pricing
- ✓ Clear couple pricing display

---

### 4. Group Registration
**For groups of 3+ participants**

#### Options:
- Register as a group (Leader + Members)
- Add/remove members dynamically
- Flexible group size

#### Pricing (Early Bird until 28 Feb 2026):
- Per Person: R1,400 (Early Bird) / R1,650 (Regular)
- Total = Price per person × Number of people (Leader + Members)

#### Form Fields:
- Group Leader Information:
  - First Name *
  - Last Name *
  - Email *
  - Phone *
  - Organization
- Group Members (Dynamic):
  - Member 1: First Name *, Last Name *
  - Member 2: First Name *, Last Name *
  - ... (Add/Remove buttons)

#### Features:
- ✓ Dynamic member management
- ✓ Add/remove members on the fly
- ✓ Real-time price calculation
- ✓ Price multiplied by total participants
- ✓ Automatic early bird pricing

---

## User Flow

```
Landing Page
    ↓
[Register Button]
    ↓
Choice Page (Select Registration Type)
    ├─→ Individual
    ├─→ Couple
    └─→ Group
    ↓
Registration Form (Type-Specific)
    ├─ Individual Form
    │  ├─ Student checkbox
    │  └─ Accommodation selection
    ├─ Couple Form
    │  ├─ Primary contact
    │  ├─ Partner 1
    │  └─ Partner 2
    └─ Group Form
       ├─ Group leader
       └─ Members (dynamic)
    ↓
Price Calculation & Display
    ↓
Submit Registration
    ↓
Success Message
    ↓
Redirect to Landing
```

---

## Backend Implementation

### New Endpoints
- `POST /api/register` - Updated to handle all registration types

### Pricing Configuration
```javascript
PRICING = {
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
    DORM: 1155
  },
  GROUP: {
    earlyBird: 1400,
    regular: 1650
  }
}
```

### Registration Data Structure
```javascript
{
  id: "uuid",
  registrationType: "individual|student|couple|group",
  firstName: "string",
  lastName: "string",
  email: "string",
  phone: "string",
  organization: "string",
  isStudent: boolean,
  accommodation: "dorm|guesthouse|null",
  partner1: { firstName, lastName } | null,
  partner2: { firstName, lastName } | null,
  groupLeader: { firstName, lastName } | null,
  groupMembers: [ { firstName, lastName }, ... ] | [],
  price: number,
  registeredAt: "ISO timestamp",
  checkedIn: boolean,
  checkedInAt: "ISO timestamp | null"
}
```

---

## Frontend Components

### New Pages
1. **ChoicePage.js** - Registration type selection
2. **IndividualRegistration.js** - Individual/Student form
3. **CoupleRegistration.js** - Couple registration form
4. **GroupRegistration.js** - Group registration form

### Updated Pages
- **LandingPage.js** - Navigate to choice page instead of form
- **App.js** - Routes for all new pages

### Styling
- **App.css** - Added styles for:
  - Choice page grid layout
  - Form sections
  - Price boxes
  - Member cards
  - Checkbox groups
  - Select dropdowns

---

## Test Results

### All Tests Passed ✅

| Test | Type | Price | Status |
|------|------|-------|--------|
| Individual - Dorm | Early Bird | R1,400 | ✅ |
| Individual - Guest House | Early Bird | R1,650 | ✅ |
| Student - Dorm | Fixed | R1,155 | ✅ |
| Couple | Early Bird | R3,000 | ✅ |
| Group (3 people) | Early Bird | R4,200 | ✅ |

**Total Revenue from Tests**: R11,405

---

## Key Features

### Dynamic Pricing
- ✓ Automatic early bird detection
- ✓ Real-time price updates
- ✓ Group price multiplied by member count
- ✓ Student fixed pricing (no discounts)

### User Experience
- ✓ Clear registration type choices
- ✓ Intuitive form layouts
- ✓ Price displayed prominently
- ✓ Early bird status indicated
- ✓ Mobile responsive

### Data Management
- ✓ All registration types stored
- ✓ Price recorded at registration time
- ✓ Searchable by registration type
- ✓ Exportable to CSV

---

## Admin Dashboard Updates

The admin dashboard now displays:
- Registration type for each participant
- Accommodation preference (if applicable)
- Price paid
- Partner/member information
- Ability to edit all fields
- Filter by registration type

---

## Next Steps

1. ✅ All registration types implemented
2. ✅ Pricing system working correctly
3. ✅ Tests passing
4. Ready for deployment
5. Consider: Email confirmations, payment integration, badges/QR codes

---

## Notes

- Early bird period: Until 28 February 2026
- Student pricing has no discount (fixed at R1,155)
- Group pricing is per person (multiplied by total count)
- All prices in South African Rand (R)
- System automatically detects early bird status
