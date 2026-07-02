# NeerPeer

NeerPeer is a social networking web application built for college students to connect with peers based on shared interests, career goals, and hobbies.

The platform enables students to build meaningful connections, share experiences, discover like-minded peers, and find compatible roommates within their college community.

---

## 🚀 Features

* 🔐 **Secure Authentication & Authorization** – Integrated with Firebase Authentication for secure login and registration.
* 👥 **User Profiles** – Create and manage student profiles with academic details, interests, hobbies, and career goals.
* 📰 **Personalized Feed** – Create, view, and interact with posts from peers.
* ❤️ **Post Interactions** – Like and engage with posts shared by other students.
* 🛏 **Roommate Finder** – Match with potential roommates based on career aspirations, sports interests, and lifestyle preferences.
* 🤝 **Peer Discovery** – Connect with students who share similar interests and goals.
* 🎨 **Modern Responsive UI** – Clean and responsive user interface built with React and Tailwind CSS.
* 📡 **RESTful APIs** – Well-structured backend APIs for seamless communication between frontend and backend.
* ☁️ **Cloud Storage Integration** – Upload and manage media using Cloudinary.
* 🌍 **CORS Enabled** – Secure cross-origin communication between frontend and backend.

---

## 🛠 Tech Stack

### Frontend

* React
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB

### Authentication

* Firebase Authentication

### Cloud Storage

* Cloudinary

---

## 📂 Project Structure

```text
NeerMate/
│
├── frontend/     # React + Tailwind CSS frontend
└── backend/      # Node.js + Express backend
```

---

## ⚡ Getting Started

### 1. Clone the Project

```bash
git clone https://github.com/nipunmodi/NeerPeer.git

cd NeerMate
```

---

## 🖥 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add:

```env
REACT_APP_BACKENDURL=<backend_url>

# Firebase Configuration
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```

Start the frontend server:

```bash
npm start
```

---

## ⚙️ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add:

```env
MONGOURL=
PORT=
BACKEND_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Add the `firebase_keys.json` file inside the `config` folder and specify its location in `Firebase.js`.

Start the backend server:

```bash
npm run dev
```

---

## 🔥 Environment Variables

### Frontend

```env
REACT_APP_BACKENDURL=
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```

### Backend

```env
MONGOURL=
PORT=
BACKEND_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 📌 Core Modules

* Authentication & Authorization
* User Profile Management
* Post Management
* Feed Generation
* Roommate Matching System
* Media Upload Management
* Peer Connection System

---

## 🌟 Future Enhancements

* Real-time Chat System
* Notifications
* Friend Requests
* Recommendation System
* Advanced Search & Filters
* AI-based Roommate Matching

---

## 📄 License

This project is intended for educational and learning purposes.
