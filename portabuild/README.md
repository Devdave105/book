# PortaBuild - Portfolio Website Builder

A modern, dark-themed portfolio website builder built with HTML, CSS, and JavaScript. Users can register, login, and create professional portfolios with ease.

## 🎨 Design Features

- **Dark Theme**: Professional #121212 background with #1E1E1E cards
- **Modern Typography**: Google Fonts "Inter" with semi-bold headings
- **Professional Icons**: Clean SVG icons for buttons and navigation
- **Fully Responsive**: Mobile, tablet, and desktop layouts
- **Smooth Animations**: Fade-in effects and hover interactions
- **Soft Shadows**: Subtle depth with carefully tuned box shadows

## 📁 Project Structure

```
portabuild/
├── index.html          # Homepage with hero, features, how-it-works
├── login.html          # Login form
├── register.html       # Registration form
├── css/
│   └── style.css       # All styling (dark theme, responsive)
├── js/
│   ├── app.js          # Navigation, smooth scroll, animations
│   └── auth.js         # Form validation, localStorage management
└── images/             # Image folder (uses external stock images)
```

## 🚀 Getting Started

1. **Open the project** in a web browser
   - Open `index.html` to view the homepage

2. **Navigate the site**:
   - **Homepage**: Hero section with features and how-it-works
   - **Login**: `login.html` - Sign in with demo credentials
   - **Register**: `register.html` - Create a new account

3. **Demo Credentials** (automatically populated):
   ```
   Email: john@example.com
   Password: password123
   
   Email: sarah@example.com
   Password: password123
   ```

## ✨ Features

### Homepage
- **Navbar**: Sticky navigation with hamburger menu for mobile
- **Hero Section**: Headline, subtext, and CTA buttons with gradient text
- **Features Grid**: 6 feature cards with icons and descriptions
- **How It Works**: 3-step process with visual indicators
- **Contact Section**: Email, social links
- **Footer**: Copyright and branding

### Authentication
- **Login Form**: Email, password, remember me
- **Register Form**: Name, email, password, role selection
- **Form Validation**: 
  - Required field checks
  - Email format validation
  - Password minimum length (6 characters)
  - Duplicate email prevention

### Data Storage
- Uses `localStorage` for persistent data
- User accounts stored securely
- Session management with login/logout
- Demo users auto-initialized on first load

## 🎯 Color Palette

| Element | Color |
|---------|-------|
| Background | #121212 |
| Cards/Sections | #1E1E1E |
| Text | #FFFFFF |
| Accent/Buttons | #2563EB |
| Subtitle Text | #B0B0B0 |
| Error Text | #FF6B6B |

## 🔧 JavaScript Functionality

### app.js
- Navigation hamburger menu toggle
- Smooth scroll for anchor links
- Scroll reveal animations
- Button ripple effects
- Accessibility features (ESC key to close menu)

### auth.js
- Login/Register form handling
- Email validation
- Password strength checking
- localStorage user management
- Session handling
- Automatic demo user initialization

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (grid layouts)
- **Tablet**: 768px - 1199px (modified grids)
- **Mobile**: Below 768px (stacked layouts)
- **Small Mobile**: Below 480px (optimized spacing)

## 🎭 Interactive Elements

- **Hover Effects**: Cards lift on hover with shadow enhancement
- **Button States**: Blue primary, outlined secondary
- **Form Focus**: Blue border and shadow on input focus
- **Navigation**: Underline animation on hover
- **Animations**: Fade-in on page load and scroll

## 🌐 External Resources

- **Google Fonts**: Inter (400, 500, 600, 700 weights)
- **Stock Images**: Unsplash API for professional photos
- **Icons**: Custom SVG icons (no emoji used)

## 📝 Notes

- All data is stored in browser's localStorage
- No backend server required
- Perfect for learning web development
- Easy to extend with portfolio builder functionality

## 🔮 Future Enhancements

Potential features to add:
- Portfolio creation/editing interface
- Template selection and customization
- Portfolio publishing and sharing
- Portfolio analytics and visitors tracking
- Backend integration for persistent storage
- Email verification
- Password reset functionality

## 📄 License

Free to use for personal and educational purposes.

---

**Built with**: HTML5, CSS3, JavaScript (ES6+)
**Last Updated**: December 2024
