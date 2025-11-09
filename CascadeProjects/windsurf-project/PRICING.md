# REACH 2025 - Pricing Structure

## Overview
- **Early Bird Period**: Until 28 February 2026
- **Regular Period**: From 1 March 2026 onwards

---

## Individual Registration

### Standard Individual
- **Accommodation**: Dormitories
  - Early Bird: **R1,400**
  - Regular: **R1,650**

- **Accommodation**: Guest House
  - Early Bird: **R1,650**
  - Regular: **R1,900**

### Student Registration
- **Accommodation**: Dormitories Only
  - **R1,155** (No discount - fixed price)

---

## Couple Registration
- **Early Bird**: **R3,000** (for 2 people)
- **Regular**: **R3,500** (for 2 people)

---

## Group Registration
- **Per Person** (Leader + Members)
  - Early Bird: **R1,400** per person
  - Regular: **R1,650** per person

**Example**: Group of 5 people
- Early Bird: 5 × R1,400 = **R7,000**
- Regular: 5 × R1,650 = **R8,250**

---

## Pricing Summary Table

| Registration Type | Accommodation | Early Bird | Regular |
|---|---|---|---|
| Individual | Dormitories | R1,400 | R1,650 |
| Individual | Guest House | R1,650 | R1,900 |
| Student | Dormitories | R1,155 | R1,155 |
| Couple | - | R3,000 | R3,500 |
| Group (per person) | - | R1,400 | R1,650 |

---

## Key Features

### Individual Registration
- ✓ Choose between Dormitories or Guest House
- ✓ Student option (Dormitories only, fixed price)
- ✓ Automatic price calculation based on selection
- ✓ Early bird discount applied automatically

### Couple Registration
- ✓ Register as a couple (2 people)
- ✓ Includes both partners' information
- ✓ Single price for both participants
- ✓ Early bird discount available

### Group Registration
- ✓ Register as a group (Leader + Members)
- ✓ Add/remove members dynamically
- ✓ Price calculated per person
- ✓ Early bird discount applied to all members

---

## How Pricing Works

1. **Early Bird Detection**
   - System automatically checks current date
   - If date ≤ 28 February 2026: Early bird pricing applied
   - If date > 28 February 2026: Regular pricing applied

2. **Student Pricing**
   - Student checkbox available for individual registration
   - When checked: Dormitories only, R1,155 fixed price
   - No early bird discount for students

3. **Group Pricing**
   - Price multiplied by number of participants (leader + members)
   - Each member gets the same rate
   - Early bird discount applies to all

4. **Dynamic Calculation**
   - Price updates in real-time as user makes selections
   - Displayed in prominent price box before submission
   - Shows whether early bird or regular pricing is active

---

## Backend Implementation

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

### Price Calculation Function
- Checks current date against early bird date
- Applies appropriate pricing based on registration type
- Stores price in registration record
- Used for reporting and analytics

---

## Registration Data Storage

Each registration includes:
- `registrationType`: 'individual', 'student', 'couple', or 'group'
- `price`: Calculated price at time of registration
- `accommodation`: 'dorm' or 'guesthouse' (individual only)
- `isStudent`: Boolean flag for student registrations
- `partner1`, `partner2`: Partner details (couple only)
- `groupLeader`, `groupMembers`: Group details (group only)

---

## Reporting & Analytics

### Available Reports
- Total revenue by registration type
- Early bird vs regular pricing breakdown
- Accommodation preferences (dorm vs guest house)
- Student vs non-student breakdown
- Group size distribution

### CSV Export
- Includes price for each registration
- Filterable by registration type
- Can be analyzed in Excel/Sheets

---

## Notes

- All prices are in South African Rand (R)
- Prices are fixed until 28 February 2026
- Student pricing has no discount (fixed at R1,155)
- Group pricing is per person (leader + members)
- Early bird discount is automatic based on registration date
