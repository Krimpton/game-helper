Game Helper

Game Helper is a full-stack web application for gamers, developed as a team project during the DCI Web Development course.

The project combines game discovery through the IGDB API with authentication, user profiles, a personal game-library interface, friend functionality, global chat, and private messaging.

Main Features

* User registration and login
* JWT authentication with HTTP-only cookies
* User profile and profile customization
* Profile image and banner uploads
* IGDB game discovery and search
* Category and platform browsing
* Best-rated games page
* Personal game-library UI
* Persistent global chat
* Emoji support in chat
* User search
* Friend requests
* Friend list management
* Private messaging between accepted friends
* About, Contact, Privacy, Terms, and Imprint pages

Some features are still partially integrated. The game library currently uses localStorage, and the backend library API is not yet completed.

Technology Stack

Frontend

* React 19
* TypeScript
* Vite
* React Router
* CSS
* Fetch API
* emoji-picker-react
* FontAwesome
* react-icons

Backend

* Node.js
* Express.js
* PostgreSQL
* Sequelize
* JWT (jsonwebtoken)
* bcrypt
* Multer
* cookie-parser
* cors
* dotenv
* axios

External API

* IGDB (Internet Game Database)
* Twitch OAuth for IGDB authentication

Project Structure

game-helper/
├── client/                  # React frontend
├── server/                  # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   └── index.js
├── README.md
└── .gitignore

Project documentation is stored in the repository and includes API, database, development, and AI context documentation.

Installation

Clone the repository:

git clone https://github.com/Krimpton/game-helper.git
cd game-helper

Install backend dependencies:

cd server
npm install

Install frontend dependencies:

cd ../client
npm install

Environment Variables

Create a local backend environment file:

server/.env

Example:

PORT=3000
DB_NAME=game_helper
DB_USER=game_helper_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
IGDB_CLIENT_ID=your_twitch_client_id
IGDB_CLIENT_SECRET=your_twitch_client_secret
IGDB_BASE_URL=https://api.igdb.com/v4
TWITCH_TOKEN_URL=https://id.twitch.tv/oauth2/token

Never commit real .env files or secrets.

The backend automatically obtains a Twitch App Access Token and uses it for requests to IGDB.

Start the Project

Start the backend:

cd server
npm run dev

Start the frontend in a second terminal:

cd client
npm run dev

Default development URLs:

Frontend: http://localhost:5173
Backend:  http://localhost:3000

Backend health check:

GET /api/health

Expected response:

{
"status": "ok"
}

Main API Endpoints

Authentication

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

User Profile

PUT  /api/users/me
POST /api/users/me/profile-image
POST /api/users/me/banner
GET  /api/users/search?username=...

Games

GET /api/games
GET /api/games?search=...
GET /api/games/:id

Global Chat

GET  /api/chat/messages
POST /api/chat/messages

Friends

POST   /api/friends/requests
GET    /api/friends/requests
PUT    /api/friends/requests/:id/accept
DELETE /api/friends/requests/:id
GET    /api/friends
DELETE /api/friends/:userId

Private Chat

GET  /api/private-chat/:userId
POST /api/private-chat/:userId

Health

GET /api/health

See the API documentation for detailed request and response formats.

Game Data

Game data is retrieved from IGDB through the backend.

Current flow:

React Frontend
↓
Express Backend
↓
Twitch OAuth
↓
IGDB API

The frontend never communicates with IGDB directly.

The backend normalizes IGDB responses into the format expected by the frontend:

id
title
image
rating
released
genres
platforms

For detailed games:

description
website

IGDB ratings are converted from a 0–100 scale to the 0–5 scale used by Game Helper.

Database

Current Sequelize models:

* User
* UserGame
* ChatMessage
* Friendship
* PrivateMessage

Main Relationships

User -> UserGame
User -> Friendship <- User
User -> PrivateMessage <- User

Friend requests and accepted friendships are stored using the Friendship model.

Private messages are stored using the PrivateMessage model and are only available between accepted friends.

The UserGame model exists, but the frontend game library currently still persists its state in localStorage.

File Uploads

Profile images and banners are handled by the backend using Multer.

Uploaded files are stored under:

server/uploads/profile/

The database stores only the resulting URL/path.

Example:

/uploads/profile/example.png

Uploaded user files are excluded from Git.

Current Limitations

* Game-library persistence still uses localStorage.
* Library backend routes/controllers are unfinished.
* UserGame still contains legacy field names from the previous RAWG integration.
* Global chat uses HTTP polling instead of WebSockets.
* Private chat currently uses REST requests rather than real-time WebSockets.
* Uploaded images are stored locally on the backend server.
* Voice chat is not implemented.
* Deployment is not finalized.
* A formal Sequelize migration system is not yet implemented.

Git Workflow

The project uses:

feature/* -> dev -> main

Documentation work can use:

docs/* -> dev -> main

Before committing:

git status

Never commit:

server/.env
database passwords
JWT secrets
IGDB/Twitch credentials
uploaded user files

Documentation

* API.md — REST API reference
* DATABASE.md — PostgreSQL and Sequelize documentation
* DEVELOPMENT.md — local development setup, workflow, and troubleshooting
* AI_CONTEXT.md — detailed technical project context for AI-assisted development