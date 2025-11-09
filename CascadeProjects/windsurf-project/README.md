# REACH LEADER'S SUMMIT 2026 - Registration App

A streamlined registration and check-in application for **Multi Ministries' Annual Leaders Summit**.

**Event Details:**
- 📅 **Date**: 31 August - 3 September 2026
- 📍 **Venue**: Joy Unspeakable, Pretoria, South Africa
- 🎯 **Purpose**: Annual Leaders Summit for Multi Ministries

## Branding

- **Multi Ministries Logo** - Displayed on landing page (replace `frontend/public/logo.svg` with your official logo)
- **Event Information** - Date and venue displayed prominently
- **Venue Link** - Direct link to Joy Unspeakable location on Google Maps

## Features

- **Simple Landing Page** - Clean entry point with Multi Ministries branding, event details, and Register/Check-In options
- **Registration Form** - Collect participant information (name, email, phone, organization)
- **Check-In System** - Quick search and check-in functionality
- **Admin Dashboard** - View all registrations, edit, delete, and manage participants
- **CSV Export** - Export all registrations to CSV format
- **Real-time Stats** - View total registrations and check-in counts
- **Responsive Design** - Works on desktop and mobile devices
- **Hidden Admin Portal** - Triple-click the logo to reveal admin access

## Project Structure

```
windsurf-project/
├── backend/
│   ├── index.js              # Express server with API endpoints
│   ├── package.json          # Backend dependencies
│   ├── Dockerfile            # Docker configuration for Fly.io
│   ├── fly.toml              # Fly.io deployment config
│   └── data/
│       └── registrations.json # Registrations database
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Styling (includes admin dashboard styles)
│   │   ├── index.js          # React entry point
│   │   └── pages/
│   │       ├── LandingPage.js
│   │       ├── RegistrationForm.js
│   │       ├── CheckInPage.js
│   │       └── AdminDashboard.js
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── package.json          # Frontend dependencies
│   ├── .env                  # Environment variables (local)
│   └── .env.example          # Environment variables template
├── vercel.json               # Vercel deployment config
└── README.md                 # This file
```

## Installation

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Running Locally

### Start Backend

```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

### Start Frontend (in a new terminal)

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Registration
- **POST** `/api/register` - Register a new participant
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+27123456789",
    "organization": "Multi Ministries"
  }
  ```

### Check-In
- **GET** `/api/search?query=john` - Search registrations
- **POST** `/api/checkin/:id` - Check in a participant
- **GET** `/api/stats` - Get registration statistics

### Admin Management
- **GET** `/api/registrations` - Get all registrations
- **PUT** `/api/registrations/:id` - Update a registration
- **DELETE** `/api/registrations/:id` - Delete a registration

### Data Export
- **GET** `/api/export/csv` - Export registrations as CSV

### Health
- **GET** `/health` - Health check endpoint

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel will automatically build and deploy using `vercel.json` configuration
4. Set environment variable: `REACT_APP_API_URL=<backend-url>`

### Backend (Fly.io)

1. Install Fly CLI: `brew install flyctl`
2. Login: `flyctl auth login`
3. Deploy from backend directory:
   ```bash
   cd backend
   flyctl deploy
   ```

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.fly.dev
```

### Backend
- `PORT` - Server port (default: 5000)

## Data Storage

Registrations are stored in `backend/data/registrations.json`. Each registration includes:
- Unique ID
- Name, email, phone
- Organization
- Registration timestamp
- Check-in status and timestamp

## CSV Export

The check-in page includes an "Export to CSV" button that downloads all registrations with their check-in status.

## Features

### Landing Page
- Clean, modern interface
- Two main actions: Register or Check In
- Responsive design

### Registration Form
- Collects essential participant information
- Form validation
- Success/error messaging
- Auto-redirect after successful registration

### Check-In System
- Real-time search by name, email, or phone
- Quick check-in button
- Visual status indicators (Checked In / Pending)
- Live statistics dashboard
- CSV export functionality

### Admin Dashboard
- **Access**: Triple-click the "REACH 2025" logo on landing page
- **Features**:
  - View all registrations in a sortable table
  - Edit participant information inline
  - Delete registrations with confirmation
  - Real-time statistics (Total, Checked In, Not Checked In)
  - Search registrations by name, email, or phone
  - Export all data to CSV
- **Security**: Hidden from casual users, only visible after triple-click

## Troubleshooting

### Backend not connecting
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` environment variable in frontend
- Verify CORS is enabled in backend

### Data not persisting
- Check that `backend/data/` directory exists
- Ensure write permissions on the directory
- Verify `registrations.json` file exists

### CSV export not working
- Ensure all registrations have required fields
- Check browser console for errors
- Verify backend is running

## Support

For issues or questions, please check the API endpoints and ensure both frontend and backend are running correctly.
