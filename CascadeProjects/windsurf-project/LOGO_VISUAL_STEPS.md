# 📸 VISUAL STEP-BY-STEP GUIDE

## STEP 1: Open Finder and Go to Folder

**Click:** Finder (in your dock)

**Press:** Cmd+Shift+G

**You'll see this dialog:**
```
┌─────────────────────────────────────┐
│ Go to the folder:                   │
│ ┌─────────────────────────────────┐ │
│ │ [text input box]                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Cancel]              [Go]          │
└─────────────────────────────────────┘
```

---

## STEP 2: Paste the Path

**Copy this path:**
```
/Users/mosiuoamolefi/CascadeProjects/windsurf-project/frontend/public/
```

**Paste it** in the text box (Cmd+V)

**Click:** Go

---

## STEP 3: You're in the Folder!

**You should see:**
```
📁 public
├── 📄 index.html
├── 📄 logo.svg ← THIS ONE
└── 📄 favicon.ico
```

---

## STEP 4: Get Your Logo File

**Find your Multi Ministries logo file:**
- Check: Downloads folder
- Check: Desktop
- Check: Documents

**Your file should be:**
- PNG, JPG, or SVG format
- Named something like: `multi-ministries-logo.png`

---

## STEP 5: Copy Your Logo

**Right-click your logo file**

**Click:** Copy

---

## STEP 6: Paste in the Folder

**Go back to the public folder** (from Step 3)

**Right-click in empty space**

**Click:** Paste

**Now you have 2 logo files in the folder:**
```
📁 public
├── 📄 index.html
├── 📄 logo.svg ← OLD ONE
├── 📄 multi-ministries-logo.png ← YOUR NEW ONE
└── 📄 favicon.ico
```

---

## STEP 7: Rename Your Logo

**Right-click your new logo file**

**Click:** Rename

**Change name to:**
- If PNG: `logo.png`
- If JPG: `logo.jpg`
- If SVG: `logo.svg`

**Example:**
```
Before: multi-ministries-logo.png
After:  logo.png
```

---

## STEP 8: Delete the Old Logo

**Right-click the old `logo.svg`**

**Click:** Move to Trash

**Now you only have:**
```
📁 public
├── 📄 index.html
├── 📄 logo.png ← YOUR NEW LOGO
└── 📄 favicon.ico
```

---

## STEP 9: Update Code (If PNG/JPG Only)

**If you used PNG or JPG, do this:**

1. **Open VS Code**
2. **Press:** Cmd+P
3. **Type:** `LandingPage.js`
4. **Press:** Enter
5. **Find line 24** (look for `logo.svg`)
6. **Change to:**
   ```javascript
   <img src="/logo.png"  // if PNG
   <img src="/logo.jpg"  // if JPG
   ```
7. **Save:** Cmd+S

---

## STEP 10: Refresh Browser

**Open browser:** http://localhost:3000

**Hard refresh:** Cmd+Shift+R

**You should see your new logo!** ✅

---

## Summary

| Step | Action |
|------|--------|
| 1 | Open Finder |
| 2 | Cmd+Shift+G (Go to Folder) |
| 3 | Paste path |
| 4 | Find your logo |
| 5 | Copy your logo |
| 6 | Paste in folder |
| 7 | Rename to `logo.png` (or `.jpg`/`.svg`) |
| 8 | Delete old `logo.svg` |
| 9 | Update code (if PNG/JPG) |
| 10 | Refresh browser |

---

## Path to Copy/Paste

```
/Users/mosiuoamolefi/CascadeProjects/windsurf-project/frontend/public/
```

---

## Done! 🎉

Your logo is now installed!
