// ===== Authentication Module =====

// Form selectors
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Initialize auth listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Check if user is already logged in
    checkUserSession();
});

// ===== Login Handler =====
function handleLogin(e) {
    e.preventDefault();

    // Clear previous errors
    clearErrors(['email', 'password']);

    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const remember = document.querySelector('input[name="remember"]').checked;

    // Validate inputs
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        return;
    }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('portabuild_users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        showAuthMessage('Invalid email or password', 'error');
        return;
    }

    // Successful login
    const sessionData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        loggedInAt: new Date().toISOString()
    };

    localStorage.setItem('portabuild_session', JSON.stringify(sessionData));

    if (remember) {
        localStorage.setItem('portabuild_remember', 'true');
    }

    showAuthMessage('Login successful! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// ===== Register Handler =====
function handleRegister(e) {
    e.preventDefault();

    // Clear previous errors
    clearErrors(['name', 'email', 'password', 'role', 'terms']);

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
    const terms = document.querySelector('input[name="terms"]').checked;

    // Validate inputs
    let hasErrors = false;

    if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        hasErrors = true;
    }

    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        hasErrors = true;
    }

    if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        hasErrors = true;
    }

    if (!role) {
        showError('role', 'Please select a role');
        hasErrors = true;
    }

    if (!terms) {
        showError('terms', 'You must agree to the terms and conditions');
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('portabuild_users')) || [];
    if (users.some(u => u.email === email)) {
        showError('email', 'This email is already registered');
        return;
    }

    // Create new user
    const newUser = {
        id: generateUserId(),
        name: name,
        email: email,
        password: password,
        role: role,
        createdAt: new Date().toISOString(),
        portfolios: []
    };

    // Add user to localStorage
    users.push(newUser);
    localStorage.setItem('portabuild_users', JSON.stringify(users));

    // Create session
    const sessionData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        loggedInAt: new Date().toISOString()
    };

    localStorage.setItem('portabuild_session', JSON.stringify(sessionData));

    showAuthMessage('Account created successfully! Redirecting...', 'success');

    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// ===== Validation Functions =====
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// ===== Error Display Functions =====
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';

        // Add error state to input
        const inputElement = document.getElementById(fieldId);
        if (inputElement) {
            inputElement.style.borderColor = '#FF6B6B';
            inputElement.addEventListener('focus', () => {
                inputElement.style.borderColor = '#2563EB';
                errorElement.textContent = '';
            });
        }
    }
}

function clearErrors(fieldIds) {
    fieldIds.forEach(fieldId => {
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }

        const inputElement = document.getElementById(fieldId);
        if (inputElement) {
            inputElement.style.borderColor = '';
        }
    });
}

function showAuthMessage(message, type) {
    const messageElement = document.getElementById('authMessage');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = 'auth-message ' + type;
        messageElement.style.display = 'block';
    }
}

// ===== Session Management =====
function checkUserSession() {
    const session = JSON.parse(localStorage.getItem('portabuild_session'));
    
    if (session) {
        console.log('User logged in:', session.name);
        // You can update UI here to show logged-in state
        return session;
    }
    
    return null;
}

function logout() {
    localStorage.removeItem('portabuild_session');
    localStorage.removeItem('portabuild_remember');
    window.location.href = 'index.html';
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('portabuild_session'));
}

// ===== Utility Functions =====
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ===== Initialize Sample Data (for demo purposes) =====
function initializeSampleData() {
    const existingUsers = localStorage.getItem('portabuild_users');
    
    if (!existingUsers) {
        const sampleUsers = [
            {
                id: 'user_demo_001',
                name: 'John Developer',
                email: 'john@example.com',
                password: 'password123',
                role: 'developer',
                createdAt: new Date().toISOString(),
                portfolios: []
            },
            {
                id: 'user_demo_002',
                name: 'Sarah Designer',
                email: 'sarah@example.com',
                password: 'password123',
                role: 'designer',
                createdAt: new Date().toISOString(),
                portfolios: []
            }
        ];

        localStorage.setItem('portabuild_users', JSON.stringify(sampleUsers));
        console.log('Sample users initialized:', sampleUsers);
    }
}

// Initialize sample data on app startup
document.addEventListener('DOMContentLoaded', function() {
    initializeSampleData();
});

console.log('Authentication module loaded!');
console.log('Demo credentials:');
console.log('Email: john@example.com | Password: password123');
console.log('Email: sarah@example.com | Password: password123');
