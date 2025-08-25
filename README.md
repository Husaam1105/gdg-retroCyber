# 🚀 Retro-Cyber Terminal - GDG Digital Interface Challenge

A complete full-stack web application featuring a 1990s terminal aesthetic with modern authentication and an investigative puzzle mechanism.

## 🎯 Project Overview

This application fulfills the requirements of the **GDG Digital Interface Challenge**, implementing:

- **Retro-cyber terminal interface** with authentic 1990s styling
- **JWT-based authentication system** with PostgreSQL backend
- **Multi-step investigative puzzle** requiring code inspection and user interaction
- **Production-ready architecture** with proper security and error handling

## 🛠️ Technical Stack

### Frontend (React)
- **React 18.3** with modern hooks and functional components
- **Tailwind CSS** for responsive styling and terminal aesthetics
- **Vite** for fast development and optimized builds
- **Axios** for API communication

### Backend (Node.js)
- **Express.js** server with security middleware
- **PostgreSQL** database with connection pooling
- **JWT authentication** with bcrypt password hashing
- **Rate limiting** and input validation

## 🎨 Features

### Visual Design
- **Dark terminal background** (#0A0A0A) with neon green, blue, and magenta colors
- **Typing animations** with realistic character-by-character display
- **Glitch effects** for error states and visual emphasis
- **CRT scanlines overlay** simulating old monitor effects
- **ASCII art welcome screen** with cyberpunk branding

### Interactive Elements
- **Command-line interface** for all user interactions
- **Command history** with arrow key navigation
- **Real-time authentication** status display
- **Responsive design** for all device sizes

### Security Features
- **JWT token authentication** with secure storage
- **Password hashing** using bcrypt with salt rounds
- **Rate limiting** to prevent abuse
- **Input validation** and SQL injection protection
- **CORS configuration** for cross-origin requests

## 🕵️ The Investigation Puzzle

The application includes a three-step puzzle mechanism:

### Step 1: Decipher Code 
```jsx
{/* Cipher: "ohjdo-ohjoh-2024" */}
{/* Hint: Sometimes justice is just 3 steps back... */}
{/* Once deciphered, use the command: decipher <your-answer> */}
```

### Step 2: Repair Code
- The clue directs players to run a system command, but it appears in a corrupted form.
- Entering the corrupted command triggers an error message with a repair hint.
- Puzzle: decode or “repair” the command using the hint (keyboard drift / T9 keypad mapping).
- The corrected command is scan, which must be entered to continue the investigation.

### Step 3: Hover Discovery
Interactive element in bottom-right corner reveals command when hovered: 
- Only visible to authenticated users. 
- Shows "Execute: reveal-secret" on hover

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn package manager

### Database Setup
1. Create PostgreSQL database:
```sql
CREATE DATABASE retro_cyber_db;
CREATE USER your_db_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE retro_cyber_db TO your_db_user;
```

2. Configure environment variables:
```bash
cd server
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

3. Initialize database:
```bash
npm run setup-db
```

### Application Setup
1. Install all dependencies:
```bash
npm run install-all
```

2. Start development servers:
```bash
npm run dev
```

3. Access application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 🎮 Usage Guide

### Basic Commands
- `help` - Display all available commands
- `status` - Show system status
- `whoami` - Display current user information

### Authentication
- `register <username> <password>` - Create new account
- `login <username> <password>` - Login to system
- `logout` - End current session

### Investigation
- `scan` - Scan for system anomalies
- `case` - Get the current case briefing and clue
- `reveal-secret` - Execute final puzzle command (auth required)
- `decipher <clue>` - Decipher a coded message
- `repair <code>` - Repair a corrupted command 

## 🏗️ Architecture

### File Structure
```
├── server/                 # Backend Node.js application
│   ├── config/            # Database and app configuration
│   ├── middleware/        # Express middleware (auth, etc.)
│   ├── routes/           # API route handlers
│   ├── scripts/          # Database setup scripts
│   └── index.js          # Server entry point
│
├── client/                # Frontend React application
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Utility functions and API calls
│   │   ├── constants/    # Application constants
│   │   └── App.jsx       # Main application component
│   └── index.html        # HTML entry point
│
└── package.json          # Root package.json for scripts
```

### Component Architecture
- **TerminalWindow**: Main terminal interface container
- **TypingText**: Animated typing effect component
- **CommandInput**: Command line input handler
- **Scanlines**: CRT monitor effect overlay
- **GlitchEffect**: Text glitch animation component

### API Architecture
- **Authentication Routes** (`/api/auth`):
  - POST `/register` - User registration
  - POST `/login` - User login
  - GET `/verify` - Token verification

- **Secret Routes** (`/api/secret`):
  - GET `/reveal` - Final secret key (protected)
  - GET `/status` - Puzzle status information

## 🔐 Security Implementation

### Authentication Flow
1. User registers/logs in with credentials
2. Server validates and returns JWT token
3. Client stores token in localStorage
4. All protected requests include Bearer token
5. Server validates token on each request

### Password Security
- Bcrypt hashing with 12 salt rounds
- No plaintext password storage
- Secure password requirements

### API Security
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Input validation and sanitization
- SQL injection prevention
- Helmet.js security headers

## 🎯 Challenge Completion

This application successfully implements all required features:

✅ **Frontend (70% focus)**
- React-based terminal interface
- Retro-cyber styling with animations
- Command-line interaction system
- Responsive design

✅ **Backend (20% focus)**  
- Node.js/Express server
- PostgreSQL database
- JWT authentication
- Protected API endpoints

✅ **Documentation (10% focus)**
- Comprehensive README
- Inline code comments
- API documentation
- Setup instructions

## 🚀 Deployment

### Production Build
```bash
# Build client
cd client && npm run build

# Start production server
cd server && npm start
```

### Environment Variables
Configure production environment variables:
- `NODE_ENV=production`
- `JWT_SECRET` - Strong random secret
- Database credentials
- `CORS` origins for your domain

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify PostgreSQL is running
   - Check credentials in .env file
   - Ensure database exists

2. **Authentication Errors**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Clear localStorage if needed

3. **Commands Not Working**
   - Ensure proper syntax
   - Check authentication status
   - Verify API connection

### Development Tips
- Use browser DevTools to inspect network requests
- Check server logs for detailed error messages
- Examine localStorage for authentication tokens
- Look for console errors in browser

## 📊 Performance Optimizations

- **Code Splitting**: Vendor and utility chunks
- **Lazy Loading**: Components loaded on demand  
- **Connection Pooling**: PostgreSQL connection reuse
- **Rate Limiting**: Prevents API abuse
- **Caching**: Static asset optimization

**Key Technologies**: React, Node.js, Express, PostgreSQL, JWT, Tailwind CSS

**Developed by**: Husaamuddin Mohammed   
**Version**: 1.0.0

---
