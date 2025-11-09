# Logo Installation - Visual Step-by-Step Guide

## 📸 Visual Walkthrough

### Step 1: Locate Your Logo File

**On Mac:**
```
Finder → Downloads → Your Logo File
(e.g., multi-ministries-logo.svg)
```

**On Windows:**
```
File Explorer → Downloads → Your Logo File
(e.g., multi-ministries-logo.svg)
```

**File Requirements:**
```
✓ Format: SVG, PNG, or JPG
✓ Size: 200x200px or larger
✓ Background: Transparent (recommended)
✓ Name: multi-ministries-logo.svg (or similar)
```

---

### Step 2: Open Project Folder

**Navigate to:**
```
windsurf-project/
└── frontend/
    └── public/
```

**What you'll see:**
```
public/
├── index.html
├── logo.svg ← This is the placeholder
└── favicon.ico
```

---

### Step 3: Replace the Logo

#### Option A: Using File Manager (Easiest)

**Mac:**
1. Open Finder
2. Navigate to `windsurf-project/frontend/public/`
3. See `logo.svg` (placeholder)
4. Drag your logo file here
5. When prompted, replace the file
6. Done!

**Windows:**
1. Open File Explorer
2. Navigate to `windsurf-project\frontend\public\`
3. See `logo.svg` (placeholder)
4. Drag your logo file here
5. When prompted, replace the file
6. Done!

#### Option B: Using Terminal

**Mac/Linux:**
```bash
# Navigate to project
cd windsurf-project/frontend/public/

# Backup old logo
mv logo.svg logo.svg.backup

# Copy your logo
cp ~/Downloads/your-logo.svg ./logo.svg
```

**Windows (PowerShell):**
```powershell
# Navigate to project
cd windsurf-project\frontend\public\

# Backup old logo
Rename-Item logo.svg logo.svg.backup

# Copy your logo
Copy-Item C:\Users\YourName\Downloads\your-logo.svg -Destination logo.svg
```

---

### Step 4: Update Code (If Needed)

#### If Using PNG File:

**Open:** `frontend/src/pages/LandingPage.js`

**Find this line (around line 24):**
```javascript
<img src="/logo.svg" alt="Multi Ministries" className="logo" />
```

**Change to:**
```javascript
<img src="/logo.png" alt="Multi Ministries" className="logo" />
```

**Save file** (Ctrl+S or Cmd+S)

#### If Using JPG File:

**Change to:**
```javascript
<img src="/logo.jpg" alt="Multi Ministries" className="logo" />
```

#### If Using SVG File:

**No changes needed!** The code already points to `logo.svg`

---

### Step 5: Adjust Size (Optional)

**Open:** `frontend/src/App.css`

**Find this section (around line 47):**
```css
.logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
  transition: transform 0.3s ease;
}
```

**Adjust width and height:**

**For larger logo:**
```css
.logo {
  width: 120px;    /* Increased from 100px */
  height: 120px;   /* Increased from 100px */
  object-fit: contain;
  transition: transform 0.3s ease;
}
```

**For smaller logo:**
```css
.logo {
  width: 80px;     /* Decreased from 100px */
  height: 80px;    /* Decreased from 100px */
  object-fit: contain;
  transition: transform 0.3s ease;
}
```

**Save file** (Ctrl+S or Cmd+S)

---

### Step 6: Verify in Browser

**Open browser:**
```
http://localhost:3000
```

**You should see:**
```
┌─────────────────────────────┐
│   [YOUR LOGO HERE]          │ ← Your logo appears!
│                             │
│  REACH LEADER'S SUMMIT 2026 │
│                             │
│  Multi Ministries Annual    │
│   Leaders Summit            │
│                             │
│  📅 31 August - 3 Sept 2026 │
│  📍 Joy Unspeakable, Pretoria│
│  [View Venue Location →]    │
│                             │
│  [Register] [Check In]      │
└─────────────────────────────┘
```

**If logo doesn't appear:**
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Check browser console (F12) for errors
3. Restart frontend: `npm start`

---

### Step 7: Test Logo Features

#### Test 1: Logo Display ✓
```
Visual Check:
□ Logo appears on page
□ Logo is centered
□ Logo looks good (not distorted)
□ Logo size is appropriate
```

#### Test 2: Hover Effect ✓
```
Action: Hover mouse over logo
Expected: Logo scales up slightly (5% larger)
```

#### Test 3: Admin Portal ✓
```
Action: Triple-click the logo
Expected: "🔒 Admin Portal" button appears
Expected: Button disappears after 10 seconds
```

#### Test 4: Mobile View ✓
```
Action: Resize browser to mobile size (375x667)
Expected: Logo shrinks to 80x80px
Expected: All elements still visible
```

---

### Step 8: Deploy to Production

#### Commit Your Changes:

**Terminal:**
```bash
# Navigate to project
cd windsurf-project

# Add changes
git add frontend/public/logo.svg
git add frontend/src/pages/LandingPage.js  # (if you changed it)
git add frontend/src/App.css  # (if you changed it)

# Commit
git commit -m "Add Multi Ministries logo"

# Push to GitHub
git push origin main
```

#### Vercel Auto-Deploy:

**What happens:**
1. GitHub receives your push
2. Vercel detects changes
3. Vercel rebuilds your site
4. Your site updates automatically
5. Check: https://your-vercel-url.com

**Monitor deployment:**
1. Go to Vercel dashboard
2. Click your project
3. Watch deployment progress
4. See "Deployment Successful" message

---

## 🎨 Logo Size Reference

### Desktop (1920x1080)
```
Logo: 100x100px
┌─────────────────────┐
│    [Logo 100x100]   │
│                     │
│  REACH LEADER'S...  │
└─────────────────────┘
```

### Tablet (768x1024)
```
Logo: 90x90px
┌──────────────────┐
│   [Logo 90x90]   │
│                  │
│  REACH LEADER'S..│
└──────────────────┘
```

### Mobile (375x667)
```
Logo: 80x80px
┌────────────────┐
│  [Logo 80x80]  │
│                │
│ REACH LEADER'S │
└────────────────┘
```

---

## 🔍 File Locations Reference

### Logo File Location
```
windsurf-project/
└── frontend/
    └── public/
        └── logo.svg ← YOUR LOGO GOES HERE
```

### Code File Locations

**Landing Page:**
```
windsurf-project/
└── frontend/
    └── src/
        └── pages/
            └── LandingPage.js ← Update if PNG/JPG
```

**Styling:**
```
windsurf-project/
└── frontend/
    └── src/
        └── App.css ← Adjust size here
```

---

## ✅ Completion Checklist

After adding your logo, verify:

```
□ Logo file copied to frontend/public/
□ Logo filename is logo.svg (or .png/.jpg)
□ LandingPage.js updated (if PNG/JPG)
□ App.css size adjusted (if needed)
□ Browser shows logo on landing page
□ Logo hover effect works
□ Triple-click admin portal works
□ Logo looks good on mobile
□ Changes committed to GitHub
□ Vercel deployment successful
```

---

## 🐛 Troubleshooting Visual Guide

### Problem: Logo Not Showing

**Checklist:**
```
1. Is file in frontend/public/? 
   ✓ Yes → Continue
   ✗ No → Copy file there

2. Is filename correct?
   ✓ logo.svg → Continue
   ✗ Different → Rename to logo.svg

3. Is code pointing to correct file?
   ✓ <img src="/logo.svg" ... → Continue
   ✗ Different → Update LandingPage.js

4. Did you hard refresh?
   ✓ Yes (Ctrl+Shift+R) → Continue
   ✗ No → Try hard refresh

5. Any errors in console (F12)?
   ✓ No errors → Logo should work
   ✗ Errors → Check error message
```

### Problem: Logo Distorted

**Solution:**
```
1. Open App.css
2. Find .logo class
3. Ensure: width = height (square)
4. Example: width: 100px; height: 100px;
5. Save and refresh
```

### Problem: Logo Wrong Size

**Solution:**
```
1. Open App.css
2. Find .logo class
3. Adjust width and height equally
4. Save and refresh

Options:
- Small: 80x80px
- Medium: 100x100px (default)
- Large: 120x120px
```

---

## 📞 Quick Help

### Can't Find Files?
```
Use Ctrl+P (Windows) or Cmd+P (Mac) in VS Code
Type: "LandingPage.js" or "App.css"
Jump directly to file
```

### Browser Not Updating?
```
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear cache: Ctrl+Shift+Delete
3. Close and reopen browser
4. Restart frontend: npm start
```

### Need to Undo Changes?
```
# If you haven't committed yet:
git checkout frontend/src/pages/LandingPage.js
git checkout frontend/src/App.css

# If you have committed:
git revert HEAD
```

---

## 🎯 Summary

**5 Simple Steps:**
1. ✅ Copy logo to `frontend/public/`
2. ✅ Name it `logo.svg` (or update code)
3. ✅ Adjust size in `App.css` (optional)
4. ✅ Verify in browser
5. ✅ Deploy to production

**Result:**
- Your logo on landing page
- Professional appearance
- Ready for event!

---

**Status**: Ready to add your logo! 🎉
