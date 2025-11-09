# REACH 2025 - Branding Guide

## Event Information

### Event Name
**REACH LEADER'S SUMMIT 2026 - Multi Ministries Annual Leaders Summit**

### Event Date
📅 **31 August - 3 September 2026**

### Event Venue
📍 **Joy Unspeakable, Pretoria, South Africa**

**Venue Link**: https://www.google.com/maps/search/Joy+Unspeakable+Pretoria

---

## Logo

### Current Logo
- **File**: `frontend/public/logo.svg`
- **Format**: SVG (scalable vector)
- **Size**: 100x100px (on landing page)
- **Colors**: 
  - Primary: #667eea (Purple)
  - Secondary: #764ba2 (Dark Purple)

### How to Replace Logo

1. **Prepare Your Logo**
   - Format: SVG, PNG, or JPG
   - Recommended size: 200x200px or larger
   - Transparent background preferred

2. **Replace the File**
   - Replace `frontend/public/logo.svg` with your logo file
   - If using PNG/JPG, update the filename in `LandingPage.js`

3. **Update LandingPage.js**
   ```javascript
   <img src="/your-logo-filename.png" alt="Multi Ministries" className="logo" />
   ```

4. **Adjust Size if Needed**
   - Edit `.logo` CSS in `App.css`:
   ```css
   .logo {
     width: 100px;  /* Adjust as needed */
     height: 100px; /* Adjust as needed */
   }
   ```

---

## Landing Page Layout

### Current Structure
```
┌─────────────────────────────┐
│      Multi Ministries       │  ← Logo (100x100px)
│         Logo                │
├─────────────────────────────┤
│        REACH 2025           │  ← Title (Gradient)
├─────────────────────────────┤
│  Multi Ministries Annual    │  ← Subtitle
│   Leaders Summit            │
├─────────────────────────────┤
│  📅 March 2026              │  ← Event Details
│  📍 Joy Unspeakable, Pretoria│
│  [View Venue Location →]    │  ← Venue Link
├─────────────────────────────┤
│  [Register]  [Check In]     │  ← Action Buttons
│  [🔒 Admin Portal]          │  ← Hidden Admin (triple-click)
└─────────────────────────────┘
```

---

## Color Scheme

### Primary Colors
- **Primary Purple**: #667eea
- **Secondary Purple**: #764ba2
- **Gradient**: Linear gradient from #667eea to #764ba2

### Accent Colors
- **Success Green**: #4caf50
- **Warning Orange**: #ff9800
- **Error Red**: #f44336

### Neutral Colors
- **Dark Text**: #333333
- **Light Text**: #666666
- **Light Background**: #f9f9f9
- **Border**: #e0e0e0

---

## Typography

### Fonts
- **Family**: System fonts (Arial, Helvetica, sans-serif)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'

### Font Sizes
- **Page Title (h1)**: 2.5rem (40px)
- **Section Title (h2)**: 1.8rem (28px)
- **Subtitle**: 1.1rem (18px)
- **Body Text**: 1rem (16px)
- **Small Text**: 0.9rem (14px)

### Font Weights
- **Bold**: 600-700
- **Regular**: 400
- **Light**: 300

---

## Venue Information

### Joy Unspeakable, Pretoria

**Location**: Pretoria, South Africa

**Google Maps Link**: https://www.google.com/maps/search/Joy+Unspeakable+Pretoria

**Features**:
- Large capacity venue
- Modern facilities
- Easy accessibility
- Parking available

---

## Event Details to Display

### On Landing Page
- ✅ Event name: REACH 2025
- ✅ Organization: Multi Ministries
- ✅ Date: March 2026
- ✅ Venue: Joy Unspeakable, Pretoria
- ✅ Venue link: Google Maps

### On Registration Forms
- Event name in header
- Pricing information
- Early bird deadline: 28 February 2026

### On Admin Dashboard
- Event statistics
- Registration breakdown
- Revenue tracking

---

## Social Media & Marketing

### Hashtags
- #REACH2025
- #MultiMinistries
- #LeadersSummit
- #Pretoria

### Event Website
- Consider creating a dedicated event website
- Link from registration app
- Include speaker information
- Display agenda/schedule

---

## Email Templates

### Registration Confirmation
```
Subject: Welcome to REACH 2025!

Dear [Name],

Thank you for registering for REACH 2025 - Multi Ministries Annual Leaders Summit!

Event Details:
📅 Date: March 2026
📍 Venue: Joy Unspeakable, Pretoria
💰 Price: R[Amount]

Your Registration ID: [ID]

See you there!

Multi Ministries Team
```

### Check-In Reminder
```
Subject: REACH 2025 Check-In Reminder

Dear [Name],

We're excited to see you at REACH 2025!

Don't forget to check in when you arrive:
📍 Joy Unspeakable, Pretoria
📅 March 2026

See you soon!

Multi Ministries Team
```

---

## Customization Checklist

- [ ] Replace logo with official Multi Ministries logo
- [ ] Verify event date (March 2026)
- [ ] Confirm venue name (Joy Unspeakable)
- [ ] Update venue link if needed
- [ ] Adjust colors if needed
- [ ] Add social media links
- [ ] Create email templates
- [ ] Set up event website
- [ ] Configure payment processing
- [ ] Test all branding elements

---

## Files to Update

### For Logo
- `frontend/public/logo.svg` - Replace with your logo

### For Event Details
- `frontend/src/pages/LandingPage.js` - Event date and venue
- `README.md` - Event information
- `QUICK_START.md` - Event details

### For Colors
- `frontend/src/App.css` - Color definitions

### For Email
- Create email templates in backend
- Update email service configuration

---

## Support

For branding questions or to update event information:
1. Update `LandingPage.js` for event details
2. Replace logo file in `frontend/public/`
3. Update `App.css` for color changes
4. Rebuild and deploy

---

## Notes

- Logo is clickable (triple-click reveals admin portal)
- Venue link opens in new tab
- Event date is prominently displayed
- All branding is responsive (works on mobile)
- Colors follow Multi Ministries brand guidelines
