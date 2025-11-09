# How to Add Multi Ministries Logo - Step by Step Guide

## Overview
This guide will walk you through replacing the placeholder logo with your official Multi Ministries logo.

---

## Step 1: Prepare Your Logo File

### Option A: If you have an SVG file (Recommended)
- **Format**: SVG (Scalable Vector Graphics)
- **Size**: 200x200px or larger
- **Background**: Transparent preferred
- **File name**: `logo.svg`

### Option B: If you have a PNG file
- **Format**: PNG with transparent background
- **Size**: 200x200px or larger
- **File name**: `logo.png`

### Option C: If you have a JPG file
- **Format**: JPG
- **Size**: 200x200px or larger
- **File name**: `logo.jpg`

---

## Step 2: Locate the Logo Directory

Navigate to the frontend public folder:

```
windsurf-project/
└── frontend/
    └── public/
        └── logo.svg  ← This is where the logo goes
```

---

## Step 3: Replace the Placeholder Logo

### On Mac/Linux:

**Option 1: Using File Manager**
1. Open Finder
2. Navigate to: `windsurf-project/frontend/public/`
3. Find `logo.svg` (the placeholder)
4. Delete it or rename it to `logo.svg.backup`
5. Copy your logo file into this folder
6. Rename your logo file to `logo.svg` (if it's not already named that)

**Option 2: Using Terminal**
```bash
# Navigate to the project
cd windsurf-project/frontend/public/

# Backup the old logo
mv logo.svg logo.svg.backup

# Copy your logo file here
cp /path/to/your/logo.svg ./logo.svg
```

### On Windows:

1. Open File Explorer
2. Navigate to: `windsurf-project\frontend\public\`
3. Find `logo.svg` (the placeholder)
4. Right-click → Delete or Rename to `logo.svg.backup`
5. Copy your logo file into this folder
6. Rename your logo file to `logo.svg`

---

## Step 4: Update the Code (If Using PNG/JPG)

If you're using a **PNG or JPG file** instead of SVG, you need to update the code:

### Edit LandingPage.js

1. Open: `frontend/src/pages/LandingPage.js`
2. Find this line (around line 24):
   ```javascript
   <img src="/logo.svg" alt="Multi Ministries" className="logo" />
   ```

3. Replace with your file:
   ```javascript
   // If using PNG:
   <img src="/logo.png" alt="Multi Ministries" className="logo" />
   
   // Or if using JPG:
   <img src="/logo.jpg" alt="Multi Ministries" className="logo" />
   ```

4. Save the file

---

## Step 5: Adjust Logo Size (Optional)

If the logo appears too large or too small, you can adjust the size:

### Edit App.css

1. Open: `frontend/src/App.css`
2. Find the `.logo` class (around line 47):
   ```css
   .logo {
     width: 100px;
     height: 100px;
     object-fit: contain;
     transition: transform 0.3s ease;
   }
   ```

3. Adjust the width and height:
   ```css
   .logo {
     width: 120px;    /* Change from 100px to your desired size */
     height: 120px;   /* Change from 100px to your desired size */
     object-fit: contain;
     transition: transform 0.3s ease;
   }
   ```

4. Save the file

**Common sizes:**
- Small: 80x80px
- Medium: 100x100px (current)
- Large: 120x120px
- Extra Large: 150x150px

---

## Step 6: Verify the Changes

### In Development:

1. The app should automatically reload (hot reload)
2. Visit: `http://localhost:3000`
3. You should see your logo on the landing page
4. If not, try refreshing the browser (Ctrl+R or Cmd+R)

### If Logo Doesn't Appear:

**Clear Browser Cache:**
- Chrome: Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
- Select "Cached images and files"
- Click "Clear data"
- Refresh the page

**Restart the Frontend:**
```bash
# Stop the frontend (Ctrl+C in the terminal)
# Then restart it:
cd frontend
npm start
```

---

## Step 7: Test Logo Features

### Test 1: Logo Display
- ✅ Logo appears on landing page
- ✅ Logo is centered
- ✅ Logo size looks appropriate
- ✅ Logo is not distorted

### Test 2: Logo Hover Effect
- ✅ Hover over logo
- ✅ Logo should scale up slightly (5% larger)

### Test 3: Logo Click (Admin Portal)
- ✅ Triple-click the logo
- ✅ "🔒 Admin Portal" button should appear
- ✅ Button should disappear after 10 seconds
- ✅ Click button to access admin dashboard

### Test 4: Responsive Design
- ✅ Desktop (1920x1080): Logo 100x100px
- ✅ Tablet (768x1024): Logo 90x90px
- ✅ Mobile (375x667): Logo 80x80px

---

## Step 8: Deploy to Production

### Deploy Frontend to Vercel:

1. **Commit changes:**
   ```bash
   git add frontend/public/logo.svg
   git add frontend/src/pages/LandingPage.js  # (if you changed it)
   git add frontend/src/App.css  # (if you changed it)
   git commit -m "Update Multi Ministries logo"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Vercel Auto-Deploy:**
   - Vercel will automatically detect the changes
   - Your site will rebuild and deploy
   - Check deployment status on Vercel dashboard

### Deploy Backend (if needed):

```bash
cd backend
flyctl deploy
```

---

## Troubleshooting

### Problem: Logo doesn't appear

**Solution 1: Check file name**
- Make sure file is named exactly: `logo.svg` (or `logo.png`/`logo.jpg`)
- Check capitalization (case-sensitive on Linux/Mac)

**Solution 2: Check file location**
- File should be in: `frontend/public/`
- Not in: `frontend/src/` or `frontend/`

**Solution 3: Clear cache and restart**
```bash
# Stop frontend (Ctrl+C)
# Clear browser cache
# Restart frontend:
cd frontend
npm start
```

### Problem: Logo is distorted or stretched

**Solution: Adjust CSS**
- Edit `.logo` class in `frontend/src/App.css`
- Make sure width and height are equal (square)
- Example: `width: 100px; height: 100px;`

### Problem: Logo is too small/large

**Solution: Change size in CSS**
```css
.logo {
  width: 120px;   /* Increase or decrease */
  height: 120px;  /* Increase or decrease */
  object-fit: contain;
  transition: transform 0.3s ease;
}
```

### Problem: Logo doesn't update after upload

**Solution: Hard refresh browser**
- Windows: `Ctrl+Shift+R`
- Mac: `Cmd+Shift+R`
- Or clear browser cache completely

### Problem: File format not supported

**Supported formats:**
- ✅ SVG (Recommended)
- ✅ PNG (with transparency)
- ✅ JPG
- ❌ GIF (not recommended)
- ❌ BMP (not recommended)

---

## File Checklist

After adding your logo, verify these files:

- [ ] Logo file exists: `frontend/public/logo.svg` (or .png/.jpg)
- [ ] Logo file is 200x200px or larger
- [ ] Logo file has transparent background (if PNG)
- [ ] LandingPage.js has correct filename (if not SVG)
- [ ] App.css logo size is appropriate
- [ ] Frontend compiles without errors
- [ ] Logo appears on landing page
- [ ] Logo hover effect works
- [ ] Admin portal triple-click works

---

## Quick Reference

### File Locations
```
Logo file:        frontend/public/logo.svg
Landing page:     frontend/src/pages/LandingPage.js
Styling:          frontend/src/App.css
```

### Key CSS Classes
```css
.logo-container   /* Container around logo */
.logo             /* Logo image styling */
```

### Key HTML Elements
```html
<img src="/logo.svg" alt="Multi Ministries" className="logo" />
```

---

## Support

### If you need help:

1. **Check the files:**
   - Is logo in `frontend/public/`?
   - Is filename correct?
   - Is file format supported?

2. **Check the code:**
   - Is LandingPage.js pointing to correct file?
   - Is App.css sizing appropriate?

3. **Restart everything:**
   ```bash
   # Stop frontend (Ctrl+C)
   # Clear browser cache
   # Restart frontend:
   cd frontend
   npm start
   ```

4. **Check browser console:**
   - Press F12 to open developer tools
   - Check Console tab for errors
   - Look for 404 errors (file not found)

---

## Summary

✅ **Steps to Add Logo:**
1. Prepare your logo file (SVG, PNG, or JPG)
2. Copy to `frontend/public/`
3. Name it `logo.svg` (or update code if different)
4. Adjust size in `App.css` if needed
5. Verify in browser
6. Deploy to production

✅ **Logo Features:**
- Displays on landing page
- Scales on hover
- Triple-click reveals admin portal
- Responsive on all devices

✅ **Ready to Deploy!**

---

**Last Updated**: 2025-11-09
**Status**: Ready for logo installation
