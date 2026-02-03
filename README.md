Scalable Web App (Frontend + Backend)

A full-stack web application built for the Frontend Developer Intern Assignment. It includes secure authentication, a protected dashboard, and CRUD operations with a modern, responsive UI.

✨ Features

- 🔐 Authentication: Register/Login, JWT sessions, protected routes, secure logout
- 📊 Dashboard: profile info, create/edit/delete notes, status toggle, search, filter, sort
- 🔒 Security: bcrypt hashing, JWT middleware, validation, rate limiting, error handling
- 🎨 UI/UX: modern UI, responsive layout, dark mode, polished animations

🛠 Tech Stack
Frontend

- Next.js (React)
- Tailwind CSS

Backend

- Node.js + Express
- MongoDB (Atlas or local; in-memory fallback in dev)
- Mongoose
- JWT, bcrypt
- Helmet, rate limiting

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
Create a .env file inside backend/:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Database setup options:

- MongoDB Atlas: Create a free cluster and use the connection string in MONGODB_URI.
- Local MongoDB: Use mongodb://127.0.0.1:27017/scalable-webapp
- Dev fallback: If MONGODB_URI is missing, the app starts an in-memory MongoDB.

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

- POST /api/v1/auth/register
- POST /api/v1/auth/login

Profile

- GET /api/v1/profile
- PUT /api/v1/profile

Notes

- GET /api/v1/notes
- POST /api/v1/notes
- PUT /api/v1/notes/:id
- DELETE /api/v1/notes/:id

🧪 API Testing
A Postman collection (postman_collection.json) is included to test all backend APIs.

👤 Demo credentials / seed steps (optional)

- No pre-seeded users. Use the Register screen to create a user.
- After login, add a few notes to populate the dashboard (title + content + status).

📈 How would you scale this for production? (5–10 lines)

1. Deploy backend behind a load balancer with horizontal scaling and health checks.
2. Use a managed database (MongoDB Atlas) and add indexes on owner, status, and createdAt.
3. Store JWT secrets and DB credentials in a secrets manager (not in repo).
4. Enable CORS with environment-based allowed origins.
5. Add CDN caching for static assets and Next.js output.
6. Add API caching (Redis) for frequently accessed data.
7. Implement centralized logging/monitoring (ELK, Datadog, or OpenTelemetry).
8. Use CI/CD for automated tests, builds, and deployments.

<img width="1919" height="941" alt="image" src="https://github.com/user-attachments/assets/52267269-7cef-4ffb-b2d9-3e2cdc629f36" />

<img width="1919" height="941" alt="image" src="https://github.com/user-attachments/assets/6f336535-8615-4b9f-943a-90ed79505ca8" />

👩‍💻 Author
Priya Kumari
Frontend Developer Intern Candidate
