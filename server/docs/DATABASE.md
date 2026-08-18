# Game Helper Database Documentation

Game Helper uses PostgreSQL as its relational database and Sequelize as its ORM.

Main database files:

```text
server/config/database.js
server/models/index.js
```

Current Sequelize models:

```text
User
UserGame
ChatMessage
Friendship
PrivateMessage
```

---

# Database Configuration

The backend reads database configuration from:

```text
server/.env
```

Required database variables:

```env
DB_NAME=game_helper
DB_USER=game_helper_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
```

Other backend variables include:

```env
PORT=3000

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

IGDB_CLIENT_ID=your_twitch_client_id
IGDB_CLIENT_SECRET=your_twitch_client_secret
IGDB_BASE_URL=https://api.igdb.com/v4
TWITCH_TOKEN_URL=https://id.twitch.tv/oauth2/token
```

Never commit real `.env` files or secrets.

---

# Local PostgreSQL Setup

On the current macOS/Homebrew setup, PostgreSQL can be opened with:

```bash
psql template1
```

Create the application user if required:

```sql
CREATE USER game_helper_user WITH PASSWORD 'your_password';
```

Create the project database:

```sql
CREATE DATABASE game_helper OWNER game_helper_user;
```

Connect to it:

```sql
\c game_helper
```

Grant privileges if required:

```sql
GRANT ALL ON SCHEMA public TO game_helper_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO game_helper_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO game_helper_user;
```

---

# Sequelize Startup

The backend entry point is:

```text
server/index.js
```

During startup the backend:

```text
1. connects to PostgreSQL
2. authenticates the connection
3. synchronizes Sequelize models
4. starts the Express server
```

Current startup logic uses:

```js
await sequelize.authenticate();
await sequelize.sync();
```

Expected output:

```text
Database connected
Database synced
Server is running on http://localhost:3000
```

The project currently relies on `sequelize.sync()` during development.

A formal migration system has not yet been introduced.

---

# User Model

File:

```text
server/models/User.js
```

Purpose:

```text
authentication
user identity
profile information
```

Main fields:

| Field | Purpose |
|---|---|
| `id` | Primary key |
| `username` | Public username |
| `email` | User email |
| `passwordHash` | bcrypt password hash |
| `profileImage` | Profile image URL/path |
| `banner` | Profile banner URL/path |
| `aboutMe` | Profile description |
| `favoriteGame` | Favorite game |
| `favoriteGenre` | Favorite genre |
| `favoritePlatform` | Favorite platform |
| `discord` | Discord value |
| `steam` | Steam value |
| `github` | GitHub value |
| `reddit` | Reddit value |
| `createdAt` | Sequelize timestamp |
| `updatedAt` | Sequelize timestamp |

Passwords are hashed with bcrypt before storage.

`passwordHash` must never be returned through public API responses.

`profileImage` and `banner` are stored as strings.

The actual uploaded image files are stored under:

```text
server/uploads/profile/
```

The database stores only paths such as:

```text
/uploads/profile/example.png
```

---

# UserGame Model

File:

```text
server/models/UserGame.js
```

Purpose:

```text
store a user's personal relationship with a game
```

Main fields:

| Field | Purpose |
|---|---|
| `id` | Primary key |
| `rawgGameId` | Legacy external game ID field |
| `title` | Game title |
| `image` | Game image URL |
| `rawgRating` | Legacy external rating field |
| `released` | Release information |
| `status` | Library status |
| `personalRating` | User rating |
| `note` | User note |
| `createdAt` | Sequelize timestamp |
| `updatedAt` | Sequelize timestamp |

Current status values:

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

The project now uses IGDB.

Current backend mapping:

```text
gameId -> rawgGameId
rating -> rawgRating
```

This allows the frontend API to use provider-neutral field names while the database schema still contains the legacy names.

The fields should eventually be renamed through a deliberate database migration.

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

Do not rename these fields directly in the Sequelize model without handling the existing database schema.

---

# Game Library Persistence

The backend game-library API is implemented.

Available endpoints:

```text
GET    /api/library
POST   /api/library
PUT    /api/library/:id
DELETE /api/library/:id
```

All endpoints require authentication.

The authenticated user is identified using:

```text
req.user.id
```

Backend flow:

```text
/api/library
    ↓
library.controllers.js
    ↓
UserGame model
    ↓
PostgreSQL
```

Implemented behavior:

```text
get authenticated user's library
add a game
update status
update personal rating
update note
remove a game
prevent duplicate games for one user
prevent access to other users' library records
```

The backend now persists library data in PostgreSQL.

Current frontend limitation:

```text
Library frontend still uses localStorage
```

The frontend has not yet been connected to `/api/library`.

Therefore:

```text
Backend library source of truth  -> PostgreSQL
Frontend library source of truth -> localStorage until integration is completed
```

---

# ChatMessage Model

File:

```text
server/models/ChatMessage.js
```

Purpose:

```text
persist global chat messages
```

Main fields:

| Field | Purpose |
|---|---|
| `id` | Primary key |
| `username` | Displayed message author |
| `message` | Message text |
| `createdAt` | Sequelize timestamp |
| `updatedAt` | Sequelize timestamp |

Global chat messages are stored in PostgreSQL.

Current limitation:

```text
ChatMessage.username
```

is stored as a normal string.

There is currently no Sequelize foreign-key relationship between `ChatMessage` and `User`.

---

# Friendship Model

File:

```text
server/models/Friendship.js
```

Purpose:

```text
store friend requests and accepted friendships
```

Main fields:

| Field | Purpose |
|---|---|
| `id` | Primary key |
| `requesterId` | User who sent the request |
| `addresseeId` | User who received the request |
| `status` | Friendship state |
| `createdAt` | Sequelize timestamp |
| `updatedAt` | Sequelize timestamp |

Status values:

```text
pending
accepted
```

A single model is used for both friend requests and friendships.

Example pending request:

```text
requesterId: 3
addresseeId: 5
status: pending
```

After acceptance:

```text
requesterId: 3
addresseeId: 5
status: accepted
```

Relationships:

```text
User hasMany Friendship as SentFriendRequests
Friendship belongsTo User as Requester

User hasMany Friendship as ReceivedFriendRequests
Friendship belongsTo User as Addressee
```

Foreign keys:

```text
requesterId
addresseeId
```

Friendship records are also used to authorize private chat.

---

# PrivateMessage Model

File:

```text
server/models/PrivateMessage.js
```

Purpose:

```text
persist private messages between accepted friends
```

Main fields:

| Field | Purpose |
|---|---|
| `id` | Primary key |
| `senderId` | User who sent the message |
| `receiverId` | User who receives the message |
| `message` | Message text |
| `createdAt` | Sequelize timestamp |
| `updatedAt` | Sequelize timestamp |

Relationships:

```text
User hasMany PrivateMessage as SentPrivateMessages
PrivateMessage belongsTo User as Sender

User hasMany PrivateMessage as ReceivedPrivateMessages
PrivateMessage belongsTo User as Receiver
```

Foreign keys:

```text
senderId
receiverId
```

Private messages are only allowed if an accepted `Friendship` exists between both users.

Conversation history is retrieved using both directions:

```text
A -> B
B -> A
```

and ordered by:

```text
createdAt ASC
```

---

# Current Relationships

Main Sequelize relationships:

```text
User
 ├──< UserGame
 │
 ├──< Friendship (requesterId)
 │
 ├──< Friendship (addresseeId)
 │
 ├──< PrivateMessage (senderId)
 │
 └──< PrivateMessage (receiverId)
```

More explicitly:

```text
User 1 ─────< UserGame

User 1 ─────< Friendship >───── 1 User
             requesterId
             addresseeId

User 1 ─────< PrivateMessage >───── 1 User
             senderId
             receiverId
```

`ChatMessage` currently remains independent from `User` at the foreign-key level.

---

# Persistence Overview

| Feature | Current persistence/source |
|---|---|
| Users/authentication | PostgreSQL |
| Profile text fields | PostgreSQL |
| Profile image/banner paths | PostgreSQL |
| Actual profile/banner files | `server/uploads/profile/` |
| Global chat | PostgreSQL |
| Friend requests | PostgreSQL |
| Accepted friendships | PostgreSQL |
| Private messages | PostgreSQL |
| UserGame backend | PostgreSQL through `/api/library` |
| Game-library frontend | `localStorage` |
| Game catalogue | IGDB API |

Not every frontend feature is currently database-backed.

---

# IGDB and PostgreSQL

The complete IGDB game catalogue is not copied into PostgreSQL.

Current flow:

```text
Frontend
    ↓
Game Helper Backend
    ↓
Twitch OAuth
    ↓
IGDB API
```

IGDB game data is fetched dynamically.

Only user-specific game information is persisted in `UserGame`.

Example:

```text
IGDB game data
    ↓
user adds game to library
    ↓
POST /api/library
    ↓
UserGame
    ↓
PostgreSQL
```

IGDB credentials are not stored in PostgreSQL.

They are stored in environment variables:

```text
IGDB_CLIENT_ID
IGDB_CLIENT_SECRET
IGDB_BASE_URL
TWITCH_TOKEN_URL
```

The backend automatically obtains a Twitch App Access Token.

---

# Useful PostgreSQL Commands

List databases:

```sql
\l
```

Connect to the project database:

```sql
\c game_helper
```

List tables:

```sql
\dt
```

Describe a table:

```sql
\d "Users"
```

Other useful tables:

```sql
\d "UserGames"
\d "ChatMessages"
\d "Friendships"
\d "PrivateMessages"
```

List roles:

```sql
\du
```

Exit:

```sql
\q
```

---

# Common Database Problems

## Database connection failed

Check:

```text
PostgreSQL is running
DB_NAME
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
```

---

## `must be owner of table Users`

The database object is owned by another PostgreSQL role.

Example:

```sql
ALTER TABLE "Users" OWNER TO game_helper_user;
```

Similar ownership issues may affect:

```text
Users
UserGames
ChatMessages
Friendships
PrivateMessages
generated sequences
```

---

## Sequelize model changes do not appear

The project currently uses:

```js
sequelize.sync()
```

This creates missing tables but is not a complete migration system.

Avoid permanently enabling:

```js
sequelize.sync({ alter: true })
```

unless a deliberate schema update requires it.

---

# Security Rules

- Never commit `server/.env`.
- Never commit database passwords.
- Never commit `JWT_SECRET`.
- Never commit `IGDB_CLIENT_SECRET`.
- Never expose Twitch credentials.
- Store passwords only as bcrypt hashes.
- Never expose `passwordHash` through API responses.
- Keep IGDB/Twitch authentication on the backend.
- Never commit uploaded user images.
- Library endpoints must only access the authenticated user's own records.
- Private messages must only be accessible to authorized users.
- Private chat requires an accepted friendship.

If a secret was previously committed, deleting it from the latest version of the repository does not automatically remove it from Git history.

Exposed credentials should be rotated.

---

# Current Database Limitations

- Game-library frontend still uses `localStorage` even though the backend library API is implemented.
- `UserGame` still contains legacy `rawgGameId` and `rawgRating` field names.
- `ChatMessage` has no `User` foreign key.
- No formal Sequelize migration system is currently implemented.
- Uploaded image files are stored locally on the backend server.
- Image storage is not yet designed for production deployment.

---

# Planned Database Work

Possible future improvements:

- connect the frontend game library to `/api/library`
- remove `localStorage` as the frontend library source of truth
- rename legacy `rawgGameId` and `rawgRating` fields through a database migration
- link global chat messages directly to users
- introduce Sequelize migrations
- add production-ready image/file storage
- improve indexes and unique constraints for friendships
- add message pagination for private conversations