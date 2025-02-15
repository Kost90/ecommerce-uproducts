UProducts E-Commerce

UProducts is an e-commerce platform with an admin panel, built using Next.js for the frontend and Node.js/Express for the backend. The server uses Prisma to interact with PostgreSQL, and Redis with express-session for session storage.

🚀 Features

Authentication and authorization (admin support)

Product management (add/remove products via the admin panel)

Product catalog for users

Session storage with Redis

Server running in a Docker container

🛠️ Tech Stack

Frontend:

Next.js

React

Tailwind CSS (or another UI framework if used)

Backend:

Node.js

Express.js

Prisma (ORM for PostgreSQL)

PostgreSQL

express-session + Redis (for session storage)

Docker (for the server)

📦 Installation and Setup

1. Clone the Repository

git clone

2. Start the Server

Open the first terminal and run:

cd server
npm install  # Install dependencies
npm run dev  # Start the server in development mode

3. Start the Frontend

Open the second terminal and run:

cd uproducts
npm install  # Install dependencies
npm run dev  # Start Next.js

The application will now be available at http://localhost:3000

⚙️ Environment Configuration

Before starting, make sure you have a .env file in the server/ and uproducts/ directories.
Example .env file for the server:

DATABASE_URL=postgresql://user:password@localhost:5432/uproducts
SESSION_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379
AWS_BUCKET_NAME=your-bucket-name
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-access-key

🐳 Docker

The server is containerized with Docker. To start it, use:

cd server
docker-compose up --build

👤 Admin Panel

The application supports admin login for managing products. Admins can:

Add products

Remove products

📄 License

This project is licensed under the MIT License.