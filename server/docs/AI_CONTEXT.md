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
- upload profile images and banners
- communicate through a global chat
- search for users
- send and manage friend requests
- maintain a friend list
- exchange private messages with accepted friends

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
- Multer
- cookie-parser
- cors
- dotenv
- axios

### External API

- IGDB (Internet Game Database)
- Twitch OAuth for IGDB authentication

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
├── .gitignore
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
    ├── uploads/
    ├── docs/
    ├── index.js
    └── package.json
```

Current technical documentation is stored under:

```text
server/docs/
```

including:

```text
API.md
DATABASE.md
DEVELOPMENT.md
AI_CONTEXT.md
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

Upload middleware:

```text
server/middleware/upload.middleware.js
```

Controllers:

```text
server/controllers/auth.controller.js
server/controllers/chat.controller.js
server/controllers/games.controller.js
server/controllers/library.controllers.js
server/controllers/users.controller.js
server/controllers/friends.controller.js
server/controllers/privateChat.controller.js
```

Routes:

```text
server/routes/auth.routes.js
server/routes/chat.routes.js
server/routes/games.routes.js
server/routes/library.routes.js
server/routes/users.routes.js
server/routes/friends.routes.js
server/routes/privateChat.routes.js
```

Models:

```text
server/models/User.js
server/models/UserGame.js
server/models/ChatMessage.js
server/models/Friendship.js
server/models/PrivateMessage.js
server/models/index.js
```

Services:

```text
server/services/igdb.service.js
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

IGDB_CLIENT_ID=your_twitch_client_id
IGDB_CLIENT_SECRET=your_twitch_client_secret
IGDB_BASE_URL=https://api.igdb.com/v4
TWITCH_TOKEN_URL=https://id.twitch.tv/oauth2/token
```

Rules:

- never commit `.env`
- never commit database passwords
- never commit `JWT_SECRET`
- never commit `IGDB_CLIENT_SECRET`
- never expose Twitch credentials
- keep external API credentials on the backend
- documentation must use placeholders only

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
PostgreSQL / IGDB
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
/api/library
/api/chat
/api/friends
/api/private-chat
```

Additional health route:

```text
/api/health
```

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

Current routes include:

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

## 12. Navigation and Game Filtering

Games menu:

```text
All Games
Best Ranking
```

Categories include:

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

Current category filtering is performed client-side using IGDB genre names.

Important IGDB mappings:

```text
RPG -> Role-playing (RPG)
Action -> Shooter, Adventure, Hack and slash/Beat 'em up, Fighting
```

Current platform filtering is also client-side.

Important IGDB platform mapping:

```text
PC -> PC (Microsoft Windows)
PlayStation -> platform name contains "PlayStation"
Xbox -> platform name contains "Xbox"
```

`Multiplayer` is not an IGDB genre and requires separate handling if kept as a category.

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

`GET /api/auth/me` loads the current user from PostgreSQL.

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

Backend profile persistence uses PostgreSQL through the `User` model.

---

## 17. Profile Image and Banner Uploads

Implemented endpoints:

```text
POST /api/users/me/profile-image
POST /api/users/me/banner
```

Authentication required.

Request type:

```text
multipart/form-data
```

File field:

```text
image
```

Supported formats:

```text
JPG
PNG
WEBP
```

Maximum file size:

```text
5 MB
```

Files are stored under:

```text
server/uploads/profile/
```

The database stores only the relative path.

Uploaded user files must not be committed to Git.

---

## 18. User Search

Implemented endpoint:

```text
GET /api/users/search?username=...
```

Authentication required.

Returns safe public user fields:

```text
id
username
profileImage
```

---

## 19. IGDB Integration

RAWG has been replaced by IGDB.

Current flow:

```text
React frontend
    ↓
gameService.ts
    ↓
/api/games
    ↓
games.controller.js
    ↓
igdb.service.js
    ↓
Twitch OAuth
    ↓
IGDB API
```

IGDB uses Twitch OAuth Client Credentials Flow.

The backend obtains and caches an App Access Token.

IGDB base URL:

```text
https://api.igdb.com/v4
```

---

## 20. Game API

Implemented endpoints:

```text
GET /api/games
GET /api/games/:id
```

Supported list parameters:

```text
page
page_size
search
```

Normalized list fields:

```text
id
title
image
rating
released
genres
platforms
```

Normalized detail fields:

```text
id
title
description
image
rating
released
website
genres
platforms
```

IGDB rating is converted from `0-100` to `0-5`.

IGDB cover URLs are normalized to larger cover images.

Default game lists filter out low-quality/no-rating results and prefer games with enough ratings.

---

## 21. Games Frontend Behavior

Current behavior:

```text
AllGamesPage       loads several pages from backend
BestGamesPage      filters games with rating >= 4
CategoryPage       filters genres client-side
PlatformPage       filters supported platforms client-side
GameCarousel       loads multiple pages
```

Search:

```text
GET /api/games?search=...
```

Game details:

```text
GET /api/games/:id
```

Important:

```text
IGDB IDs are not compatible with old RAWG IDs.
```

---

## 22. UserGame Model

Current fields:

```text
id
rawgGameId
title
image
rawgRating
released
status
personalRating
note
createdAt
updatedAt
```

Status values:

```text
wishlist
want_to_play
playing
completed
dropped
```

Relationship:

```text
User hasMany UserGame
UserGame belongsTo User
```

Foreign key:

```text
userId
```

Delete behavior:

```text
CASCADE
```

Important:

```text
rawgGameId
rawgRating
```

are legacy field names from the previous RAWG integration.

They currently store the IGDB game ID and normalized IGDB rating.

Do not rename these fields without a deliberate database migration.

---

## 23. Game Library Backend

The backend game-library API is implemented and registered.

Endpoints:

```text
GET    /api/library
POST   /api/library
PUT    /api/library/:id
DELETE /api/library/:id
```

All endpoints require authentication.

The current user is determined through:

```text
req.user.id
```

### GET `/api/library`

Returns all `UserGame` records belonging to the authenticated user.

### POST `/api/library`

Adds a game to the authenticated user's library.

Frontend request format:

```json
{
  "gameId": 1942,
  "title": "The Witcher 3: Wild Hunt",
  "image": "https://images.igdb.com/...",
  "rating": 4.7,
  "released": "2015-05-19",
  "status": "playing"
}
```

Backend mapping:

```text
gameId -> rawgGameId
rating -> rawgRating
```

This keeps legacy database field names hidden from the frontend API.

Duplicate games for the same user are rejected.

### PUT `/api/library/:id`

Supported update fields:

```text
status
personalRating
note
```

`personalRating` accepts values from:

```text
1-5
```

The `:id` parameter is the `UserGame` database record ID, not the external IGDB game ID.

### DELETE `/api/library/:id`

Deletes a library record belonging to the authenticated user.

Users cannot read, modify, or delete library records belonging to another user.

---

## 24. Game Library Integration Status

Current state:

```text
UserGame Sequelize model             Implemented
User/UserGame association            Implemented
Library backend controller           Implemented
Library backend routes               Implemented
/api/library registration            Implemented
Backend PostgreSQL persistence       Implemented
Library frontend UI                  Implemented
Frontend library persistence         localStorage
Frontend/backend library integration Not implemented
```

Current frontend flow:

```text
Game UI
    ↓
React/local state
    ↓
localStorage
```

Available backend flow:

```text
/api/library
    ↓
library.controllers.js
    ↓
UserGame
    ↓
PostgreSQL
```

The remaining task is to replace the frontend `localStorage` library persistence with calls to `/api/library`.

Do not describe the frontend library as PostgreSQL-backed until that integration is completed.

---

## 25. Global Chat

Current flow:

```text
Chat.tsx
    ↓
chatService.ts
    ↓
/api/chat/messages
    ↓
chat.controller.js
    ↓
ChatMessage
    ↓
PostgreSQL
```

Implemented endpoints:

```text
GET /api/chat/messages
POST /api/chat/messages
```

Frontend currently polls every two seconds.

WebSockets are not implemented.

---

## 26. ChatMessage Model

Current fields:

```text
id
username
message
createdAt
updatedAt
```

`ChatMessage` currently has no Sequelize foreign-key relationship to `User`.

---

## 27. Friendship Model

File:

```text
server/models/Friendship.js
```

Current fields:

```text
id
requesterId
addresseeId
status
createdAt
updatedAt
```

Status:

```text
pending
accepted
```

A single model represents friend requests and accepted friendships.

Friendship records are also used to authorize private chat.

---

## 28. Friends API

Implemented endpoints:

```text
POST   /api/friends/requests
GET    /api/friends/requests
PUT    /api/friends/requests/:id/accept
DELETE /api/friends/requests/:id
GET    /api/friends
DELETE /api/friends/:userId
```

All endpoints require authentication.

Backend prevents:

```text
self requests
duplicate pending requests
duplicate friendships
```

Returned public user fields:

```text
id
username
profileImage
```

---

## 29. PrivateMessage Model

Current fields:

```text
id
senderId
receiverId
message
createdAt
updatedAt
```

Relationships:

```text
User hasMany PrivateMessage as SentPrivateMessages
PrivateMessage belongsTo User as Sender

User hasMany PrivateMessage as ReceivedPrivateMessages
PrivateMessage belongsTo User as Receiver
```

---

## 30. Private Chat API

Implemented endpoints:

```text
GET  /api/private-chat/:userId
POST /api/private-chat/:userId
```

Authentication required.

Private chat requires an accepted friendship.

Messages from both directions are returned ordered by:

```text
createdAt ASC
```

The backend prevents:

```text
messages to yourself
messages to non-friends
empty messages
```

---

## 31. Current Sources of Truth

Authentication/users:

```text
PostgreSQL + JWT cookie
```

Global chat:

```text
PostgreSQL
```

Friends:

```text
PostgreSQL
```

Private messages:

```text
PostgreSQL
```

Profile fields:

```text
PostgreSQL
```

Profile image/banner paths:

```text
PostgreSQL
```

Actual uploaded profile files:

```text
server/uploads/profile/
```

Game catalogue:

```text
IGDB through backend
```

Game-library backend:

```text
PostgreSQL through UserGame
```

Game-library frontend:

```text
localStorage until frontend integration is completed
```

---

## 32. Feature Status Matrix

| Area | Status | Current source/integration |
|---|---|---|
| Registration/login/logout | Implemented | PostgreSQL + JWT cookie |
| Current user `/me` | Implemented | PostgreSQL |
| Profile backend | Implemented | PostgreSQL |
| Profile image upload | Implemented | Server storage + PostgreSQL path |
| Banner upload | Implemented | Server storage + PostgreSQL path |
| User search | Implemented | PostgreSQL |
| IGDB game listing | Implemented | IGDB through backend |
| IGDB search | Implemented | IGDB through backend |
| IGDB game details | Implemented | IGDB through backend |
| Category filtering | Implemented frontend | Client-side |
| Platform filtering | Implemented frontend | Client-side |
| Best games | Implemented frontend | Normalized IGDB ratings |
| Library backend API | Implemented | PostgreSQL through UserGame |
| Game library UI | Implemented frontend | localStorage |
| Library frontend/backend integration | Not implemented | — |
| Global chat | Implemented | PostgreSQL |
| Emoji support | Implemented | Frontend |
| Friend requests | Implemented | PostgreSQL |
| Friend list | Implemented | PostgreSQL |
| Remove friend | Implemented | PostgreSQL |
| Private messaging | Implemented backend | PostgreSQL |
| WebSockets | Not implemented | — |
| Voice chat | Not implemented | — |
| Production image storage | Not implemented | Local server only |
| Deployment | Not finalized | — |

---

## 33. Database Notes

Database:

```text
PostgreSQL
```

ORM:

```text
Sequelize
```

Current models:

```text
User
UserGame
ChatMessage
Friendship
PrivateMessage
```

Current sync:

```js
await sequelize.sync();
```

A formal Sequelize migration system has not yet been introduced.

---

## 34. Git Workflow

Expected flow:

```text
feature/* -> dev -> main
```

Start a feature:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/example
```

Before committing:

```bash
git status
```

Never commit:

```text
.env
database passwords
JWT secrets
IGDB/Twitch credentials
uploaded user files
```

---

## 35. Team Responsibilities

### Backend focus

```text
Node.js
Express
PostgreSQL
Sequelize
JWT/cookies
authentication
REST API
IGDB integration
Twitch OAuth
profile backend
file uploads
friends backend
private chat backend
global chat backend
library backend
Postman/API testing
```

### Frontend focus

```text
React
TypeScript
React Router
UI components
pages
game UI
profile UI
friends UI
private chat UI
global chat UI
library UI
frontend services
CSS
responsive design
```

Integration tasks can overlap.

---

## 36. Current Development Priorities

Likely next technical work:

1. connect frontend friend system to backend endpoints
2. connect frontend private chat to backend endpoints
3. connect frontend game library to `/api/library`
4. remove game-library `localStorage` as the source of truth
5. rename legacy `rawgGameId` and `rawgRating` through a database migration
6. improve multiplayer filtering for IGDB
7. consider message pagination
8. consider WebSockets for real-time private/global chat
9. introduce Sequelize migrations
10. prepare deployment
11. move uploaded images to production-ready storage
12. keep documentation synchronized with verified code

These are development directions, not completed features.

---

## 37. Files to Inspect by Task

### Backend startup / database

```text
server/index.js
server/config/database.js
server/models/index.js
```

### Authentication

```text
server/controllers/auth.controller.js
server/routes/auth.routes.js
server/middleware/auth.middleware.js
server/models/User.js
client/src/components/AuthModal.tsx
client/src/services/authService.ts
```

### Profile

```text
server/controllers/users.controller.js
server/routes/users.routes.js
server/models/User.js
server/middleware/upload.middleware.js
client/src/pages/ProfilePage.tsx
```

### Games / IGDB

```text
server/controllers/games.controller.js
server/routes/games.routes.js
server/services/igdb.service.js
client/src/services/gameService.ts
client/src/pages/CategoryPage.tsx
client/src/pages/PlatformPage.tsx
client/src/pages/BestGamesPage.tsx
```

### Library

```text
server/models/UserGame.js
server/controllers/library.controllers.js
server/routes/library.routes.js
server/index.js
client/src/components/GameModal.tsx
client/src/components/GameListModal.tsx
client/src/App.tsx
```

### Global Chat

```text
server/controllers/chat.controller.js
server/routes/chat.routes.js
server/models/ChatMessage.js
client/src/components/Chat.tsx
client/src/services/chatService.ts
```

### Friends

```text
server/controllers/friends.controller.js
server/routes/friends.routes.js
server/models/Friendship.js
server/models/index.js
```

### Private Chat

```text
server/controllers/privateChat.controller.js
server/routes/privateChat.routes.js
server/models/PrivateMessage.js
server/models/Friendship.js
server/models/index.js
```

---

## 38. Rules for Future AI Work

When this file is supplied in a future AI session:

1. Read this file first to recover project context.
2. Treat current source code as the final source of truth.
3. Inspect relevant files before making implementation changes.
4. Preserve the existing architecture unless redesign is explicitly requested.
5. Distinguish implemented, partially implemented, and planned features.
6. Distinguish PostgreSQL persistence from browser `localStorage` persistence.
7. `/api/library` exists and is implemented; only frontend integration remains.
8. Do not expose or request real secrets unnecessarily.
9. Keep IGDB/Twitch credentials server-side.
10. Preserve cookie-based authentication unless auth redesign is intentional.
11. Private chat must continue to require accepted friendships.
12. Do not rename legacy `rawgGameId`/`rawgRating` fields casually.
13. Follow `feature/* -> dev -> main` unless workflow changes.
14. Update this context after major architecture or implementation changes.

---

## 39. Documentation Map

```text
README.md
```

Short project overview and quick start.

```text
server/docs/API.md
```

Implemented REST endpoints and API behavior.

```text
server/docs/DATABASE.md
```

PostgreSQL and Sequelize setup, models, relationships, and troubleshooting.

```text
server/docs/DEVELOPMENT.md
```

Local development setup, workflow, Git, and troubleshooting.

```text
server/docs/AI_CONTEXT.md
```

Detailed technical project snapshot for future AI-assisted development.

If documentation and source code disagree, current source code wins.