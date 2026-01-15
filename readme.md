# 🔐 Express Authentication System

* A secure and simple user authentication system built with Node.js, Express, and session-based access control. Features protected routes, login/logout functionality, and user management pages.

## ✨ Features

- **🔒 Session-based Authentication** - Secure login system with session management
- **🛡️ Protected Routes** - Middleware ensures only authenticated users access protected pages
- **📊 User Management** - Add users and view user details
- **⚡ Auto Key Generation** - Secure session keys generated automatically using crypto
- **🔄 Smart Error Handling** - Proper error messages for failed login attempts
- **⏱️ Session Expiry** - Automatic session expiration after 15 minutes of inactivity

## 🏗️ Project Structure

```text
Server-JS/
├── index.js # Main server application
├── package.json # Dependencies and scripts
├── package-lock.json # Locked dependencies
└── templates/ # HTML templates
├── login.html # Login page with error display
├── dashboard.html # Main dashboard after login
├── users.html # User registration form
└── user-details.html # User details display
```

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Devmoises79/Server-JS.git
   cd Server-JS
   ```

* Install dependencies

```bash
npm install
```

* Start the server:

```bash
# Development mode with auto-restart
npm start
```

# Or run directly

```bash
node index.js
```

* Access the application

* Open your browser and navigate to: http://localhost:3000

* You'll be redirected to the login page

# 👥 Default Users
For testing purposes, the system comes with two pre-configured users:

```text
Username	Password	Name
admin	123	Administrator
user	456	Test User
```

* Note: Any other username/password combination will result in a login error.

# 🧭 Application Flow

```text
Not Authenticated → /login → Enter Credentials → Validation
       ↑                              ↓
    /logout          [SUCCESS]        [FAILURE]
       ↑                  ↓                ↓
    Session      Dashboard (/)     /login?error=1
    Destroy                        (shows error message)
```

# 🔐 Security Implementation

* Session Configuration


```javascript
app.use(session({
    secret: crypto.randomBytes(32).toString('hex'), // Random 256-bit key
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 15 * 60 * 1000, // 15 minutes
        httpOnly: true          // Protects against XSS
    }
}));
```

* Authentication Middleware
The checkAuth middleware protects all routes except:

- GET /login - Login page

- POST /login/submit - Login processing

- GET /logout - Session termination

* Unauthenticated users attempting to access protected routes are automatically redirected to /login.

# 📡 API Routes


Public Routes (No Authentication Required):

```text
 Method	Route	Description
- GET	/login	Display login form
- POST	/login/submit	Process login credentials
- GET	/logout	Destroy session and logout
```

Protected Routes (Authentication Required):

```text
Method	Route	Description
GET	/	Main dashboard
GET	/users/add	User registration form
POST	/users/save	Process new user data
GET	/users/:id	Display user details
```

# 🧪 Testing Guide

1. Login Test

- Valid Credentials: Use admin/123 or user/456 → Redirects to dashboard

- Invalid Credentials: Use any other combination → Shows error message

2. Protection Test
* Try accessing http://localhost:3000/ without logging in → Automatically redirects to login page

* After login, access is granted to all protected routes

3. Session Test

* Login successfully → Access dashboard page

* Wait 15 minutes without activity → Session expires

* Try accessing protected route → Redirects to login page

4. Logout Test

* Click logout or navigate to /logout → Session destroyed

* Redirected to login page

# ⚙️ Configuration & Customization (actually)

* Adding New Users
Edit the validUsers object in index.js:

```
javascript
const validUsers = {
    'admin': '123',
    'user': '456',
    'newuser': 'password123'  // Add new users here
};
```

* Changing Session Duration

Modify the maxAge value in the session configuration:


```javascript
cookie: { 
    maxAge: 30 * 60 * 1000, // 30 minutes (in milliseconds)
    // ...
}
```


* Changing Server Port
Update the port in index.js:


```javascript
const port = 3001; // Or any available port
```


# 🐛 Troubleshooting
Problem	Solution
- "HTML file not found"	Verify the templates/ folder exists with all HTML files
- "Login fails with correct credentials"	Check you're using exact credentials: admin/123 or user/456
- "Session doesn't persist"	Session expires after 15 minutes; log in again
- "Port 3000 already in use"	Change port in index.js to an available port
- "Error message not showing"	Check browser console for JavaScript errors, ensure URL has ?error=1


# 🔮 Future Enhancements

- 📦 Database Integration - Replace in-memory users with PostgreSQL/MySQL

- 🔐 Password Hashing - Implement bcrypt for secure password storage

- ✅ Input Validation - Server-side validation for all form inputs

- 🎨 UI Styling - Add CSS framework for better visual design

- 📸 File Upload - Profile picture upload functionality

- 🔌 REST API - JSON endpoints for frontend applications

- 🧪 Automated Testing - Unit and integration tests

- 📱 Responsive Design - Mobile-friendly interface

# 👨‍💻 Development

Running in Development Mode
The project includes nodemon for automatic server restart during development:

```bash
npm start
```

* File Structure Details:

- index.js: Main application logic with route definitions and middleware

- templates/login.html: Login form with JavaScript error handling

- templates/dashboard.html: Main interface after successful login

- templates/users.html: Form for adding new users

- templates/user-details.html: Template for displaying user information

# 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.


# 👤 Author
Moises - Backend Developer
GitHub: @Devmoises79

* ⭐ Star this repository if you found it useful!

```text

This updated README includes:

1. **Clear English instructions** throughout
2. **Updated authentication flow** with proper error handling
3. **Testing instructions** for the improved validation system
4. **Troubleshooting section** for common issues
5. **Enhanced security details** about the session management
6. **Visual hierarchy** with emojis and clear section headers
7. **Complete setup and usage guide** for new users
```