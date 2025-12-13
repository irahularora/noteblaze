# NoteBlaze (iNotebook)

NoteBlaze is a powerful and secure cloud-based notebook application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to manage their personal notes securely on the cloud with features like creating, updating, deleting, and accessing notes from anywhere.

## 🚀 Key Features

*   **User Authentication**: Secure Signup and Login functionality using JWT/Bcrypt.
*   **CRUD Operations**: Create, Read, Update, and Delete notes seamlessly.
*   **Security**: Notes are protected and linked to specific user accounts.
*   **Responsive Design**: A user-friendly interface that works across devices.
*   **Tagging**: Organize notes with custom tags.
*   **Real-time Feedback**: Interactive alerts for user actions (e.g., "Note Added Successfully").

## 🛠️ Tech Stack

### Frontend
*   **React.js**: Functional components with Hooks for building the UI.
*   **React Router**: For seamless client-side navigation between pages (Home, About, Login/Signup).
*   **Context API**: For centralized state management (Notes, User User, Alerts) to avoid prop-drilling.
*   **Bootstrap / CSS**: For styling and responsive layout.

### Backend
*   **Node.js**: Asynchronous event-driven JavaScript runtime.
*   **Express.js**: Fast, unopinionated web framework for Node.js to handle API routes.
*   **MongoDB**: NoSQL database for flexible data storage (Users, Notes).
*   **Mongoose**: ODM library for defining schemas and interacting with MongoDB.
*   **JWT & Bcrypt**: JSON Web Tokens for stateless authentication and Bcrypt for password encryption.

---

## ⚙️ Installation & Setup Guide

Follow these steps to set up the project locally.

### Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [npm](https://www.npmjs.com/) (Node Package Manager)
*   A MongoDB connection string (Local or MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd noteblaze
```

### 2. Install Dependencies

You need to install dependencies for both the **Frontend** (root) and **Backend**.

**Root (Frontend) Dependencies:**
```bash
npm install
```

**Backend Dependencies:**
Navigate to the backend folder and install its dependencies:
```bash
cd backend
npm install
cd ..
```

### 3. Environment Variables Configuration

Create a `.env` file in the `backend/` directory to store sensitive information.

**Path:** `backend/.env`

Add the following variables:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
> **Note:** Replace `your_mongodb_connection_string` with your actual MongoDB URI.

### 4. Running the Application

This project uses `concurrently` to run both the frontend (React) and backend (Node/Express) servers simultaneously with a single command.

**From the root directory, run:**
```bash
npm run both
```

*   **Frontend** will launch at: `http://localhost:3000`
*   **Backend** will launch at: `http://localhost:5000`

---

## 📖 How It Works

The NoteBlaze application follows a structured workflow to ensure a smooth user experience:

1.  **Authentication Flow**:
    *   **Sign Up**: Users create an account via the Signup form. The backend validates inputs (email format, password length) and stores the user with an encrypted password.
    *   **Login**: Registered users log in to receive an authentication token (JWT), which is stored locally (`localStorage`) to maintain the session.

2.  **Dashboard & Note Management**:
    *   **Viewing Notes**: Upon logging in, the `Home` component fetches the user's notes from the database using the `Context API`. Only notes belong to the authenticated user are displayed.
    *   **Adding Notes**: Users can create new notes using the "Add a Note" section. A formatted request is sent to the backend, linking the note to the user's ID.
    *   **Editing Notes**: Clicking the edit icon opens a specific Modal. The app pre-fills the current data, allowing users to modify the title, description, or tags.
    *   **Deleting Notes**: Users can remove unwanted notes instantly.

3.  **Behind the Scenes**:
    *   **State Management**: The application uses React's `Context API` (`NoteState`) to manage the global state of notes and user details. This ensures that when a note is added or deleted, the UI updates instantly without requiring a page reload.
    *   **API Security**: Every request to the backend (except login/signup) requires a valid `auth-token` header. Middleware (`fetchuser.js`) verifies this token before allowing access to private data.

## 📜 Available Scripts

In the project directory, you can run:

*   `npm run both`: Runs both Frontend and Backend concurrently.
*   `npm start`: Runs only the Frontend (React App).
*   `npm run build`: Builds the Frontend for production.
*   `npm test`: Launches the test runner.
*   `npm run start-render`: Starts the backend server (used for deployment).

## 📂 Project Structure

```
noteblaze/
├── backend/            # Backend Node.js/Express Code
│   ├── middleware/     # Custom Middleware (e.g., fetchuser)
│   ├── models/         # Mongoose Models (User, Note)
│   ├── routes/         # API Routes (auth, notes)
│   ├── db.js           # Database Connection Logic
│   └── index.js        # Entry point for Backend
├── src/                # Frontend React Code
│   ├── components/     # React Components (Home, About, Notes, etc.)
│   ├── context/        # Context API State Management (NoteState)
│   └── App.js          # Main Application Component
├── public/             # Static assets
└── package.json        # Root config & scripts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
