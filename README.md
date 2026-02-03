Scalable Web App (Frontend + Backend)

A full-stack Scalable Web Application built as part of the Frontend Developer Intern Assignment.
The project demonstrates secure authentication, a protected dashboard, and CRUD operations with a modern, responsive UI.

✨ Features
🔐 Authentication

User Register / Login

JWT-based authentication

Protected routes (dashboard accessible only after login)

Secure Logout

📊 Dashboard

Displays logged-in user information

Create, edit, delete notes/tasks

Mark notes as Pending / Completed

Search notes by title

Filter notes (All / Pending / Completed)

Sort notes (Newest first)

Real-time count of pending and completed notes

🔒 Security

Password hashing using bcrypt

JWT authentication middleware

User-specific data access

Backend validation & error handling

🎨 UI / UX

Modern, clean, and responsive UI

Built with Next.js (React) and Tailwind CSS

Card-based layout with status badges

Light, professional color palette

Dark mode toggle (UI enhancement)

🛠 Tech Stack
Frontend

Next.js (React)

Tailwind CSS

Axios

Backend

Node.js

Express.js

MongoDB Atlas

JWT

bcrypt

## 📂 Project Structure

├── backend
│ ├── middleware
│ ├── models
│ ├── routes
│ ├── server.js
│ ├── package.json
│ └── .env.example
│
├── frontend
│ ├── pages
│ ├── styles
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ └── package.json
│
├── postman_collection.json
├── README.md
└── VERIFICATION.md

🔑 Environment Variables

Create a .env file inside the backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

⚠️ Do not commit .env to GitHub.

▶️ Running the Project Locally
1️⃣ Backend
cd backend
npm install
npm run dev

2️⃣ Frontend
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:3000

📡 API Endpoints
Auth

POST /api/v1/auth/register

POST /api/v1/auth/login

Profile

GET /api/v1/profile

PUT /api/v1/profile

Notes

GET /api/v1/notes

POST /api/v1/notes

PUT /api/v1/notes/:id

DELETE /api/v1/notes/:id

🧪 API Testing

A Postman collection (postman_collection.json) is included to test all backend APIs.

📈 Scalability Notes

For production deployment:

Backend can be deployed behind a load balancer

JWT secrets should be stored in a secrets manager

MongoDB indexes can be added for optimized queries

Frontend can be served via a CDN

Rate limiting and caching can be added for better performance
<img width="1919" height="941" alt="image" src="https://github.com/user-attachments/assets/52267269-7cef-4ffb-b2d9-3e2cdc629f36" />


<img width="1919" height="941" alt="image" src="https://github.com/user-attachments/assets/6f336535-8615-4b9f-943a-90ed79505ca8" />


👩‍💻 Author

Priya Kumari
Frontend Developer Intern Candidate
