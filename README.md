# Fullstack Assignment - Task Management App

A scalable REST API with Authentication & Role-Based Access Control (RBAC), paired with a responsive React frontend.

## 🚀 Features

- **User Authentication**: Register and Login with secure Password Hashing & JWT.
- **Role-Based Access Control (RBAC)**:
  - `User`: Can manage their own tasks.
  - `Admin`: Can view and manage all tasks.
- **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
- **Responsive UI**: Built with React, Vite, and TailwindCSS.
- **API Documentation**: Integrated Swagger UI.
- **Scalability**: Design considerations for horizontal scaling and microservices.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React.js, Vite, TailwindCSS, Context API
- **Auth**: JSON Web Tokens (JWT), Bcryptjs
- **Tools**: Swagger (OpenAPI), Nodemon, Postman

## 📂 Project Structure

```
fullstack-assignment/
├── backend/            # Express API
│   ├── models/         # Database Schemas
│   ├── routes/         # API Routes
│   ├── middleware/     # Auth & Error Handling
│   └── server.js       # Entry Point
│
└── frontend/           # React App
    ├── src/
    │   ├── context/    # Auth State Management
    │   ├── pages/      # Views (Login, Dashboard)
    │   └── components/ # Reusable UI
    └── tailwind.config # Styling Config
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (Running locally on default port `27017` or update `.env`)

### 1. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/fullstack-assignment
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```
*Server runs on http://localhost:5000*

### 2. Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
*App runs on http://localhost:5173*

## 📖 API Documentation
Once the backend is running, visit **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)** to explore the API via Swagger UI.

## 🧪 Usage

1.  **Register** a new account via the frontend.
2.  **Login** to access the Dashboard.
3.  **Add/Edit/Delete** tasks.
4.  (Optional) Manually change a user's role to `admin` in MongoDB to test Admin privileges.

## 📝 Scalability
See [SCALABILITY.md](./SCALABILITY.md) for architectural decisions regarding scaling, caching, and deployment.
