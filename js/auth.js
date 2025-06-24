// DOM Elements
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Event Listeners for navigation buttons (on main page)
if (loginBtn) loginBtn.addEventListener('click', () => window.location.href = 'login.html');
if (signupBtn) signupBtn.addEventListener('click', () => window.location.href = 'signup.html');

// Handle Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Check against stored users
        const users = JSON.parse(localStorage.getItem('weather-app-users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store current user and redirect
            localStorage.setItem('weather-app-current-user', JSON.stringify(user));
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password');
        }
    });
}

// Handle Signup Form Submission
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        
        // Check if user exists
        const users = JSON.parse(localStorage.getItem('weather-app-users')) || [];
        const userExists = users.some(u => u.email === email);
        
        if (userExists) {
            alert('Email already in use');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password // Note: In real app, hash this password
        };
        
        // Save user and redirect
        users.push(newUser);
        localStorage.setItem('weather-app-users', JSON.stringify(users));
        localStorage.setItem('weather-app-current-user', JSON.stringify(newUser));
        
        alert('Account created successfully!');
        window.location.href = 'index.html';
    });
}