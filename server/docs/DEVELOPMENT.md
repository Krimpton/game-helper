# Game Helper

Game Helper is a full-stack web application for gamers, developed as a team project during the DCI Web Development course.

The project combines game discovery through the IGDB API with authentication, user profiles, a personal game-library interface, friend functionality, global chat, and private messaging.

## Main Features

- User registration and login
- JWT authentication with HTTP-only cookies
- User profile and profile customization
- Profile image and banner uploads
- IGDB game discovery and search
- Category and platform browsing
- Best-rated games page
- Personal game-library UI
- Backend game-library API with PostgreSQL persistence
- Persistent global chat
- Emoji support in chat
- User search
- Friend requests
- Friend list management
- Private messaging between accepted friends
- About, Contact, Privacy, Terms, and Imprint pages

> Some features are still partially integrated. The backend game-library API is implemented, but the frontend library currently still uses `localStorage` and has not yet been connected to the backend library API.

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
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── docs/
│   └── index.js
├── README.md
└── .gitignore
```

Project documentation is stored under:

```text
server/docs/
```

and includes API, database, development, and AI context documentation.

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

Create a local backend environment file:

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

The backend automatically obtains a Twitch App Access Token and uses it for requests to IGDB.

## Start the Project

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in a second terminal:

```bash
cd client
npm run dev
```

Default development URLs:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:3000
```

Backend health check:

```text
GET /api/health
```

Expected response:

```json
{
  "status": "ok"
}
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

### Game Library

```text
GET    /api/library
POST   /api/library
PUT    /api/library/:id
DELETE /api/library/:id
```

All library endpoints require authentication.

The backend supports:

```text
get current user's library
add games to the library
update game status
update personal rating
update notes
remove games from the library
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

See `server/docs/API.md` for detailed request and response formats.

## Game Data

Game data is retrieved from IGDB through the backend.

Current flow:

```text
React Frontend
      ↓
Express Backend
      ↓
Twitch OAuth
      ↓
IGDB API
```

The frontend never communicates with IGDB directly.

The backend normalizes IGDB responses into the format expected by the frontend:

```text
id
title
image
rating
released
genres
platforms
```

Detailed game data also includes:

```text
description
website
```

IGDB ratings are converted from a `0–100` scale to the `0–5` scale used by Game Helper.

## Game Library

The backend game-library API is implemented and registered under:

```text
/api/library
```

Backend flow:

```text
Library API
    ↓
library.controllers.js
    ↓
UserGame model
    ↓
PostgreSQL
```

Supported library statuses:

```text
wishlist
want_to_play
playing
completed
dropped
```

Library records can also contain:

```text
personalRating
note
```

Library data is associated with the authenticated user through `userId`.

The backend prevents users from modifying library records that belong to another user.

### Current Frontend Status

The frontend game-library UI still currently persists its state using:

```text
localStorage
```

The remaining integration step is:

```text
Frontend Library UI
        ↓
/api/library
        ↓
UserGame
        ↓
PostgreSQL
```

After this integration, `localStorage` can be removed as the primary persistence layer for the game library.

## Database

Current Sequelize models:

- `User`
- `UserGame`
- `ChatMessage`
- `Friendship`
- `PrivateMessage`

### Main Relationships

```text
User -> UserGame

User -> Friendship <- User

User -> PrivateMessage <- User
```

Friend requests and accepted friendships are stored using the `Friendship` model.

Private messages are stored using the `PrivateMessage` model and are only available between accepted friends.

Game-library records are stored through the `UserGame` model.

## Legacy UserGame Fields

The `UserGame` model currently still contains:

```text
rawgGameId
rawgRating
```

These names are leftovers from the previous RAWG integration.

The project now uses IGDB.

The library backend currently maps the current game data to these legacy database fields.

These fields should eventually be renamed to provider-neutral or IGDB-specific names through a deliberate database migration.

Possible future names:

```text
externalGameId
externalRating
```

or:

```text
igdbGameId
igdbRating
```

They should not simply be renamed in the Sequelize model without considering existing database data.

## File Uploads

Profile images and banners are handled by the backend using Multer.

Uploaded files are stored under:

```text
server/uploads/profile/
```

The database stores only the resulting URL/path.

Example:

```text
/uploads/profile/example.png
```

Uploaded user files are excluded from Git.

## Current Limitations

- Frontend game-library persistence still uses `localStorage`.
- Frontend/backend game-library integration is not completed yet.
- `UserGame` still contains legacy field names from the previous RAWG integration.
- Global chat uses HTTP polling instead of WebSockets.
- Private chat currently uses REST requests rather than real-time WebSockets.
- Uploaded images are stored locally on the backend server.
- Voice chat is not implemented.
- Deployment is not finalized.
- A formal Sequelize migration system is not yet implemented.

## Git Workflow

The project uses:

```text
feature/* -> dev -> main
```

Documentation work can use:

```text
docs/* -> dev -> main
```

Before committing:

```bash
git status
```

Never commit:

```text
server/.env
database passwords
JWT secrets
IGDB/Twitch credentials
uploaded user files
```

## Documentation

- `server/docs/API.md` — REST API reference
- `server/docs/DATABASE.md` — PostgreSQL and Sequelize documentation
- `server/docs/DEVELOPMENT.md` — local development setup, workflow, and troubleshooting
- `server/docs/AI_CONTEXT.md` — detailed technical project context for AI-assisted development