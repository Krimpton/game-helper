# Game Helper - AI Context

This file is the technical context for future AI-assisted development of the Game Helper project.

Its purpose is to preserve the current architecture, implementation state, important files, persistence rules, limitations, and development workflow between sessions.

The current source code is always the final source of truth. If this file and the implementation disagree, inspect the code and update this document.

---

## 1. Project Identity

Repository:

```text
Krimpton/game-helper
```

Project:

```text
Game Helper
```

Type:

```text
Full-stack web application for gamers
```

Context:

```text
Team project created during the DCI Web Development course
```

Main Git workflow:

```text
feature/* -> dev -> main
```

Documentation branches can use:

```text
docs/* -> dev -> main
```

---

## 2. Project Goal

Game Helper is intended to provide users with one place to:

- discover games
- search games
- browse games by category
- browse games by platform
- view highly rated games
- maintain a personal game library
- customize a user profile
- communicate through a global chat

Some features are fully implemented, some are only partially integrated, and some are still planned.

Do not assume a feature is complete only because a model, controller, route file, or frontend component exists.

---

## 3. Technology Stack

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
- CommonJS modules
- PostgreSQL
- Sequelize
- bcrypt
- jsonwebtoken
- cookie-parser
- cors
- dotenv
- axios

### External API

- RAWG Video Games Database API

### Development Tools

- Git
- GitHub
- Postman
- WebStorm
- VS Code
- PostgreSQL / `psql`

---

## 4. Repository Structure

```text
game-helper/
├── README.md
├── API.md
├── DATABASE.md
├── DEVELOPMENT.md
├── .gitignore
│
├── docs/
│   └── AI_CONTEXT.md
│
├── client/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   └── package.json
│
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── services/
    ├── index.js
    └── package.json
```

---

## 5. Important Frontend Files

Entry files:

```text
client/src/main.tsx
client/src/App.tsx
```

Components:

```text
client/src/components/AuthModal.tsx
client/src/components/Chat.tsx
client/src/components/ChatButton.tsx
client/src/components/Footer.tsx
client/src/components/GameCarousel.tsx
client/src/components/GameListModal.tsx
client/src/components/GameModal.tsx
client/src/components/Header.tsx
client/src/components/Hero.tsx
```

Pages:

```text
client/src/pages/AboutPage.tsx
client/src/pages/AllGamesPage.tsx
client/src/pages/BestGamesPage.tsx
client/src/pages/CategoryPage.tsx
client/src/pages/ChatPage.tsx
client/src/pages/ContactPage.tsx
client/src/pages/ImprintPage.tsx
client/src/pages/PlatformPage.tsx
client/src/pages/PrivacyPage.tsx
client/src/pages/ProfilePage.tsx
client/src/pages/TermsPage.tsx
```

Services:

```text
client/src/services/authService.ts
client/src/services/chatService.ts
client/src/services/gameService.ts
```

Types:

```text
client/src/types/Game.ts
```

---

## 6. Important Backend Files

Entry point:

```text
server/index.js
```

Database configuration:

```text
server/config/database.js
```

Authentication middleware:

```text
server/middleware/auth.middleware.js
```

Controllers:

```text
server/controllers/auth.controller.js
server/controllers/chat.controller.js
server/controllers/games.controller.js
server/controllers/library.controllers.js
server/controllers/users.controller.js
```

Routes:

```text
server/routes/auth.routes.js
server/routes/chat.routes.js
server/routes/games.routes.js
server/routes/library.routes.js
server/routes/users.routes.js
```

Models:

```text
server/models/User.js
server/models/UserGame.js
server/models/ChatMessage.js
server/models/index.js
```

Services:

```text
server/services/rawg.service.js
```

---

## 7. Local Development URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3000
```

Health endpoint:

```text
GET /api/health
```

Expected response:

```json
{
  "status": "ok"
}
```

CORS is configured for the frontend development origin and credentials are enabled.

---

## 8. Environment Variables

Backend environment file:

```text
server/.env
```

Expected variables:

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

Rules:

- never commit `.env`
- never commit database passwords
- never commit `JWT_SECRET`
- never commit `RAWG_API_KEY`
- keep RAWG credentials on the backend
- documentation must use placeholders only

A real `.env` file was accidentally tracked earlier in development. Removing it from the current branch does not remove secrets from Git history, so exposed secrets should be rotated.

---

## 9. Backend Architecture

Current backend request flow:

```text
HTTP Request
    ↓
Express Route
    ↓
Controller
    ↓
Service or Sequelize Model
    ↓
PostgreSQL or RAWG API
```

Responsibilities:

```text
routes/       endpoint definitions
controllers/  request/response logic
services/     external integrations
models/       database entities and relationships
middleware/   reusable request middleware
config/       configuration
```

Current registered backend groups:

```text
/api/auth
/api/users
/api/games
/api/chat
```

Additional health route:

```text
/api/health
```

The library files exist, but `/api/library` is not currently a completed and registered API.

---

## 10. Frontend Architecture

Current frontend flow:

```text
React Router
    ↓
Page
    ↓
Reusable Component
    ↓
Frontend Service
    ↓
Backend REST API
```

Frontend state currently comes from a mixture of:

```text
React local state
backend API data
PostgreSQL-backed data
browser localStorage
```

Always identify the current source of truth before changing a feature.

---

## 11. Frontend Routes

Current routes:

```text
/
/categories/:category
/platforms/:platform
/games
/games/best
/profile
/chat
/imprint
/about
/contact
/privacy
/terms
```

---

## 12. Navigation

Games menu:

```text
All Games
Best Ranking
```

Categories:

```text
Action
RPG
Puzzle
Shooter
Simulator
Racing
Arcade
Multiplayer
```

Platforms:

```text
PC
PlayStation
Xbox
```

Game search uses `searchGames()` through `gameService.ts`.

---

## 13. Authentication

Authentication uses:

```text
JWT + HTTP-only cookie
```

Cookie name:

```text
token
```

Auth middleware reads:

```text
req.cookies.token
```

and verifies it using:

```text
JWT_SECRET
```

After successful verification:

```text
req.user = decoded
```

JWT payload contains:

```text
id
email
username
```

Passwords are hashed using bcrypt with 10 salt rounds.

Authenticated frontend requests need:

```ts
credentials: "include"
```

Do not replace cookie-based authentication with localStorage JWT storage unless auth is intentionally redesigned.

---

## 14. Authentication API

Implemented endpoints:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

Registration validation includes:

```text
username required
username minimum 3 characters
email required
basic email validation
password required
password minimum 6 characters
unique username
unique email
```

JWT expiration uses:

```text
JWT_EXPIRES_IN
```

Fallback:

```text
7d
```

`GET /api/auth/me` loads the current user from PostgreSQL rather than returning only JWT payload data.

Possible auth errors:

```text
401 Not authenticated
401 Invalid or expired token
```

---

## 15. User Model

Current fields:

```text
id
username
email
profileImage
banner
aboutMe
favoriteGame
favoriteGenre
favoritePlatform
discord
steam
github
reddit
passwordHash
createdAt
updatedAt
```

Important rules:

- email is unique
- passwords are stored only as hashes
- `passwordHash` must never be returned publicly
- `profileImage` and `banner` are stored as strings

---

## 16. Profile Backend

Implemented endpoint:

```text
PUT /api/users/me
```

Authentication required.

Allowed update fields:

```text
profileImage
banner
aboutMe
favoriteGame
favoriteGenre
favoritePlatform
discord
steam
github
reddit
```

Other submitted fields are ignored.

Backend profile persistence uses PostgreSQL through the `User` model.

---

## 17. Profile Frontend Status

`ProfilePage.tsx` exposes profile information including:

```text
profileImage
banner
username
aboutMe
favoriteGame
favoriteGenre
favoritePlatform
discord
steam
github
reddit
```

Important limitation:

```text
backend profile API exists
BUT
frontend profile state is