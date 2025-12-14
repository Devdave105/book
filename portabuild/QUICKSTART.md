# 🚀 PortaBuild - Quick Start Guide

## Installation

1. **Open the project folder** in VS Code or any text editor
2. **Start a local server** (required for smooth operation):
   - Using Python 3: `python -m http.server 8000`
   - Using Python 2: `python -m SimpleHTTPServer 8000`
   - Using Node (http-server): `npx http-server`
   - Using VS Code: Install "Live Server" extension and right-click → "Open with Live Server"

3. **Navigate to** `http://localhost:8000` in your browser

## 🎬 Demo Walkthrough

### Step 1: Explore the Homepage
- Open `index.html` (or navigate to root URL)
- Scroll through features and how-it-works sections
- Click on buttons to see hover effects
- Test responsive design by resizing browser

### Step 2: Try Mobile Navigation
- Click the hamburger menu (visible on screens < 768px)
- Click navigation links to close menu automatically
- Press ESC key to close menu

### Step 3: Create an Account
- Click "Register" button or navigate to `register.html`
- Fill in the form:
  - Name: Any name
  - Email: Use a unique email
  - Password: Minimum 6 characters
  - Role: Select any option
  - Check terms agreement
- Click "Create Account"
- You'll see success message and redirect to homepage

### Step 4: Login
- Navigate to `login.html`
- Use these pre-populated demo accounts:
  - **Email**: john@example.com | **Password**: password123
  - **Email**: sarah@example.com | **Password**: password123
- Or use the account you just created
- Check "Remember me" (stored in localStorage)
- Click "Sign In"

### Step 5: Verify Data Persistence
- Open Browser DevTools (F12)
- Go to Application → Local Storage
- View `portabuild_users` - shows all registered accounts
- View `portabuild_session` - shows current logged-in user
- Refresh the page - user session persists

## 🎨 Customization Tips

### Change Colors
Edit `css/style.css`:
```css
/* Change accent color from blue to another */
:root {
  --accent: #2563EB; /* Change this */
}
```

### Modify Typography
Edit Google Fonts import in HTML files or change `font-family` in CSS:
```css
body {
  font-family: 'Inter', 'Roboto', sans-serif; /* Add more fonts */
}
```

### Add More Features
Add new sections to `index.html` and style in `css/style.css`

### Customize Form Fields
Edit form groups in `login.html` and `register.html`

## 🧪 Testing Checklist

- [ ] Homepage loads with hero section visible
- [ ] Navbar responsive on mobile (hamburger menu appears)
- [ ] All navigation links work and scroll smoothly
- [ ] Feature cards show hover effects
- [ ] How-it-works section is visible
- [ ] Register form validates required fields
- [ ] Register form prevents duplicate emails
- [ ] Register form validates email format
- [ ] Register form stores new user in localStorage
- [ ] Login form validates credentials
- [ ] Login form rejects invalid credentials
- [ ] Successful login shows success message
- [ ] User session persists after page refresh
- [ ] Logout works correctly
- [ ] Mobile layout is fully responsive
- [ ] All buttons have hover effects
- [ ] Dark theme applies consistently

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Buttons don't work | Make sure you're using a local server, not opening file directly |
| localStorage not working | Check browser privacy settings, try incognito mode |
| Images not loading | They use Unsplash URLs - requires internet connection |
| Forms submit to wrong page | Check href attributes in HTML |
| Responsive design not working | Clear browser cache and resize window |

## 📚 File Reference

| File | Purpose |
|------|---------|
| `index.html` | Main homepage |
| `login.html` | Login authentication page |
| `register.html` | Registration page |
| `css/style.css` | All styling and responsive design |
| `js/app.js` | Navigation, animations, general interactivity |
| `js/auth.js` | Form validation and user management |
| `images/` | Folder for storing images (currently uses external URLs) |

## 🎯 Key Features Implemented

✅ Dark theme with #121212 background
✅ Professional Inter typography
✅ Responsive mobile/tablet/desktop
✅ SVG icons (no emojis)
✅ Form validation via JavaScript
✅ localStorage for data persistence
✅ Session management
✅ Smooth animations and transitions
✅ Hover effects on interactive elements
✅ Hamburger menu for mobile
✅ Accessibility features (keyboard support)

## 🚀 Next Steps

1. Test the application thoroughly
2. Add portfolio creation interface
3. Implement portfolio templates
4. Add image upload functionality
5. Create portfolio preview page
6. Add portfolio sharing features
7. Connect to a backend server for permanent storage

---

**Need help?** Check the README.md file for more details!
