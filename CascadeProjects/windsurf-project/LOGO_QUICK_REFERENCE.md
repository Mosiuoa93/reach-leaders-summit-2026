# Logo Installation - Quick Reference

## 🚀 Quick Steps (5 Minutes)

### Step 1: Get Your Logo Ready
```
✓ Logo file (SVG, PNG, or JPG)
✓ Size: 200x200px or larger
✓ Transparent background (recommended)
```

### Step 2: Copy Logo File
```
Source: Your logo file
Destination: windsurf-project/frontend/public/
Filename: logo.svg (or logo.png / logo.jpg)
```

### Step 3: Update Code (If PNG/JPG)
**File**: `frontend/src/pages/LandingPage.js`

**Find** (line ~24):
```javascript
<img src="/logo.svg" alt="Multi Ministries" className="logo" />
```

**Replace with** (if using PNG):
```javascript
<img src="/logo.png" alt="Multi Ministries" className="logo" />
```

### Step 4: Adjust Size (Optional)
**File**: `frontend/src/App.css`

**Find** (line ~47):
```css
.logo {
  width: 100px;
  height: 100px;
}
```

**Change to** (if needed):
```css
.logo {
  width: 120px;   /* Your preferred size */
  height: 120px;
}
```

### Step 5: Verify
```bash
# Browser should auto-reload
# Visit: http://localhost:3000
# You should see your logo!
```

---

## 📁 File Structure

```
windsurf-project/
├── frontend/
│   ├── public/
│   │   └── logo.svg ← PUT YOUR LOGO HERE
│   └── src/
│       ├── pages/
│       │   └── LandingPage.js ← Update if PNG/JPG
│       └── App.css ← Adjust size here
└── ...
```

---

## 🎨 Logo Specifications

| Property | Value |
|----------|-------|
| **Format** | SVG (recommended), PNG, or JPG |
| **Size** | 200x200px or larger |
| **Background** | Transparent |
| **Location** | `frontend/public/` |
| **Filename** | `logo.svg` (or `.png`/`.jpg`) |
| **Display Size** | 100x100px (adjustable) |

---

## 🔧 Common Adjustments

### Logo Too Small?
```css
.logo {
  width: 150px;   /* Increase size */
  height: 150px;
}
```

### Logo Too Large?
```css
.logo {
  width: 80px;    /* Decrease size */
  height: 80px;
}
```

### Using PNG Instead of SVG?
```javascript
// In LandingPage.js, change:
<img src="/logo.png" alt="Multi Ministries" className="logo" />
```

### Using JPG Instead of SVG?
```javascript
// In LandingPage.js, change:
<img src="/logo.jpg" alt="Multi Ministries" className="logo" />
```

---

## ✅ Verification Checklist

- [ ] Logo file copied to `frontend/public/`
- [ ] Logo filename is correct (`logo.svg` or `.png`/`.jpg`)
- [ ] LandingPage.js updated (if PNG/JPG)
- [ ] App.css size adjusted (if needed)
- [ ] Browser shows logo on landing page
- [ ] Logo hover effect works (scales up)
- [ ] Triple-click logo reveals admin button
- [ ] Logo looks good on mobile

---

## 🐛 Troubleshooting

### Logo Not Showing?
1. Check file is in `frontend/public/`
2. Check filename is correct
3. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. Restart frontend: `npm start`

### Logo Distorted?
1. Make sure width = height (square)
2. Check `object-fit: contain;` is in CSS

### Logo Wrong Size?
1. Edit `.logo` class in `App.css`
2. Change width and height values
3. Refresh browser

### File Not Found Error?
1. Check file location: `frontend/public/`
2. Check filename spelling (case-sensitive)
3. Check file extension matches code

---

## 📱 Responsive Sizes

The logo automatically adjusts:

| Device | Size |
|--------|------|
| Desktop | 100x100px |
| Tablet | 90x90px |
| Mobile | 80x80px |

---

## 🚀 Deploy After Adding Logo

### Terminal Commands:
```bash
# Commit changes
git add frontend/public/logo.svg
git add frontend/src/pages/LandingPage.js  # if changed
git add frontend/src/App.css  # if changed
git commit -m "Add Multi Ministries logo"

# Push to GitHub
git push origin main

# Vercel auto-deploys!
```

---

## 📞 Need Help?

### Check These Files:
- Logo location: `frontend/public/logo.svg`
- Logo code: `frontend/src/pages/LandingPage.js` (line 24)
- Logo size: `frontend/src/App.css` (line 47)

### Browser Console:
- Press F12
- Check Console tab for errors
- Look for 404 errors (file not found)

### Hard Reset:
```bash
# Stop frontend (Ctrl+C)
# Clear browser cache (Ctrl+Shift+Delete)
# Restart frontend:
cd frontend
npm start
```

---

## 🎯 Logo Features

✅ **Displays** on landing page
✅ **Scales** on hover (5% larger)
✅ **Triple-click** reveals admin portal
✅ **Responsive** on all devices
✅ **Easy to replace** anytime

---

## Summary

1. **Prepare** logo file (SVG/PNG/JPG, 200x200px+)
2. **Copy** to `frontend/public/`
3. **Name** it `logo.svg` (or update code)
4. **Adjust** size in `App.css` if needed
5. **Verify** in browser
6. **Deploy** to production

**Done!** Your logo is now live! 🎉

---

**Quick Links:**
- Logo file: `frontend/public/logo.svg`
- Landing page: `frontend/src/pages/LandingPage.js`
- Styling: `frontend/src/App.css`
- Full guide: `LOGO_INSTALLATION_GUIDE.md`
