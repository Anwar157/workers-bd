#  Workers Platform

A full-stack web application where workers can create professional profiles, clients can post jobs, and both can connect easily through a secure and modern system.



##  Project Overview

 Workers Platform  is a role-based job marketplace designed to connect skilled workers with clients.  
Users can register, complete their profiles, select roles (Worker / Client / Both), and securely interact with the platform.

This project is built using **React, Firebase Authentication, Node.js, Express, MongoDB, and JWT** with a strong focus on security and scalability.


##  Key Features

###  Authentication & Security
- Firebase Authentication (Email & Password)
- JWT-based secure API access
- Protected routes for authenticated users
- Role-based access control (Admin / Worker / Client)

###  User Features
- User registration & login
- Profile creation and update (own profile only)
- Image upload using ImageBB
- Role selection (Worker / Client / Both)
- Secure dashboard access

###  Worker Features
- Create professional worker profile
- Add skills, experience, rate, and availability
- Visible in public worker listings
- Apply for available jobs

###  Client Features
- Post jobs
- Browse available workers
- View worker profiles

###  Admin Features
- View all users
- Manage user roles (Admin only)
- Full system control

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API
- React Hook Form
- Axios
- SweetAlert2
- Tailwind CSS + DaisyUI

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- dotenv

### Authentication & Storage
- Firebase Authentication
- ImageBB (Image Hosting)

---

## 📁 Project Structure
 │
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── layouts/
│ │ └── routes/
│ └── main.jsx
│
├── server/
│ ├── index.js
│ ├── middleware/
│ └── routes/
│
└── README.md


---

## 🔑 Authentication Flow

1. User registers using Firebase
2. User data saved to MongoDB
3. Backend generates JWT token
4. Token stored in `localStorage`
5. Token sent via `Authorization: Bearer <token>` header
6. Backend verifies token on protected routes

---

## 🔐 API Security Rules

- Users can update **only their own profiles**
- Admin can update any user
- Role updates are restricted to Admin
- All protected routes require a valid JWT token

---

## ⚙️ Environment Variables

### Client (.env)
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_image_host=your_imagebb_api_key

shell
Copy code

### Server (.env)
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
JWT_SECRET=your_secret_key
PORT=3000

yaml
Copy code

---

##  How to Run the Project

###  Clone Repository
```bash
git clone https://github.com/your-username/workers-platform.git
Install Dependencies
bash
Copy code
cd client
npm install

cd ../server
npm install
Start Development Servers
bash
Copy code
# Client
npm run dev

# Server
nodemon index.js
API Endpoints (Sample)
Method	Endpoint	Access
POST	/jwt	Public
POST	/users	Public
GET	/users/:uid	User / Admin
PATCH	/users/:uid	User / Admin
PATCH	/users/profile/:uid	User / Admin
PATCH	/users/role/:uid	Admin
GET	/workers	Public
Future Improvements
Job application system

Real-time chat between workers & clients

Review & rating system

Payment gateway integration

Notifications system

#### Author #####
Anwar Hossen
 Web Developer | Full Stack Learner
📍 Bangladesh

❤️ Acknowledgements
Firebase, MongoDB, ‍React , React-Router, Tailwind, Daisy, Hook from, Sweet alert .

Programming Hero

Open Source Community

 License
This project is licensed for educational and personal use.













