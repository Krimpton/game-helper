# Game Helper API Documentation

This document describes the currently implemented backend API of the Game Helper project.

Default backend URL:

```text
http://localhost:3000
```

Authentication uses a JWT stored in an HTTP-only cookie named `token`.

## API Overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | No | Backend health check |
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login |
| POST | `/api/auth/logout` | No | Logout |
| GET | `/api/auth/me` | Yes | Get current user |
| PUT | `/api/users/me` | Yes | Update current profile |
| GET | `/api/games` | No | List/search games |
| GET | `/api/games/:id` | No | Get game details |
| GET | `/api/chat/messages` | No | Get chat messages |
| POST | `/api/chat/messages` | No | Send chat message |

The library backend is not active yet. `UserGame` exists, but the library controller and routes are unfinished.

---

# Health

## GET `/api/health`

Checks whether the backend is running.

Example response:

```json
{
  "status": "ok"
}
```

---

# Authentication

## POST `/api/auth/register`

Creates a new user.

Request body:

```json
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "123456"
}
```

Current validation:

- username required, minimum 3 characters
- email required with basic format validation
- password required, minimum 6 characters
- unique username
- unique email

Passwords are hashed with bcrypt before storage.

Successful registration creates a JWT containing:

```text
id
email
username
```

The JWT is stored in the HTTP-only `token` cookie.

JWT expiration uses `JWT_EXPIRES_IN` with a fallback of `7d`.

---

## POST `/api/auth/login`

Authenticates an existing user.

Request body:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

The backend compares the supplied password with the stored bcrypt hash.

Successful login creates the same HTTP-only JWT cookie.

Authenticated frontend requests must use:

```ts
credentials: "include"
```

---

## POST `/api/auth/logout`

Clears the authentication cookie.

No request body is required.

---

## GET `/api/auth/me`

Returns the currently authenticated user.

Authentication required.

The auth middleware reads `req.cookies.token`, verifies it with `JWT_SECRET`, and sets `req.user`.

The controller then loads the current user from PostgreSQL.

Returned fields include:

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
createdAt
updatedAt
```

`passwordHash` must never be returned.

Possible authentication errors:

```text
401 Not authenticated
401 Invalid or expired token
```

---

# User Profile

## PUT `/api/users/me`

Updates the profile of the authenticated user.

Authentication required.

Allowed fields:

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

Example request:

```json
{
  "aboutMe": "I like RPG games.",
  "favoriteGame": "The Witcher 3",
  "favoriteGenre": "RPG",
  "favoritePlatform": "PC"
}
```

`profileImage` and `banner` are stored as URL/path strings, not binary files.

Current limitation: the backend endpoint exists, but `ProfilePage.tsx` still stores part of its state in `localStorage`.

---

# Games

## GET `/api/games`

Returns normalized game data from RAWG through the backend.

Supported query parameters:

```text
page
page_size
search
genres
platforms
```

Example:

```text
GET /api/games?page=1&page_size=20&search=witcher
```

Returned game fields include:

```text
id
title
image
rating
released
genres
platforms
```

Some category and platform filtering is additionally performed on the frontend.

---

## GET `/api/games/:id`

Returns detailed information for one game.

Example:

```text
GET /api/games/3498
```

Returned fields include:

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

RAWG requests use `server/services/rawg.service.js` and require:

```text
RAWG_BASE_URL
RAWG_API_KEY
```

The RAWG key must remain backend-only.

---

# Global Chat

## GET `/api/chat/messages`

Returns up to 50 recent messages ordered by `createdAt ASC`.

Example message:

```json
{
  "id": 1,
  "username": "ExampleUser",
  "message": "Hello!",
  "createdAt": "2026-01-01T12:00:00.000Z",
  "updatedAt": "2026-01-01T12:00:00.000Z"
}
```

The frontend currently polls this endpoint every two seconds.

WebSockets are not implemented.

---

## POST `/api/chat/messages`

Creates a new global-chat message.

Request body:

```json
{
  "username": "ExampleUser",
  "message": "Hello!"
}
```

Messages are stored in PostgreSQL through `ChatMessage`.

Empty messages return `400`.

Backend username fallback:

```text
Demo User
```

Frontend fallback when unauthenticated:

```text
Guest
```

---

# Library API Status

Current files:

```text
server/models/UserGame.js
server/controllers/library.controllers.js
server/routes/library.routes.js
```

Current status:

```text
UserGame model                Implemented
Library frontend UI           Implemented
Frontend persistence          localStorage
Library backend controller    Incomplete
Library backend routes        Incomplete
Frontend/backend integration  Not implemented
```

Do not treat `/api/library` as available until it is implemented and registered in `server/index.js`.

---

# Security Notes

- Never commit `server/.env`.
- Never expose `JWT_SECRET` or `RAWG_API_KEY`.
- Never return `passwordHash`.
- Protected routes should use `authMiddleware`.
- Passwords must be hashed with bcrypt.
- Keep cookie-based authentication unless authentication is intentionally redesigned.