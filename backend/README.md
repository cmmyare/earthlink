# Backend API - AI Video Generation MVP

Express.js backend with MongoDB Atlas integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://cmmyare24:Dere959788@cluster0.qysmbj1.mongodb.net/earthlink?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

3. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### User Routes (`/api/users`)

#### Register User
- `POST /api/users/register`
- Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "user": {
        "id": "user_id",
        "email": "user@example.com",
        "credits": 200
      },
      "token": "jwt_token_here"
    }
  }
  ```

#### Login User
- `POST /api/users/login`
- Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": "user_id",
        "email": "user@example.com",
        "credits": 120
      },
      "token": "jwt_token_here"
    }
  }
  ```

## Project Structure

```
backend/
├── config/
│   └── database.js       # MongoDB connection
├── controllers/
│   └── userController.js # User business logic
├── models/
│   └── User.js           # User mongoose schema
├── routes/
│   └── userRoutes.js     # User API routes
├── server.js             # Express app entry point
├── .env                  # Environment variables
└── package.json
```

## Features

- ✅ User registration with email/password
- ✅ User login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ MongoDB Atlas integration
- ✅ CORS enabled for frontend
- ✅ Error handling middleware
