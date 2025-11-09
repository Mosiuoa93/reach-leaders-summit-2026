# REACH LEADER'S SUMMIT 2026 - Quick Start Guide

## 🚀 Get Started in 2 Minutes

### Prerequisites
- Node.js installed
- Two terminal windows

---

## Start Backend

```bash
cd backend
npm install  # First time only
npm start
```

✅ Backend runs on `http://localhost:3001`

---

## Start Frontend

```bash
cd frontend
npm install  # First time only
npm start
```

✅ Frontend runs on `http://localhost:3000`

---

## Test the App

### 1. Landing Page
- Visit `http://localhost:3000`
- See "REACH 2025" with Register and Check-In buttons

### 2. Register
- Click "Register"
- Choose registration type:
  - **Individual** - Dorm or Guest House
  - **Couple** - For 2 people
  - **Group** - For 3+ people
- Fill in details
- See real-time price calculation
- Submit

### 3. Check-In
- Click "Check-In" on landing page
- Search by name, email, or phone
- Click "Check In" button
- See status update

### 4. Admin Dashboard
- Go to landing page
- **Triple-click** the "REACH 2025" logo
- Click "🔒 Admin Portal" (appears for 10 seconds)
- View all registrations
- Edit, delete, or export to CSV

---

## Pricing Quick Reference

| Type | Price |
|------|-------|
| Individual (Dorm) | R1,400 (EB) / R1,650 |
| Individual (Guest House) | R1,650 (EB) / R1,900 |
| Student (Dorm) | R1,155 (Fixed) |
| Couple | R3,000 (EB) / R3,500 |
| Group (per person) | R1,400 (EB) / R1,650 |

**EB = Early Bird (until 28 Feb 2026)**

---

## Test Data

Run automated tests:

```bash
cd backend
node test-registrations.js
```

This creates 5 test registrations with different types and prices.

---

## Key Features

✅ **4 Registration Types**
- Individual (with accommodation choice)
- Student (dorm only, fixed price)
- Couple (2 people)
- Group (dynamic members)

✅ **Dynamic Pricing**
- Automatic early bird detection
- Real-time price updates
- Group pricing multiplied by member count

✅ **Check-In System**
- Real-time search
- Quick check-in
- Live statistics

✅ **Admin Dashboard**
- View all registrations
- Edit/delete registrations
- Export to CSV
- Hidden access (triple-click logo)

---

## File Structure

```
backend/
  ├── index.js              # All API endpoints
  ├── test-registrations.js # Test suite
  └── data/registrations.json

frontend/
  ├── src/pages/
  │   ├── LandingPage.js
  │   ├── ChoicePage.js        # NEW
  │   ├── IndividualRegistration.js  # NEW
  │   ├── CoupleRegistration.js      # NEW
  │   ├── GroupRegistration.js       # NEW
  │   ├── CheckInPage.js
  │   └── AdminDashboard.js
  └── App.js
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Frontend Not Connecting
- Check `REACT_APP_API_URL` in `frontend/.env`
- Should be `http://localhost:3001`

### Data Not Saving
- Check `backend/data/` directory exists
- Ensure write permissions

---

## Deployment

### Backend (Fly.io)
```bash
cd backend
flyctl deploy
```

### Frontend (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Set `REACT_APP_API_URL` env var
4. Auto-deploys on push

---

## Documentation

- `README.md` - Full documentation
- `PRICING.md` - Pricing details
- `REGISTRATION_TYPES.md` - Type specifications
- `PROJECT_STATUS.md` - Complete status
- `IMPLEMENTATION_SUMMARY.md` - Implementation details

---

## API Endpoints

```
POST   /api/register              # Register
GET    /api/search?query=X        # Search
POST   /api/checkin/:id           # Check-in
GET    /api/registrations         # Get all
PUT    /api/registrations/:id     # Update
DELETE /api/registrations/:id     # Delete
GET    /api/stats                 # Statistics
GET    /api/export/csv            # Export
GET    /health                    # Health check
```

---

## Next Steps

1. ✅ Run locally and test
2. ✅ Review pricing structure
3. ✅ Test all registration types
4. ✅ Test admin dashboard
5. ✅ Deploy to production

---

## Support

- Check documentation files
- Review test files for examples
- Check browser console for errors
- Check terminal for backend errors

---

**Ready to go! 🎉**

Start with:
```bash
cd backend && npm start
# In another terminal:
cd frontend && npm start
```

Visit `http://localhost:3000` and start testing!
