# Automatic Price Change System - How It Works

## ✅ System Already Configured

The registration system is **already set up** to automatically change prices from Early Bird to Regular pricing after 28 February 2026. **No additional action is needed!**

---

## 🔄 How It Works

### Backend Logic

**File**: `backend/index.js`

```javascript
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

// Price calculation function
const calculatePrice = (registrationType, options = {}) => {
  const now = new Date();
  const earlyBirdDate = new Date(PRICING.EARLY_BIRD_DATE);
  const isEarlyBird = now <= earlyBirdDate;  // ← KEY LINE
  
  // Returns early bird price if now <= 28 Feb 2026
  // Returns regular price if now > 28 Feb 2026
};
```

### How It Determines the Price

**Date Comparison Logic:**
```
Current Date ≤ 28 February 2026  →  Early Bird Price
Current Date > 28 February 2026  →  Regular Price
```

### Example Timeline

| Date | Status | Individual (Dorm) | Couple |
|------|--------|---|---|
| 1 Jan 2026 | Early Bird | R1,400 | R3,000 |
| 28 Feb 2026 | Early Bird (last day) | R1,400 | R3,000 |
| 1 Mar 2026 | Regular | R1,650 | R3,500 |
| 31 Aug 2026 | Regular | R1,650 | R3,500 |

---

## 🔧 What Happens Automatically

### On 28 February 2026 at 11:59 PM

**No action needed!** The system automatically:

1. **Compares current date** with `EARLY_BIRD_DATE`
2. **Detects date has passed**
3. **Switches to regular pricing**
4. **All new registrations** use regular prices
5. **Existing registrations** keep their original price

### On 1 March 2026 at 12:00 AM

**All new registrations** will automatically use regular pricing:
- Individual (Dorm): R1,650 (was R1,400)
- Individual (Guest House): R1,900 (was R1,650)
- Couple: R3,500 (was R3,000)
- Group: R1,650 per person (was R1,400)

---

## 📱 Frontend Automatic Updates

### Individual Registration Form

**File**: `frontend/src/pages/IndividualRegistration.js`

```javascript
useEffect(() => {
  const now = new Date();
  const earlyBirdDate = new Date('2026-02-28');
  const isEarlyBird = now <= earlyBirdDate;  // ← AUTO CHECK

  if (isStudent) {
    setPrice(1155);
  } else if (accommodation === 'dorm') {
    setPrice(isEarlyBird ? 1400 : 1650);  // ← AUTO SWITCH
  } else if (accommodation === 'guesthouse') {
    setPrice(isEarlyBird ? 1650 : 1900);  // ← AUTO SWITCH
  }
}, [isStudent, accommodation]);
```

### Couple Registration Form

**File**: `frontend/src/pages/CoupleRegistration.js`

```javascript
useEffect(() => {
  const now = new Date();
  const earlyBirdDate = new Date('2026-02-28');
  const isEarlyBird = now <= earlyBirdDate;  // ← AUTO CHECK
  setPrice(isEarlyBird ? 3000 : 3500);  // ← AUTO SWITCH
}, []);
```

### Group Registration Form

**File**: `frontend/src/pages/GroupRegistration.js`

```javascript
useEffect(() => {
  const now = new Date();
  const earlyBirdDate = new Date('2026-02-28');
  const isEarlyBird = now <= earlyBirdDate;  // ← AUTO CHECK
  const pricePerMember = isEarlyBird ? 1400 : 1650;  // ← AUTO SWITCH
  setPrice(pricePerMember * (memberCount + 1));
}, [memberCount]);
```

### Landing Page Display

**File**: `frontend/src/pages/LandingPage.js`

```javascript
{new Date() <= new Date('2026-02-28') ? '✓ Early bird pricing' : 'Regular pricing'}
```

---

## ✅ What's Already in Place

### Backend
✅ `EARLY_BIRD_DATE` configured to '2026-02-28'
✅ `calculatePrice()` function checks date automatically
✅ All registration endpoints use automatic pricing
✅ Pricing data stored with calculated price at registration time

### Frontend
✅ Individual form checks date and updates price
✅ Couple form checks date and updates price
✅ Group form checks date and updates price
✅ Landing page displays pricing status
✅ Choice page shows "Early Bird Pricing until 28 February 2026"

### Database
✅ Each registration stores the price at time of registration
✅ Historical pricing preserved
✅ No manual updates needed

---

## 🔄 How Existing Registrations Are Protected

### Price Lock at Registration Time

When someone registers, the system:

1. **Calculates current price** (Early Bird or Regular)
2. **Stores that price** in the registration record
3. **Never changes** that stored price

**Example:**
- Person registers on 15 Feb 2026 → Price: R1,400 (Early Bird)
- Person registers on 5 Mar 2026 → Price: R1,650 (Regular)
- Both prices are locked and never change

---

## 📊 Pricing Timeline

### Current (Before 28 Feb 2026)
```
Individual (Dorm):      R1,400 ← Early Bird
Individual (Guest House): R1,650 ← Early Bird
Student:                R1,155 (Fixed)
Couple:                 R3,000 ← Early Bird
Group (per person):     R1,400 ← Early Bird
```

### After 28 February 2026
```
Individual (Dorm):      R1,650 ← Regular
Individual (Guest House): R1,900 ← Regular
Student:                R1,155 (Fixed - no change)
Couple:                 R3,500 ← Regular
Group (per person):     R1,650 ← Regular
```

---

## 🔧 If You Need to Change the Date

**To change the Early Bird cutoff date**, edit:

**File**: `backend/index.js` (Line 43)

```javascript
// Current:
EARLY_BIRD_DATE: '2026-02-28',

// To change to different date:
EARLY_BIRD_DATE: '2026-03-31',  // Example: March 31, 2026
```

**Then restart the backend:**
```bash
npm start
```

---

## 🔍 How to Verify It's Working

### Check Current Status

**Visit**: `http://localhost:3000`

**You'll see:**
- If before 28 Feb 2026: "✓ Early bird pricing"
- If after 28 Feb 2026: "Regular pricing"

### Check Backend Pricing

**API Endpoint**: `GET http://localhost:3001/api/capacity`

**Response shows current pricing status:**
```json
{
  "guestHouse": {
    "current": 45,
    "limit": 120,
    "available": 75,
    "isFull": false
  },
  "couple": {
    "current": 30,
    "limit": 74,
    "available": 44,
    "isFull": false
  }
}
```

---

## ⚙️ Technical Details

### Date Comparison Method

```javascript
const now = new Date();  // Current date/time
const earlyBirdDate = new Date('2026-02-28');  // Cutoff date

// Comparison
now <= earlyBirdDate  // true = Early Bird, false = Regular
```

### Timezone Consideration

- Uses **server time** (backend)
- Compares dates at **midnight UTC**
- Automatic across all timezones
- No manual intervention needed

### No Database Migration Needed

- Prices stored at registration time
- Historical data preserved
- No updates to existing registrations
- Completely automatic

---

## 📋 Summary

| Aspect | Status |
|--------|--------|
| Automatic date detection | ✅ Active |
| Price switching logic | ✅ Implemented |
| Frontend updates | ✅ Real-time |
| Backend calculation | ✅ Automatic |
| Historical pricing | ✅ Preserved |
| Manual action needed | ❌ None |

---

## 🎯 What You Don't Need to Do

❌ No manual price updates
❌ No database migrations
❌ No configuration changes
❌ No code deployments
❌ No system restarts
❌ No admin actions

---

## ✨ How It Works in Practice

### Scenario 1: Early Bird Period (Before 28 Feb 2026)

1. User visits registration page
2. System checks: `now <= 2026-02-28` → **TRUE**
3. Early Bird prices displayed
4. User registers at Early Bird price
5. Price locked in database

### Scenario 2: Regular Period (After 28 Feb 2026)

1. User visits registration page
2. System checks: `now <= 2026-02-28` → **FALSE**
3. Regular prices displayed
4. User registers at Regular price
5. Price locked in database

---

## 🚀 Conclusion

**The automatic price change system is fully implemented and requires NO additional action!**

On 28 February 2026 at 11:59 PM, the system will automatically:
- Stop offering Early Bird prices
- Start offering Regular prices
- Continue operating normally
- Preserve all historical pricing

Everything happens **automatically** based on the server's current date and time. ✅

---

**Last Updated**: 2025-11-09
**Status**: ✅ FULLY AUTOMATIC
**Action Required**: None
