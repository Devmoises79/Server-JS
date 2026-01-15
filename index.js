const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const session = require('express-session');
const crypto = require('crypto');

// Generate secret key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('🔑 Secret key:', secretKey);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 15 * 60 * 1000 // 15 minutes
    }
}));

const basePath = path.join(__dirname, 'templates');
console.log('📁 Templates path:', basePath);

// VALID USERS - ONLY THESE CAN LOGIN
const validUsers = {
    'admin': '123',
    'user': '456'
};

// Authentication middleware - SIMPLE AND EFFECTIVE
const checkAuth = (req, res, next) => {
    // Public routes (no authentication required)
    const publicRoutes = ['/login', '/login/submit', '/logout'];
    
    if (publicRoutes.includes(req.path)) {
        return next(); // Allow access to login pages
    }
    
    // Check if user is authenticated
    if (req.session && req.session.isAuthenticated) {
        console.log(`✅ Authenticated user: ${req.session.username}`);
        return next();
    }
    
    // Not authenticated - redirect to login
    console.log('❌ Access denied - not authenticated');
    res.redirect('/login');
};

// Apply middleware to ALL routes
app.use(checkAuth);

// Login page route
app.get('/login', (req, res) => {
    console.log('📄 Serving login page');
    
    // If user is already logged in, redirect to dashboard
    if (req.session.isAuthenticated) {
        console.log('↪️ Already authenticated, redirecting to dashboard');
        return res.redirect('/');
    }
    
    // Serve the login.html file
    res.sendFile(`${basePath}/login.html`, (err) => {
        if (err) {
            console.error('❌ Error loading login.html:', err.message);
            res.status(404).send('Login page not found');
        }
    });
});

// Process login form - REAL VALIDATION HERE
app.post('/login/submit', (req, res) => {
    const { username, password } = req.body;
    console.log(`🔐 Login attempt: username="${username}"`);
    
    // REAL VALIDATION: Check if user exists AND password matches
    if (validUsers[username] && validUsers[username] === password) {
        // VALID CREDENTIALS
        req.session.isAuthenticated = true;
        req.session.username = username;
        console.log(`✅ SUCCESSFUL login for: ${username}`);
        
        // Redirect to dashboard
        return res.redirect('/');
    } else {
        // INVALID CREDENTIALS - ANY OTHER COMBINATION FAILS
        console.log(`❌ FAILED login: ${username}`);
        console.log(`💡 Valid users: ${Object.keys(validUsers).join(', ')}`);
        
        // Redirect back to login WITH ERROR PARAMETER
        return res.redirect('/login?error=1');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    console.log('🚪 Logout requested');
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Dashboard route (protected - requires authentication)
app.get('/', (req, res) => {
    console.log('🏠 Accessing dashboard');
    res.sendFile(`${basePath}/dashboard.html`, (err) => {
        if (err) {
            console.error('❌ Error loading dashboard:', err.message);
            res.status(404).send('Dashboard not found');
        }
    });
});

// Add user form (protected)
app.get('/users/add', (req, res) => {
    console.log('📋 Accessing user form');
    res.sendFile(`${basePath}/users.html`, (err) => {
        if (err) {
            console.error('❌ Error loading user form:', err.message);
            res.status(404).send('User form not found');
        }
    });
});

// Save user data (protected)
app.post('/users/save', (req, res) => {
    const { name, age } = req.body;
    console.log(`💾 Saving user: ${name}, ${age} years old`);
    res.redirect('/users/add');
});

// User details (protected)
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log(`👤 Viewing user ID: ${id}`);
    res.sendFile(`${basePath}/user-details.html`, (err) => {
        if (err) {
            console.error('❌ Error loading user details:', err.message);
            res.status(404).send('User details page not found');
        }
    });
});

// File test route
app.get('/test-file', (req, res) => {
    const filePath = `${basePath}/login.html`;
    console.log('🧪 Testing file path:', filePath);
    
    const fs = require('fs');
    if (fs.existsSync(filePath)) {
        console.log('✅ File exists!');
        res.send('File exists at path: ' + filePath);
    } else {
        console.log('❌ File does NOT exist!');
        res.send('File does NOT exist at path: ' + filePath);
    }
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`🔗 Access: http://localhost:${port}`);
    console.log(`🔗 Login page: http://localhost:${port}/login`);
    console.log('⚠️  Test credentials:');
    console.log('   ✅ Valid: admin / 123');
    console.log('   ✅ Valid: user / 456');
    console.log('   ❌ Invalid: any other combination');
});