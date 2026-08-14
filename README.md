# Game Helper

Game Helper is a full-stack web application for gamers, developed as a team project during the DCI Web Development course.

The project combines game discovery through the IGDB API with authentication, user profiles, a personal game-library interface, and persistent chat functionality.

## Main Features

- User registration and login
- JWT authentication with HTTP-only cookies
- User profile and profile customization
- IGDB game discovery and search
- Category and platform browsing
- Best-rated games page
- Personal game-library UI
- Persistent global chat
- Friend system
- Private messaging between accepted friends
- Profile image and banner uploads
- Emoji support in chat
- About, Contact, Privacy, Terms, and Imprint pages

> Some features are still partially integrated. The game library currently uses `localStorage`, and some frontend/backend integrations are still being completed.

## Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- CSS
- Fetch API
- emoji-picker-react
- FontAwesome
- react-icons

### Backend

- Node.js
- Express.js
- PostgreSQL
- Sequelize
- JWT (`jsonwebtoken`)
- bcrypt
- Multer
- cookie-parser
- cors
- dotenv
- axios

### External API

- IGDB (Internet Game Database)
- Twitch OAuth for IGDB authentication

## Project Structure

```text
game-helper/
├── client/                  # React frontend
├── server/                  # Express backend
├── docs/                    # Technical project documentation
├── README.md
└── .gitignore
```

Detailed documentation is stored in the project documentation files.

## Installation

Clone the repository:

```bash
git clone https://github.com/Krimpton/game-helper.git
cd game-helper
```

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

## Environment Variables

Create:

```text
server/.env
```

Example:

```env
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
```

Never commit real `.env` files or secrets.

The backend automatically obtains a Twitch App Access Token and uses it to authenticate requests to IGDB.

## Start the Project

Backend:

```bash
cd server
npm run dev
```

Frontend in a second terminal:

```bash
cd client
npm run dev
```

Default URLs:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:3000
```

Health check:

```text
GET /api/health
```

## Main API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### User Profile

```text
PUT  /api/users/me
POST /api/users/me/profile-image
POST /api/users/me/banner
GET  /api/users/search?username=...
```

### Games

```text
GET /api/games
GET /api/games?search=...
GET /api/games/:id
```

### Global Chat

```text
GET  /api/chat/messages
POST /api/chat/messages
```

### Friends

```text
POST   /api/friends/requests
GET    /api/friends/requests
PUT    /api/friends/requests/:id/accept
DELETE /api/friends/requests/:id
GET    /api/friends
DELETE /api/friends/:userId
```

### Private Chat

```text
GET  /api/private-chat/:userId
POST /api/private-chat/:userId
```

### Health

```text
GET /api/health
```

See the API documentation for detailed request and response formats.

## Game Data

Game data is retrieved from IGDB through the backend.

The frontend does not communicate with IGDB directly.

Current flow:

```text
React frontend
    ↓
Express backend
    ↓
Twitch OAuth
    ↓
IGDB API
```

IGDB responses are normalized by the backend into the data format used by the frontend.

Example game data:

```json
{
  "id": 1942,
  "title": "The Witcher 3: Wild Hunt",
  "image": "https://images.igdb.com/...",
  "rating": 4.7,
  "released": "2015-05-19",
  "genres": [
    "Role-playing (RPG)",
    "Adventure"
  ],
  "platforms": [
    "PC (Microsoft Windows)",
    "PlayStation 5",
    "Xbox Series X|S"
  ]
}
```

IGDB ratings are normalized from a `0–100` scale to the `0–5` scale used by Game Helper.

## Database

Current Sequelize models include:

- `User`
- `UserGame`
- `ChatMessage`
- `Friendship`
- `PrivateMessage`

The friend system and private messages are stored in PostgreSQL.

The `UserGame` model already exists, but the game-library frontend still currently persists its state in `localStorage`.

See the database documentation for model and relationship details.

## Git Workflow

```text
feature/* -> dev -> main
```

Always run:

```bash
git status
```

before committing.

Never commit:

```text
server/.env
database passwords
JWT secrets
Twitch / IGDB credentials
uploaded user images
```

## Documentation

Project documentation includes:

- API documentation — REST API endpoints and behavior
- Database documentation — PostgreSQL and Sequelize models
- Development documentation — local setup, workflow and troubleshooting
- AI context documentation — detailed technical project state for AI-assisted development