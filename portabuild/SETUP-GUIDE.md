# 🚀 PortaBuild - Complete Setup & Usage Guide

## 📦 Installation

### Option 1: Using Python (Recommended)
```bash
# Navigate to portabuild folder
cd portabuild

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Then open: http://localhost:8000
```

### Option 2: Using Node.js
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Start server in portabuild folder
http-server

# Then open: http://localhost:8080 (or address shown)
```

### Option 3: Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically

### Option 4: Using PHP
```bash
php -S localhost:8000

# Then open: http://localhost:8000
```

## 🎬 Complete Feature Walkthrough

### 1. Homepage Exploration (5 minutes)

**What to see:**
- Professional dark theme with blue accents
- Responsive navigation bar (sticky)
- Hero section with headline and buttons
- 6 feature cards with descriptions
- 3-step "How It Works" process
- Interactive demo section
- Contact information

**Try this:**
```
1. Hover over buttons - see blue highlight
2. Click hamburger menu on mobile - menu appears/disappears
3. Scroll to try demo section - edit name in real-time
4. Change colors in demo - see portfolio update
5. Click "Create Portfolio" - redirects to register
```

### 2. Registration (3 minutes)

**Fill in the form:**
```
Name: John Developer
Email: john@example.com
Password: SecurePass123 (minimum 6 characters)
Role: Developer
```

**What happens:**
- Form validates email format
- Checks for duplicate emails
- Requires password of 6+ characters
- Shows success message
- Auto-redirects to Dashboard

**Pro tip:** Watch localStorage in DevTools
- Open F12 → Application → Local Storage
- See new user added to `portabuild_users`

### 3. Dashboard - First Time (10 minutes)

**Initial state:**
- Editor panel shows empty form
- Preview panel shows placeholder portfolio
- Sidebar shows accent color options
- Section list ready to reorder

**Fill your profile:**
```
Name: John Developer
Title: Full Stack JavaScript Developer
Bio: Passionate about building web applications...
Email: john@dev.com
Phone: +1 (555) 123-4567
Location: San Francisco, CA
```

**Then add:**
- LinkedIn: https://linkedin.com/in/johndeveloper
- GitHub: https://github.com/johndeveloper
- Website: https://johndeveloper.dev

**Watch the preview:** Updates in real-time as you type!

### 4. Add Projects (5 minutes)

**Click "Add Project" button:**

**Project 1:**
```
Title: E-commerce Platform
Description: Built a full-stack e-commerce platform with Node.js and React
Link: https://github.com/example/ecommerce
```

**Project 2:**
```
Title: Weather App
Description: Real-time weather application with API integration
Link: https://example-weather-app.com
```

**Watch:** Projects appear in preview instantly!

### 5. Add Skills (2 minutes)

**In Skills textarea, enter:**
```
JavaScript, React, Node.js, MongoDB, HTML5, CSS3, Git, REST APIs, Figma, UI Design
```

**The system will:**
- Split by commas
- Create individual skill tags
- Display in preview with accent color

### 6. Customize Appearance (3 minutes)

**Try different accent colors:**

Click each radio button in sidebar:
1. **Blue** (#2563EB) - Professional default
2. **Pink** (#EC4899) - Creative and modern
3. **Green** (#10B981) - Nature and growth
4. **Amber** (#F59E0B) - Warm and welcoming

**Watch:** Portfolio accent changes in preview instantly!

### 7. Manage Sections (3 minutes)

**Drag-and-drop reordering:**
1. Grab a section from the sidebar
2. Drag it above or below another section
3. Release to reorder
4. Preview updates automatically

**Add/remove sections:**
1. Click "Add Section" button
2. Select section type:
   - About: Bio and description
   - Projects: Featured projects
   - Skills: Your skill tags
   - Contact: Contact information

3. Click "Remove" (×) to delete section
4. Sections are optional - customize to your needs

### 8. Save Changes (2 minutes)

**Two ways to save:**

**Option 1: Auto-save**
- Changes auto-save as you edit
- Check localStorage in DevTools
- No manual save needed

**Option 2: Manual save**
- Click "Save Changes" button
- Shows success notification

**Verify:** Refresh page - data persists!

### 9. Publish Portfolio (1 minute)

**Click "Publish Portfolio":**
- Marks portfolio as published
- Adds `published` flag to data
- Success notification appears
- Portfolio is ready to share

### 10. Export as HTML (2 minutes)

**Click "Export HTML":**
- Downloads standalone HTML file
- Filename: `[YourName]-portfolio.html`
- Opens in any browser
- No dependencies needed
- Share with anyone!

**What you get:**
- Complete portfolio in one HTML file
- All styling included
- Professional appearance
- Works offline

## 🎯 Demo Accounts (Pre-populated)

### Account 1: Developer
```
Email: john@example.com
Password: password123
Role: Developer
```

### Account 2: Designer
```
Email: sarah@example.com
Password: password123
Role: Designer
```

**Try:**
1. Login with one account
2. Create/edit portfolio
3. Logout
4. Login with other account
5. See different portfolio

## 🧪 Testing Features

### Test Responsive Design

**On Desktop:**
```
Resize browser window from 1920px down to 320px
Watch layout adapt:
- 1200px+ : Side-by-side editor/preview
- 768px : Stacked layout
- Below 768px : Mobile optimized
```

**On Mobile Device:**
```
Open http://localhost:8000 on phone
Test:
- Hamburger menu (click to open/close)
- Form input on touch screen
- Button clicks on touch
- Portrait/landscape rotation
```

### Test Form Validation

**Try invalid inputs:**
```
Empty name field → Error message appears
Invalid email format → Error message
Short password → Error message
Duplicate email → Error message
```

**Valid submission:**
```
All fields filled correctly
Accept terms
Click Register
Auto-redirect to Dashboard
```

### Test Data Persistence

**Create portfolio:**
```
1. Fill in profile
2. Add projects
3. Add skills
4. Open DevTools (F12)
5. Check localStorage
6. Refresh page
7. Data is still there!
8. Close and reopen browser
9. Login again
10. Portfolio is intact!
```

### Test localStorage

**In DevTools console:**
```javascript
// View users
JSON.parse(localStorage.getItem('portabuild_users'))

// View current session
JSON.parse(localStorage.getItem('portabuild_session'))

// View all portfolios
JSON.parse(localStorage.getItem('portabuild_portfolios'))

// Clear all data (for testing)
localStorage.clear()
```

## 🎨 Customization Ideas

### Change Color Scheme

Edit `css/style.css`:
```css
/* Find and change: */
--accent-color: #2563EB;  /* Change to your color */
--dark-bg: #121212;        /* Background */
--card-bg: #1E1E1E;        /* Cards */
--text-color: #FFFFFF;     /* Text */
```

### Modify Hero Image

Edit `index.html`:
```html
<!-- Change this URL to different image -->
<img src="https://images.unsplash.com/photo-[ID]?w=600&h=600&fit=crop" 
     alt="Professional working on portfolio">
```

### Add More Sections

Edit `portfolio.js`:
```javascript
// In portfolio data structure, add new section types
sections: ['about', 'projects', 'skills', 'experience', 'education']
```

### Modify Form Fields

Edit `dashboard.html`:
```html
<!-- Add new form group -->
<div class="form-group">
    <label>New Field</label>
    <input type="text" id="portfolioNewField" placeholder="...">
</div>
```

## 📊 Browser Compatibility

**Tested and working on:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

**Requirements:**
- JavaScript enabled
- localStorage enabled
- CSS Grid & Flexbox support

## 🐛 Common Issues & Solutions

### Issue: "Cannot register - email already exists"
**Solution:** Email is taken. Use different email or clear localStorage.
```javascript
// In console:
localStorage.clear()
```

### Issue: "Live preview not updating"
**Solution:** Click "Refresh Preview" button or reload page.

### Issue: "Drag-and-drop not working"
**Solution:** 
- Ensure JavaScript is enabled
- Try different browser
- Clear cache and reload

### Issue: "localStorage not persisting"
**Solution:**
- Check browser privacy/incognito mode
- Try different browser
- Check if storage is full

### Issue: "Export HTML not downloading"
**Solution:**
- Check browser download settings
- Try different browser
- Check if popups are blocked

### Issue: "Images not loading"
**Solution:**
- Check internet connection
- Unsplash URLs require internet
- Try in different network

## 📈 Performance Tips

1. **Minimize localStorage usage**
   - Clear old data periodically
   - Don't store images inline

2. **Optimize portfolio content**
   - Use short project descriptions
   - Limit projects to 5-8
   - Keep skills list focused

3. **Improve preview performance**
   - Click "Refresh Preview" if slow
   - Reload page to reset

## 🔐 Security Notes

⚠️ **For Demo/Local Use Only:**
- Passwords stored in localStorage (not hashed)
- For production, use backend with encryption
- No server-side validation
- HTTPS not required for local use

**Before going live:**
- Add backend authentication
- Hash passwords with bcrypt
- Use secure database
- Implement SSL/HTTPS
- Add input sanitization

## 📚 File Reference

| File | Purpose |
|------|---------|
| `index.html` | Homepage with hero, features, demo |
| `login.html` | User login page |
| `register.html` | User registration page |
| `dashboard.html` | Portfolio builder interface |
| `css/style.css` | All styling (2000+ lines) |
| `js/app.js` | Navigation, animations, DOM |
| `js/auth.js` | Authentication, validation |
| `js/portfolio.js` | Portfolio CRUD, preview, export |

## 🎓 Learning Projects

**Try building these:**

### Extension 1: Theme Customization
- Add more color themes
- Add font selection
- Add layout templates

### Extension 2: Portfolio Gallery
- Display all portfolios
- Search/filter portfolios
- View public portfolios

### Extension 3: Advanced Export
- Export as PDF
- Export as image
- Generate share link

### Extension 4: Analytics
- Track portfolio views
- Track button clicks
- Show visitor stats

### Extension 5: Collaboration
- Share portfolio edit link
- Multiple editors
- Version history

## 🎯 Next Steps

1. **Create your portfolio**
   - Register account
   - Fill profile
   - Add projects

2. **Customize design**
   - Choose color
   - Reorder sections
   - Edit content

3. **Publish**
   - Click Publish
   - Export HTML
   - Share with others

4. **Extend**
   - Modify CSS
   - Add new features
   - Connect backend

## 💡 Pro Tips

1. **Use DevTools Inspector**
   - F12 to open DevTools
   - Inspect elements
   - Test responsiveness
   - Check console for errors

2. **Use LocalStorage Viewer**
   - Application tab → Local Storage
   - See all saved data
   - Manually edit data (for testing)
   - Clear data to reset

3. **Take advantage of browser**
   - Use developer tools
   - Test on multiple browsers
   - Check network tab
   - Monitor console

4. **Keyboard Shortcuts**
   - ESC: Close mobile menu
   - Ctrl+Shift+I: Open DevTools
   - Ctrl+Shift+C: Inspect element
   - F5: Reload page

## 📞 Support

**If something doesn't work:**

1. Check browser console (F12)
2. Look for error messages
3. Try clearing cache and reload
4. Try different browser
5. Check localStorage (might be full)
6. Clear localStorage and start fresh

---

**Happy building! 🚀**

Your portfolio awaits!
