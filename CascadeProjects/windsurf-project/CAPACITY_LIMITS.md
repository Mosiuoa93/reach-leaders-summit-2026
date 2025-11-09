# Capacity Limits - Implementation Complete

## 🎯 Capacity Limits Added

### Guest House Registration
- **Maximum**: 120 registrations
- **Type**: Individual registration with Guest House accommodation
- **Tracking**: System counts all individual registrations with "guesthouse" accommodation

### Couple Registration
- **Maximum**: 74 registrations
- **Type**: Couple registration (2 people per registration)
- **Tracking**: System counts all couple registrations

---

## ✅ How It Works

### Registration Process

**When someone tries to register:**

1. **System checks current capacity**
   - Counts existing registrations of that type
   - Compares against the limit

2. **If capacity available:**
   - Registration is accepted ✅
   - Data is saved

3. **If capacity full:**
   - Registration is rejected ❌
   - Error message shows: "Guest House registration is full (120/120 slots taken)"

---

## 📊 Capacity Tracking

### Guest House Capacity
```
Current: 0/120
Available: 120 slots
Status: Open ✅
```

### Couple Capacity
```
Current: 0/74
Available: 74 slots
Status: Open ✅
```

---

## 🔌 API Endpoints

### Check Capacity
**Endpoint:** `GET /api/capacity`

**Response:**
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

### Register (with capacity check)
**Endpoint:** `POST /api/register`

**If capacity full - Response:**
```json
{
  "error": "Guest House registration is full (120/120 slots taken)",
  "capacityFull": true,
  "current": 120,
  "limit": 120
}
```

---

## 📁 Backend Changes

### Files Modified
- `backend/index.js` - Added capacity limits and checking

### Changes Made
1. **Added CAPACITY_LIMITS configuration:**
   - Guest House: 120
   - Couple: 74

2. **Added checkCapacity() function:**
   - Checks current registrations
   - Compares against limits
   - Returns availability status

3. **Updated /api/register endpoint:**
   - Checks capacity before accepting registration
   - Returns error if full

4. **Added /api/capacity endpoint:**
   - Returns current capacity information
   - Shows available slots

---

## 🧪 Testing

### Test Case 1: Guest House Registration
```
1. Register 120 individual registrations with Guest House
2. Try to register 121st
3. Expected: Error "Guest House registration is full (120/120 slots taken)"
```

### Test Case 2: Couple Registration
```
1. Register 74 couple registrations
2. Try to register 75th
3. Expected: Error "Couple registration is full (74/74 slots taken)"
```

### Test Case 3: Check Capacity
```
1. Call GET /api/capacity
2. Expected: Returns current counts and limits
```

---

## 💾 Data Tracking

### What's Counted

**Guest House:**
- Only individual registrations with accommodation = "guesthouse"
- Individual registrations with accommodation = "dorm" are NOT counted

**Couple:**
- Only registrations with registrationType = "couple"
- Each couple registration counts as 1 (not 2 people)

---

## 🎯 Frontend Integration

### For Individual Registration Form
- Check capacity before allowing Guest House selection
- Show message: "120 slots available" or "Guest House is full"

### For Couple Registration Form
- Check capacity before allowing couple registration
- Show message: "74 slots available" or "Couple registration is full"

---

## 📈 Admin Dashboard

### Capacity Display (Future Enhancement)
Could add to admin dashboard:
- Guest House: 45/120 (75 available)
- Couple: 30/74 (44 available)
- Visual progress bars

---

## 🔄 How to Modify Limits

To change capacity limits, edit `backend/index.js`:

```javascript
const CAPACITY_LIMITS = {
  GUESTHOUSE: 120,  // Change this number
  COUPLE: 74        // Change this number
};
```

Then restart backend:
```bash
npm start
```

---

## ✅ Status

✅ Backend capacity checking implemented
✅ API endpoints created
✅ Error handling added
✅ Backend restarted and running
✅ Ready for frontend integration

---

## 📞 Summary

| Feature | Status |
|---------|--------|
| Guest House limit (120) | ✅ Active |
| Couple limit (74) | ✅ Active |
| Capacity checking | ✅ Active |
| Error messages | ✅ Active |
| Capacity API | ✅ Active |
| Backend running | ✅ Running |

---

**System is now tracking and enforcing capacity limits!** 🎉
