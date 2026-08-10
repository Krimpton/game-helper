# Game Helper

Game Helper is a full-stack web application for gamers, developed as a team project during the DCI Web Development course.

The project combines game discovery through the RAWG API with authentication, user profiles, a personal game-library interface, and a persistent global chat.

## Main Features

- User registration and login
- JWT authentication with HTTP-only cookies
- User profile and profile customization
- RAWG game discovery and search
- Category and platform browsing
- Best-rated games page
- Personal game-library UI
- Persistent global chat
- Emoji support in chat
- About, Contact, Privacy, Terms, and Imprint pages

> Some features are only partially integrated. The game library currently uses `localStorage`, and the profile frontend is not yet fully synchronized with the backend profile API.

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
- cookie-parser
- cors
- dotenv
- axios

### External API

- RAWG Video Games Database API

## Project Structure

```text
game-helper/
├── client/                  # React frontend
├── server/                  # Express backend
├── docs/                    # Technical project context
├── API.md                   # REST API documentation
├── DATABASE.md              # PostgreSQL / Sequelize documentation
├── DEVELOPMENT.md           # Local development guide
├── README.md
└── .gitignore
```

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

RAWG_BASE_URL=https://api.rawg.io/api
RAWG_API_KEY=your_rawg_api_key
```

Never commit real `.env` files or secrets.

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

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

PUT  /api/users/me

GET  /api/games
GET  /api/games/:id

GET  /api/chat/messages
POST /api/chat/messages

GET  /api/health
```

See `API.md` for detailed endpoint documentation.

## Database

Current Sequelize models:

- `User`
- `UserGame`
- `ChatMessage`

`User` has many `UserGame` records through the `userId` foreign key.

The `UserGame` model already exists, but the backend game-library API is not completed yet. The current frontend library still persists data in `localStorage`.

See `DATABASE.md` for database setup and model details.

## Current Limitations

- Profile frontend/backend synchronization is incomplete.
- Game-library persistence currently uses `localStorage`.
- Library backend routes/controllers are unfinished.
- Global chat uses HTTP polling every two seconds instead of WebSockets.
- Friends and private messaging are not fully implemented.
- Voice chat is not implemented.
- Profile images do not yet use a real server-side upload flow.
- Deployment is not finalized.

## Git Workflow

The project uses:

```text
feature/* -> dev -> main
```

Documentation work can use:

```text
docs/* -> dev -> main
```

Always check:

```bash
git status
```

before committing.

Never commit `.env` files.

## Documentation

- `API.md` — REST API reference
- `DATABASE.md` — PostgreSQL and Sequelize documentation
- `DEVELOPMENT.md` — local development setup, workflow, and troubleshooting
- `docs/AI_CONTEXT.md` — detailed technical project context for AI-assisted development