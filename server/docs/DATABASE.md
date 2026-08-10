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
```

---

# Database Configuration

The backend reads database configuration from:

```text
server/.env
```

Required variables:

```env
DB_NAME=game_helper
DB_USER=game_helper_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
```

The project also uses other backend variables such as `PORT`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `RAWG_BASE_URL`, and `RAWG_API_KEY`.

Never commit real `.env` files or secrets.

---

# Local PostgreSQL Setup

On the current macOS/Homebrew setup, PostgreSQL can be opened with:

```bash
psql template1
```

Create the application user:

```sql
-- CREATE USER game_helper_user WITH PASSWORD 'your_password';
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
-- GRANT ALL ON SCHEMA public TO game_helper_user;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO game_helper_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO game_helper_user;
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
Server is running on port 3000
```

Do not permanently use `sequelize.sync({ alter: true })` unless a deliberate schema change is required.

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

`profileImage` and `banner` are stored as strings, not binary files.

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
| `rawgGameId` | RAWG game ID |
| `title` | Game title |
| `image` | Game image URL |
| `rawgRating` | RAWG rating |
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

Current limitation: the model exists, but the backend library API is unfinished. The frontend library still uses `localStorage`.

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
| `username` | Displayed author |
| `message` | Message text |
| `createdAt` | Sequelize timestamp |
| `updatedAt` | Sequelize timestamp |

Global chat messages are stored in PostgreSQL.

The model currently stores `username` as a string and has no Sequelize foreign-key relationship to `User`.

---

# Relationships

Current defined relationship:

```text
User
  1
  │
  └────────────< UserGame
                  many
```

`ChatMessage` is currently independent from `User` at the database relationship level.

---

# Persistence Overview

| Feature | Current persistence/source |
|---|---|
| Users/authentication | PostgreSQL |
| Backend profile fields | PostgreSQL |
| Global chat | PostgreSQL |
| UserGame model | PostgreSQL model exists |
| Game-library frontend | `localStorage` |
| Part of profile frontend | `localStorage` |
| Game catalogue | RAWG API |

Not every frontend feature is currently database-backed.

---

# RAWG and PostgreSQL

The complete RAWG game catalogue is not copied into PostgreSQL.

Current flow:

```text
Frontend
    ↓
Backend
    ↓
RAWG API
```

Only user-specific game information is intended to be stored in `UserGame`.

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

## `must be owner of table Users`

The database object is owned by another PostgreSQL role.

Example ownership correction:

```sql
-- ALTER TABLE "Users" OWNER TO game_helper_user;
```

Similar ownership issues may affect `UserGames`, `ChatMessages`, and generated sequences.

## Sequelize model changes do not appear

The project currently uses:

```js
sequelize.sync()
```

This is suitable for the current development stage, but it is not a full migration system.

---

# Security Rules

- Never commit `server/.env`.
- Never commit database passwords.
- Never commit `JWT_SECRET` or `RAWG_API_KEY`.
- Store passwords only as bcrypt hashes.
- Never expose `passwordHash` through API responses.
- Keep RAWG credentials on the backend.

If secrets were previously committed, removing `.env` from the current branch does not remove them from Git history. Exposed secrets should be rotated.

---

# Current Database Limitations

- Game-library frontend still uses `localStorage`.
- Profile frontend/backend synchronization is incomplete.
- `ChatMessage` has no `User` foreign key.
- Friend relationships are not modeled.
- Private-message relationships are not modeled.
- No completed server-side image storage system exists.
- No formal migration system is currently documented.

---

# Planned Database Work

Possible future improvements:

- complete the backend library API around `UserGame`
- connect the frontend library to PostgreSQL
- fully synchronize profile editing with PostgreSQL
- add friend relationships if friend functionality is implemented
- add user-linked private-message models if private chat is implemented
- introduce Sequelize migrations when the schema becomes more stable