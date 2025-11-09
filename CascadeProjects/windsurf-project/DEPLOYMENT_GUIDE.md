# REACH LEADER'S SUMMIT 2026 - Complete Deployment Guide

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    REACH LEADER'S SUMMIT 2026               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend (Vercel)          Backend (Fly.io)    Database     │
│  ├─ React App              ├─ Node.js/Express  (Supabase)   │
│  ├─ Registration Forms     ├─ API Endpoints    ├─ Users     │
│  ├─ Payment Page           ├─ Auth Logic       ├─ Registr.  │
│  ├─ Confirmation Page      ├─ Data Processing  ├─ Payments  │
│  └─ Admin Dashboard        └─ File Storage     └─ Stats     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Pre-Deployment Checklist

### ✅ Frontend (Vercel)
- [ ] All code committed to GitHub
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Build successful locally
- [ ] All pages tested

### ✅ Backend (Fly.io)
- [ ] All code committed to GitHub
- [ ] Docker builds successfully
- [ ] Environment variables configured
- [ ] Health check endpoint working
- [ ] All API endpoints tested

### ✅ Database (Supabase)
- [ ] Account created
- [ ] Project initialized
- [ ] Tables created
- [ ] Connection string obtained
- [ ] Backups configured

---

## 🔧 PART 1: SUPABASE SETUP

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign in or create account
3. Click "New Project"
4. Fill in:
   - **Project Name**: `reach-leaders-summit-2026`
   - **Database Password**: Create strong password
   - **Region**: `South Africa (Cape Town)` or closest
5. Click "Create new project"
6. Wait for initialization (5-10 minutes)

### Step 2: Get Connection String

1. Go to Project Settings
2. Click "Database"
3. Copy the connection string (PostgreSQL)
4. Format: `postgresql://user:password@host:port/database`

### Step 3: Create Tables

Run these SQL queries in Supabase SQL Editor:

```sql
-- Registrations Table
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_type VARCHAR(50) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  organization VARCHAR(200),
  gender VARCHAR(20) NOT NULL,
  accommodation VARCHAR(50),
  is_student BOOLEAN DEFAULT FALSE,
  price DECIMAL(10, 2) NOT NULL,
  registered_at TIMESTAMP DEFAULT NOW(),
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMP,
  partner1_first_name VARCHAR(100),
  partner1_last_name VARCHAR(100),
  partner1_gender VARCHAR(20),
  partner2_first_name VARCHAR(100),
  partner2_last_name VARCHAR(100),
  partner2_gender VARCHAR(20),
  group_members JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_email ON registrations(email);
CREATE INDEX idx_registration_type ON registrations(registration_type);
CREATE INDEX idx_checked_in ON registrations(checked_in);
CREATE INDEX idx_created_at ON registrations(created_at);

-- Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES registrations(id),
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  reference_number VARCHAR(100),
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Statistics View
CREATE VIEW registration_stats AS
SELECT
  COUNT(*) as total_registrations,
  SUM(CASE WHEN registration_type = 'individual' THEN 1 ELSE 0 END) as individual_count,
  SUM(CASE WHEN registration_type = 'couple' THEN 1 ELSE 0 END) as couple_count,
  SUM(CASE WHEN registration_type = 'group' THEN 1 ELSE 0 END) as group_count,
  SUM(CASE WHEN registration_type = 'student' THEN 1 ELSE 0 END) as student_count,
  SUM(CASE WHEN checked_in = TRUE THEN 1 ELSE 0 END) as checked_in_count,
  SUM(price) as total_revenue
FROM registrations;
```

### Step 4: Enable Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now, restrict later)
CREATE POLICY "Allow all" ON registrations FOR ALL USING (true);
CREATE POLICY "Allow all" ON payments FOR ALL USING (true);
```

---

## 🔧 PART 2: BACKEND DEPLOYMENT (Fly.io)

### Step 1: Install Fly CLI

```bash
# macOS
brew install flyctl

# Verify installation
flyctl version
```

### Step 2: Login to Fly.io

```bash
flyctl auth login
```

### Step 3: Update Backend Environment Variables

**File**: `backend/.env`

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key

# Server
PORT=5000
NODE_ENV=production

# CORS
FRONTEND_URL=https://your-vercel-domain.vercel.app

# API Keys (if needed)
API_KEY=your-secret-key
```

### Step 4: Update Backend Code for Supabase

**File**: `backend/index.js`

Add at the top:

```javascript
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
```

### Step 5: Deploy to Fly.io

```bash
# Navigate to backend directory
cd backend

# Deploy
flyctl deploy

# Monitor deployment
flyctl logs

# Check status
flyctl status
```

### Step 6: Verify Backend Deployment

```bash
# Test health endpoint
curl https://reach-registration-backend.fly.dev/health

# Should return: {"status":"ok"}
```

---

## 🔧 PART 3: FRONTEND DEPLOYMENT (Vercel)

### Step 1: Update Frontend Environment Variables

**File**: `frontend/.env.production`

```env
REACT_APP_API_URL=https://reach-registration-backend.fly.dev
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_KEY=your-anon-key
```

### Step 2: Update Vercel Configuration

**File**: `vercel.json` (root)

```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/build",
  "env": {
    "REACT_APP_API_URL": "@react_app_api_url",
    "REACT_APP_SUPABASE_URL": "@react_app_supabase_url",
    "REACT_APP_SUPABASE_KEY": "@react_app_supabase_key"
  }
}
```

### Step 3: Add Environment Variables in Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `REACT_APP_API_URL` = `https://reach-registration-backend.fly.dev`
   - `REACT_APP_SUPABASE_URL` = Your Supabase URL
   - `REACT_APP_SUPABASE_KEY` = Your Supabase Key

### Step 4: Commit and Push

```bash
# Commit all changes
git add .
git commit -m "chore: configure deployment with Supabase"

# Push to GitHub
git push origin main
```

### Step 5: Vercel Auto-Deploys

- Vercel automatically detects push to main
- Build starts automatically
- Check deployment status in Vercel dashboard

---

## 🔐 SECURITY CONFIGURATION

### Backend Security

**File**: `backend/index.js`

```javascript
// CORS Configuration
const cors = require('cors');
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

### Supabase Security

1. **Row Level Security**: Enable RLS on all tables
2. **API Keys**: Use anon key for frontend, service role for backend
3. **Backups**: Enable automatic daily backups
4. **SSL**: Enforce SSL connections

---

## 📊 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] All code committed
- [ ] Environment variables configured
- [ ] Database tables created
- [ ] Security policies set
- [ ] Tests passing locally

### Deployment
- [ ] Backend deployed to Fly.io
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set in both
- [ ] Health checks passing
- [ ] Logs showing no errors

### Post-Deployment
- [ ] Test registration flow
- [ ] Test payment page
- [ ] Test check-in system
- [ ] Test admin dashboard
- [ ] Monitor logs for errors
- [ ] Set up alerts

---

## 🔍 MONITORING & TROUBLESHOOTING

### Check Backend Logs

```bash
# View recent logs
flyctl logs

# View specific service
flyctl logs --app reach-registration-backend
```

### Check Frontend Logs

1. Go to Vercel Dashboard
2. Select project
3. Click "Deployments"
4. Click latest deployment
5. View build logs

### Common Issues & Solutions

**Issue**: CORS errors
```
Solution: Check FRONTEND_URL in backend .env matches Vercel domain
```

**Issue**: Database connection failed
```
Solution: Verify DATABASE_URL in .env, check Supabase status
```

**Issue**: 404 on API endpoints
```
Solution: Check backend is running, verify API_URL in frontend .env
```

**Issue**: Build fails on Vercel
```
Solution: Check vercel.json configuration, verify frontend/build exists
```

---

## 🚀 DEPLOYMENT COMMANDS SUMMARY

```bash
# Backend Deployment
cd backend
flyctl deploy
flyctl logs

# Frontend Deployment
cd frontend
npm run build
git push origin main  # Vercel auto-deploys

# Check Status
flyctl status
# Visit: https://vercel.com/dashboard
```

---

## 📱 TESTING AFTER DEPLOYMENT

### Test Checklist

1. **Landing Page**
   - [ ] Logo displays
   - [ ] Title and subtitle visible
   - [ ] Event details show
   - [ ] Register button works

2. **Registration Flow**
   - [ ] Individual registration works
   - [ ] Couple registration works
   - [ ] Group registration works
   - [ ] Student option works
   - [ ] Gender field required
   - [ ] Prices calculate correctly

3. **Payment Page**
   - [ ] Payment options display
   - [ ] Online payment link works
   - [ ] Venue payment option works
   - [ ] Amount displays correctly

4. **Confirmation Page**
   - [ ] Registration details show
   - [ ] Payment info displays
   - [ ] Next steps visible
   - [ ] Print button works

5. **Admin Dashboard**
   - [ ] Admin access works (triple-click logo)
   - [ ] View registrations works
   - [ ] Edit registration works
   - [ ] Delete registration works
   - [ ] CSV export works
   - [ ] Statistics display

6. **Check-In System**
   - [ ] Search works
   - [ ] Check-in button works
   - [ ] Status updates

---

## 📞 SUPPORT & RESOURCES

### Fly.io Documentation
- https://fly.io/docs/
- https://fly.io/docs/reference/configuration/

### Vercel Documentation
- https://vercel.com/docs
- https://vercel.com/docs/concepts/deployments/overview

### Supabase Documentation
- https://supabase.com/docs
- https://supabase.com/docs/guides/database

### GitHub
- Push to main branch triggers auto-deployment
- Check Actions tab for build status

---

## ✅ DEPLOYMENT STATUS

| Component | Platform | Status | URL |
|-----------|----------|--------|-----|
| Frontend | Vercel | Ready | https://your-domain.vercel.app |
| Backend | Fly.io | Ready | https://reach-registration-backend.fly.dev |
| Database | Supabase | Ready | https://your-project.supabase.co |

---

## 🎯 NEXT STEPS

1. **Set up Supabase** (5-10 minutes)
2. **Deploy Backend** (5-10 minutes)
3. **Deploy Frontend** (2-5 minutes)
4. **Test All Features** (15-20 minutes)
5. **Monitor & Optimize** (ongoing)

---

**Last Updated**: 2025-11-09
**Status**: ✅ READY FOR DEPLOYMENT
**Estimated Time**: 30-45 minutes total
