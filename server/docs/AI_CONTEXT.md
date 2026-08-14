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
/api/chat
/api/friends
/api/private-chat
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
Action -> several genres, e.g. Shooter, Adventure, Hack and slash/Beat 'em up, Fighting
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

Example:

```text
/uploads/profile/example.png
```

Files are exposed through:

```text
http://localhost:3000/uploads/...
```

Uploaded user files must not be committed to Git.

---

## 18. User Search

Implemented endpoint:

```text
GET /api/users/search?username=...
```

Authentication required.

Returns safe public user fields only:

```text
id
username
profileImage
```

Search is case-insensitive and currently limited to a small result set.

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

The backend uses:

```text
IGDB_CLIENT_ID
IGDB_CLIENT_SECRET
TWITCH_TOKEN_URL
```

to obtain an App Access Token.

The token is cached in memory and refreshed when expired.

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

IGDB rating is converted from:

```text
0-100
```

to:

```text
0-5
```

using roughly:

```text
rating / 20
```

Example:

```text
94 -> 4.7
```

IGDB cover URLs are normalized to larger cover images.

Default game lists filter out low-quality/no-rating results and prefer games with enough ratings.

---

## 21. Games Frontend Behavior

Observed current behavior:

```text
AllGamesPage       loads several pages from backend
BestGamesPage      filters games with rating >= 4
CategoryPage       filters genres client-side
PlatformPage       filters supported platforms client-side
GameCarousel       loads multiple pages
```

Best Games currently works with normalized IGDB ratings.

Search works through:

```text
GET /api/games?search=...
```

Game detail works through:

```text
GET /api/games/:id
```

Important:

IGDB IDs are not compatible with old RAWG IDs.

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

are now legacy field names from the previous RAWG integration.

They have not yet been renamed to IGDB/provider-neutral names.

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

Do not rename these fields without considering database migration and existing data.

---

## 23. Game Library Status

Current state:

```text
UserGame Sequelize model             Implemented
User/UserGame association            Implemented
Library frontend UI                  Implemented
Frontend library statuses            Implemented
Frontend library persistence         localStorage
Library backend controller           Incomplete
Library backend routes               Incomplete
Frontend/backend library integration Not implemented
```

Current flow:

```text
Game UI
    ↓
React/local state
    ↓
localStorage
```

Intended future flow:

```text
Game UI
    ↓
Library API
    ↓
UserGame model
    ↓
PostgreSQL
```

Do not describe the current game library as PostgreSQL-backed until this integration is implemented.

---

## 24. Global Chat

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
ChatMessage model
    ↓
PostgreSQL
```

Implemented endpoints:

```text
GET /api/chat/messages
POST /api/chat/messages
```

GET behavior:

```text
maximum 50 messages
ordered by createdAt ASC
```

Frontend behavior:

```text
global chat
PostgreSQL persistence
polling every 2 seconds
emoji picker
Enter sends message
```

WebSockets are not implemented.

---

## 25. ChatMessage Model

Current fields:

```text
id
username
message
createdAt
updatedAt
```

Important limitation:

`ChatMessage` stores the username as a normal string and currently has no Sequelize foreign-key relationship to `User`.

---

## 26. Friendship Model

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

Status values:

```text
pending
accepted
```

A single model represents both:

```text
friend requests
accepted friendships
```

Relationships:

```text
User hasMany Friendship as SentFriendRequests
Friendship belongsTo User as Requester

User hasMany Friendship as ReceivedFriendRequests
Friendship belongsTo User as Addressee
```

Friendship records are also used to authorize private chat.

---

## 27. Friends API

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

Implemented behavior:

```text
send friend request
get incoming pending requests
accept request
decline request
get accepted friends
remove friend
```

Backend prevents:

```text
self requests
duplicate pending requests
duplicate friendships
```

Safe returned user fields:

```text
id
username
profileImage
```

---

## 28. PrivateMessage Model

File:

```text
server/models/PrivateMessage.js
```

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

## 29. Private Chat API

Implemented endpoints:

```text
GET  /api/private-chat/:userId
POST /api/private-chat/:userId
```

Authentication required.

Private chat is only allowed when an accepted friendship exists.

Backend checks friendship in both directions:

```text
A -> B
B -> A
```

GET returns both directions of conversation:

```text
A -> B
B -> A
```

ordered by:

```text
createdAt ASC
```

Private messages cannot be:

```text
sent to yourself
sent to non-friends
empty
```

Non-friends receive:

```text
403
```

---

## 30. Current Sources of Truth

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

Profile text fields:

```text
PostgreSQL
```

Profile image/banner paths:

```text
PostgreSQL
```

Actual profile image/banner files:

```text
server/uploads/profile/
```

Game catalogue:

```text
IGDB through backend
```

Game library:

```text
frontend localStorage
```

---

## 31. Feature Status Matrix

| Area | Status | Current source/integration |
|---|---|---|
| Registration/login/logout | Implemented | PostgreSQL + JWT cookie |
| Current user `/me` | Implemented | PostgreSQL |
| Profile backend | Implemented | PostgreSQL |
| Profile image upload | Implemented | Local server storage + PostgreSQL path |
| Banner upload | Implemented | Local server storage + PostgreSQL path |
| User search | Implemented | PostgreSQL |
| IGDB game listing | Implemented | IGDB through backend |
| IGDB search | Implemented | IGDB through backend |
| IGDB game details | Implemented | IGDB through backend |
| Category filtering | Implemented frontend | Client-side |
| Platform filtering | Implemented frontend | Client-side |
| Best games | Implemented frontend | Normalized IGDB ratings |
| Global chat | Implemented | PostgreSQL |
| Emoji support | Implemented | Frontend |
| Friend requests | Implemented | PostgreSQL |
| Friend list | Implemented | PostgreSQL |
| Remove friend | Implemented | PostgreSQL |
| Private messaging | Implemented backend | PostgreSQL |
| Game library UI | Implemented frontend | localStorage |
| UserGame model | Implemented | Sequelize model exists |
| Library backend API | Incomplete | controller/routes unfinished |
| WebSockets | Not implemented | — |
| Voice chat | Not implemented | — |
| Production image storage | Not implemented | local server only |
| Deployment | Not finalized | — |

---

## 32. Database Notes

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

Current normal sync logic:

```js
await sequelize.sync();
```

Do not leave:

```js
sequelize.sync({ alter: true })
```

enabled permanently unless a schema change is intentional.

A formal Sequelize migration system has not yet been introduced.

---

## 33. Git Workflow

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

Prefer explicit staging instead of blindly using:

```bash
git add .
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

## 34. Team Responsibilities

General responsibility split:

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
frontend services
CSS
responsive design
```

Integration tasks can overlap.

---

## 35. Current Development Priorities

Likely next technical work:

1. connect frontend friend system to backend endpoints
2. connect frontend private chat to backend endpoints
3. complete library controller/routes around `UserGame`
4. replace library `localStorage` persistence with PostgreSQL
5. rename legacy `rawgGameId` and `rawgRating`
6. improve multiplayer filtering for IGDB
7. consider message pagination
8. consider WebSockets for real-time private/global chat
9. introduce Sequelize migrations
10. prepare deployment
11. move uploaded images to production-ready storage
12. keep documentation synchronized with verified code

These are development directions, not completed features.

---

## 36. Files to Inspect by Task

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

### Library

```text
server/models/UserGame.js
server/controllers/library.controllers.js
server/routes/library.routes.js
client/src/components/GameModal.tsx
client/src/components/GameListModal.tsx
client/src/App.tsx
```

---

## 37. Rules for Future AI Work

When this file is supplied in a future AI session:

1. Read this file first to recover project context.
2. Treat current source code as the final source of truth.
3. Inspect relevant files before making implementation changes.
4. Preserve the existing architecture unless redesign is explicitly requested.
5. Distinguish implemented, partially implemented, and planned features.
6. Distinguish PostgreSQL persistence from browser `localStorage` persistence.
7. Do not assume a route exists merely because a route file exists.
8. Do not expose or request real secrets unnecessarily.
9. Keep IGDB/Twitch credentials server-side.
10. Preserve cookie-based authentication unless auth redesign is intentional.
11. Private chat must continue to require accepted friendships.
12. Do not rename legacy `rawgGameId`/`rawgRating` fields casually.
13. Follow `feature/* -> dev -> main` unless workflow changes are explicitly requested.
14. Update this context after major architecture or implementation changes.

---

## 38. Documentation Map

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