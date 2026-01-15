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

// Session configuration CORRECTED
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false, // false is more secure
    cookie: { 
        maxAge: 15 * 60 * 1000 // 15 minutes
    }
}));

const basePath = path.join(__dirname, 'templates');

// VERIFICATION: Shows the path being used
console.log(' Templates path:', basePath);

// Users data
const users = [
    { id: 1, username: 'admin', password: '123', name: 'Administrator' },
    { id: 2, username: 'user', password: '456', name: 'Test User' }
];

// Authentication middleware SIMPLIFIED
const checkAuth = (req, res, next) => {
    console.log(` Checking route: ${req.path}`);
    
    // Public routes
    const publicRoutes = ['/login', '/login/submit', '/logout'];
    
    if (publicRoutes.includes(req.path)) {
        console.log(' Public route, access allowed');
        return next();
    }
    
    // Check authentication
    if (req.session && req.session.isAuthenticated) {
        console.log(` Authenticated user: ${req.session.username}`);
        return next();
    }
    
    console.log(' User not authenticated, redirecting to login');
    res.redirect('/login');
};

// Apply middleware to ALL routes
app.use(checkAuth);

// Login route
app.get('/login', (req, res) => {
    console.log(' Serving login.html');
    
    // If already logged in, redirect
    if (req.session.isAuthenticated) {
        console.log(' Already authenticated, redirecting to /');
        return res.redirect('/');
    }
    
    // Try to send the file
    res.sendFile(`${basePath}/login.html`, (err) => {
        if (err) {
            console.error(' ERROR sending login.html:', err.message);
            res.status(404).send('login.html file not found');
        }
    });
});

// Process login
app.post('/login/submit', (req, res) => {
    console.log(' Login attempt:', req.body);
    
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        req.session.isAuthenticated = true;
        req.session.username = user.username;
        req.session.userId = user.id;
        req.session.userName = user.name;
        
        console.log(` Login successful: ${user.name}`);
        res.redirect('/');
    } else {
        console.log(' Login failed');
        res.redirect('/login');
    }
});

// Logout
app.get('/logout', (req, res) => {
    console.log(' Logout requested');
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Dashboard
app.get('/', (req, res) => {
    console.log(' Accessing dashboard');
    res.sendFile(`${basePath}/dashboard.html`, (err) => {
        if (err) {
            console.error(' ERROR dashboard.html:', err.message);
            res.status(404).send('Dashboard not found');
        }
    });
});

// Add user
app.get('/users/add', (req, res) => {
    console.log(' Accessing user form');
    res.sendFile(`${basePath}/users.html`, (err) => {
        if (err) {
            console.error(' ERROR users.html:', err.message);
            res.status(404).send('Form not found');
        }
    });
});

app.post('/users/save', (req, res) => {
    console.log(' Saving user:', req.body);
    const { name, age } = req.body;
    
    console.log(` Name: ${name}, Age: ${age}`);
    
    if (age >= 18) {
        console.log(' Adult');
    } else {
        console.log(` Minor: ${age} years old`);
    }
    
    res.redirect('/users/add');
});

// User details
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log(` Searching for user ID: ${id}`);
    res.sendFile(`${basePath}/user-details.html`, (err) => {
        if (err) {
            console.error(' ERROR user-details.html:', err.message);
            res.status(404).send('Details page not found');
        }
    });
});

// Route for file testing
app.get('/test-file', (req, res) => {
    const filePath = `${basePath}/login.html`;
    console.log(' Testing file path:', filePath);
    
    const fs = require('fs');
    if (fs.existsSync(filePath)) {
        console.log(' File exists!');
        res.send('File exists at path: ' + filePath);
    } else {
        console.log(' File does NOT exist!');
        res.send('File does NOT exist at path: ' + filePath);
    }
});

app.listen(port, () => {
    console.log(` Server running on port ${port}`);
    console.log(` Access: http://localhost:${port}`);
    console.log(`🔗 File test: http://localhost:${port}/test-file`);
    console.log(`🔗 Login: http://localhost:${port}/login`);
});