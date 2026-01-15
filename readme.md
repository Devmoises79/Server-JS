# 📋 Authentication System with Express.js
A simple user authentication and management system built with Node.js and Express, using sessions for access control.

## 🚀 Features

- ✅ Login/logout system with sessions
- ✅ Protected pages (require authentication)
- ✅ Dashboard after login
- ✅ Form to add users
- ✅ User details pages
- ✅ Authentication middleware
- ✅ Automatic generation of secure session keys
- ✅ Pure HTML (no CSS or JavaScript)

## 📁 Project Structure

```text
Server JS/
├── index.js # Main server file
├── package.json # Dependencies and configurations
├── package-lock.json # Dependencies*
└── templates/ # HTML pages
├── login.html # Login page
├── dashboard.html # Dashboard after login
├── users.html # Add user form
└── user-details.html # User details page
```



## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **express-session** - Middleware for session management
- **crypto** (native) - For secure key generation

## 🔧 Installation and Configuration

### 1. Prerequisites
- Node.js (version 14 or higher)
- npm (package manager)

### 2. Clone and Install

```bash
# Clone the repository or copy the files
cd "C:\Users\MOISÉS\Desktop\Server JS"
```

# Install dependencies

```bash
npm install
```

3. Run the Project

```bash
# Development mode (with nodemon)
npm start
```

# Or run directly

```
node index.js
```

4. Access the Application

* Open your browser and go to: http://localhost:3000

# 👥 Access Credentials

* The system comes with two pre-registered users for testing:

```text
Username	Password	Name
admin	123	Administrator
user	456	Test User
```

# 🧭 Navigation Flow

- Initial Access (/) → Redirects to /login

- Login Page → Enter valid credentials

- Dashboard (/) → Main menu after login

- Add User (/users/add) → Registration form

- User Details (/users/:id) → Example page

- Logout (/logout) → Ends session and redirects to login

🔐 Security Features

- Authentication Middleware

- All routes (except login and logout) are protected

- Automatic generation of secure secret keys

- Automatic redirection to login when not authenticated

* Session Management


```javascript
// Session configuration
app.use(session({
    secret: crypto.randomBytes(32).toString('hex'), // Random key
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 15 * 60 * 1000, // 15 minutes
        httpOnly: true          // Protection against XSS
    }
}));
```

# 📝 Available Routes

Public Routes (no authentication required): 

- GET /login - Login page

- POST /login/submit - Processes login form

- GET /logout - Ends session

- Protected Routes (require authentication)

- GET / - Main dashboard

- GET /users/add - Form to add user

- POST /users/save - Processes user form

- GET /users/:id - User details page


# 🧪 Testing the System

1. Login Test

```bash
# Valid credentials
Username: admin
Password: 123
```

# Or

```bash
Username: user
Password: 456
```

2. Functionality Test

- Try to access / without logging in → Redirects to /login

- Log in with valid credentials → Access to dashboard

- Click "Add User" → Form appears

- Fill out the form → Data is logged to console

- Click "Logout" → Session is ended

# 🔧 Customization

* Add New Users
Edit the users array in the index.js file:

```javascript
const users = [
    { id: 1, username: 'admin', password: '123', name: 'Administrator' },
    { id: 2, username: 'user', password: '456', name: 'Test User' },
    // Add new users here
    { id: 3, username: 'newuser', password: 'password123', name: 'New User' }
];
```

* Modify Session Time
In the index.js file, change the maxAge:

```javascript
cookie: { 
    maxAge: 30 * 60 * 1000, // 30 minutes (in milliseconds)
    // ...
}
```


# 🐛 Troubleshooting

Problem: "HTML file not found"
Solution: Check if the templates folder exists with all HTML files.

Problem: "Login fails even with correct credentials"
Solution: Make sure you're using the correct credentials (admin/123 or user/456).

Problem: "Session doesn't persist"
Solution: Session expires after 15 minutes of inactivity. Log in again.

Problem: "Port already in use"
Solution: Change the port in the index.js file:

javascript
const port = 3001; // Or another available port


# 🔮 Possible Future Improvements

* Database - Replace user array with a real database

* Encryption - Hash for passwords (bcrypt)

* Validation - Form validation on frontend/backend

* CSS - Page styling

* Image Upload - For user avatars

* REST API - Endpoints for frontend applications

* Tests - Automated tests


# 👨‍💻 Author
Moises - BackEnd Developer

# 📄 License
This project is under the MIT License - see the LICENSE file for details.