# 🚀 DEPLOYMENT CHECKLIST - REACH LEADER'S SUMMIT 2026

## ⏱️ ESTIMATED TIME: 30-45 minutes

---

## PHASE 1: SUPABASE SETUP (10 minutes)

### Create Supabase Project
- [ ] Go to https://supabase.com
- [ ] Sign in/Create account
- [ ] Create new project
- [ ] Set region to South Africa (Cape Town)
- [ ] Wait for initialization

### Get Credentials
- [ ] Copy Database URL
- [ ] Copy Supabase URL
- [ ] Copy Anon Key
- [ ] Save in secure location

### Create Tables
- [ ] Run SQL for registrations table
- [ ] Run SQL for payments table
- [ ] Create indexes
- [ ] Enable Row Level Security

---

## PHASE 2: BACKEND DEPLOYMENT (10 minutes)

### Prepare Backend
- [ ] Create `backend/.env` file
- [ ] Add DATABASE_URL
- [ ] Add SUPABASE_URL
- [ ] Add SUPABASE_KEY
- [ ] Add FRONTEND_URL
- [ ] Set NODE_ENV=production

### Deploy to Fly.io
- [ ] Install flyctl: `brew install flyctl`
- [ ] Login: `flyctl auth login`
- [ ] Navigate to backend: `cd backend`
- [ ] Deploy: `flyctl deploy`
- [ ] Monitor: `flyctl logs`
- [ ] Verify health: `curl https://reach-registration-backend.fly.dev/health`

### Verify Backend
- [ ] Health check returns OK
- [ ] No errors in logs
- [ ] API endpoints accessible
- [ ] Database connection working

---

## PHASE 3: FRONTEND DEPLOYMENT (5 minutes)

### Prepare Frontend
- [ ] Create `frontend/.env.production`
- [ ] Add REACT_APP_API_URL
- [ ] Add REACT_APP_SUPABASE_URL
- [ ] Add REACT_APP_SUPABASE_KEY

### Configure Vercel
- [ ] Go to https://vercel.com/dashboard
- [ ] Select project
- [ ] Go to Settings → Environment Variables
- [ ] Add REACT_APP_API_URL
- [ ] Add REACT_APP_SUPABASE_URL
- [ ] Add REACT_APP_SUPABASE_KEY

### Deploy Frontend
- [ ] Commit all changes: `git add .`
- [ ] Commit message: `git commit -m "chore: configure deployment"`
- [ ] Push to GitHub: `git push origin main`
- [ ] Vercel auto-deploys
- [ ] Check deployment status in Vercel dashboard

### Verify Frontend
- [ ] Build successful
- [ ] No build errors
- [ ] Site accessible
- [ ] Environment variables loaded

---

## PHASE 4: TESTING (15-20 minutes)

### Landing Page
- [ ] Logo displays correctly
- [ ] Title and subtitle visible
- [ ] Event details show
- [ ] Register button works
- [ ] Admin portal accessible (triple-click logo)

### Registration Forms
- [ ] Individual registration form loads
- [ ] Student option works
- [ ] Couple registration form loads
- [ ] Group registration form loads
- [ ] Gender field appears (Male/Female)
- [ ] Accommodation selection works
- [ ] Price calculates correctly

### Payment Flow
- [ ] Registration submits successfully
- [ ] Redirects to payment page
- [ ] Payment options display
- [ ] Online payment link works
- [ ] Venue payment option works
- [ ] Amount displays correctly

### Confirmation Page
- [ ] Confirmation page displays after payment selection
- [ ] Registration details show
- [ ] Payment information displays
- [ ] Next steps visible
- [ ] Print button works
- [ ] Back to home button works

### Admin Dashboard
- [ ] Admin portal accessible
- [ ] View registrations works
- [ ] Edit registration works
- [ ] Delete registration works
- [ ] CSV export works
- [ ] Statistics display correctly

### Check-In System
- [ ] Check-in page loads
- [ ] Search functionality works
- [ ] Check-in button works
- [ ] Status updates correctly

---

## PHASE 5: MONITORING (Ongoing)

### Set Up Alerts
- [ ] Fly.io: Enable error alerts
- [ ] Vercel: Enable deployment alerts
- [ ] Supabase: Enable backup alerts

### Monitor Logs
- [ ] Check backend logs daily
- [ ] Check frontend build logs
- [ ] Monitor database performance

### Performance
- [ ] Frontend load time < 3s
- [ ] API response time < 500ms
- [ ] Database queries < 100ms

---

## 🔐 SECURITY VERIFICATION

- [ ] CORS properly configured
- [ ] Environment variables not exposed
- [ ] SSL/TLS enabled
- [ ] Rate limiting active
- [ ] RLS policies enabled
- [ ] Backups configured

---

## 📊 DEPLOYMENT SUMMARY

### Frontend (Vercel)
- **Status**: ✅ Ready
- **URL**: https://your-domain.vercel.app
- **Build Command**: `cd frontend && npm run build`
- **Output**: `frontend/build`

### Backend (Fly.io)
- **Status**: ✅ Ready
- **URL**: https://reach-registration-backend.fly.dev
- **Region**: South Africa (Johannesburg)
- **Health Check**: `/health`

### Database (Supabase)
- **Status**: ✅ Ready
- **Region**: South Africa (Cape Town)
- **Tables**: registrations, payments
- **Backups**: Daily automatic

---

## ✅ SIGN-OFF

| Component | Deployed | Tested | Status |
|-----------|----------|--------|--------|
| Frontend | [ ] | [ ] | ⏳ |
| Backend | [ ] | [ ] | ⏳ |
| Database | [ ] | [ ] | ⏳ |
| Integration | [ ] | [ ] | ⏳ |
| Security | [ ] | [ ] | ⏳ |

---

## 🎯 DEPLOYMENT COMMANDS

```bash
# Phase 1: Supabase (Manual in UI)

# Phase 2: Backend
cd backend
flyctl deploy
flyctl logs

# Phase 3: Frontend
cd frontend
git add .
git commit -m "chore: configure deployment"
git push origin main

# Phase 4: Testing
# Visit https://your-domain.vercel.app
# Test all features

# Phase 5: Monitoring
flyctl logs --app reach-registration-backend
# Check Vercel dashboard
```

---

## 📞 SUPPORT

- **Fly.io Issues**: https://fly.io/docs/
- **Vercel Issues**: https://vercel.com/docs
- **Supabase Issues**: https://supabase.com/docs
- **GitHub**: Push to main branch for auto-deploy

---

**Ready to Deploy?** Follow the phases above in order! ✅

**Estimated Total Time**: 30-45 minutes
**Difficulty**: Easy (all automated)
**Risk Level**: Low (can rollback anytime)
