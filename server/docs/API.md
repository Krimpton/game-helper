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
| POST | `/api/users/me/profile-image` | Yes | Upload profile image |
| POST | `/api/users/me/banner` | Yes | Upload profile banner |
| GET | `/api/users/search?username=...` | Yes | Search users |
| GET | `/api/games` | No | List/search games |
| GET | `/api/games/:id` | No | Get game details |
| GET | `/api/library` | Yes | Get current user's game library |
| POST | `/api/library` | Yes | Add a game to the library |
| PUT | `/api/library/:id` | Yes | Update a library entry |
| DELETE | `/api/library/:id` | Yes | Remove a game from the library |
| GET | `/api/chat/messages` | No | Get global chat messages |
| POST | `/api/chat/messages` | No | Send global chat message |
| POST | `/api/friends/requests` | Yes | Send friend request |
| GET | `/api/friends/requests` | Yes | Get incoming friend requests |
| PUT | `/api/friends/requests/:id/accept` | Yes | Accept friend request |
| DELETE | `/api/friends/requests/:id` | Yes | Decline friend request |
| GET | `/api/friends` | Yes | Get current friends |
| DELETE | `/api/friends/:userId` | Yes | Remove friend |
| GET | `/api/private-chat/:userId` | Yes | Get private conversation |
| POST | `/api/private-chat/:userId` | Yes | Send private message |

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

Validation:

- username required
- username minimum 3 characters
- email required
- basic email format validation
- password minimum 6 characters
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

`passwordHash` is never returned.

Possible errors:

```text
401 Not authenticated
401 Invalid or expired token
```

---

# User Profile

## PUT `/api/users/me`

Updates the authenticated user's profile.

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

Example request:

```json
{
  "aboutMe": "I like RPG games.",
  "favoriteGame": "The Witcher 3",
  "favoriteGenre": "RPG",
  "favoritePlatform": "PC"
}
```

---

## POST `/api/users/me/profile-image`

Uploads a profile image.

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

Example response:

```json
{
  "message": "Profile image uploaded successfully",
  "profileImage": "/uploads/profile/example.png"
}
```

Uploaded files are served through:

```text
http://localhost:3000/uploads/...
```

---

## POST `/api/users/me/banner`

Uploads a profile banner.

Authentication required.

Request type:

```text
multipart/form-data
```

File field:

```text
image
```

Example response:

```json
{
  "message": "Banner uploaded successfully",
  "banner": "/uploads/profile/example-banner.png"
}
```

---

# User Search

## GET `/api/users/search?username=...`

Searches users by username.

Authentication required.

Example:

```text
GET /api/users/search?username=profile
```

Example response:

```json
{
  "users": [
    {
      "id": 3,
      "username": "profiletest",
      "profileImage": "/uploads/profile/example.png"
    }
  ]
}
```

Only safe public user fields are returned.

---

# Games

Game data is provided by IGDB through the backend.

IGDB authentication uses Twitch OAuth.

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

The frontend never communicates with IGDB directly.

---

## GET `/api/games`

Returns normalized game data from IGDB.

Supported query parameters:

```text
page
page_size
search
```

Example:

```text
GET /api/games?page=1&page_size=20
```

Search example:

```text
GET /api/games?search=witcher
```

Returned game fields:

```text
id
title
image
rating
released
genres
platforms
```

Example:

```json
{
  "count": 12,
  "page": 1,
  "results": [
    {
      "id": 1942,
      "title": "The Witcher 3: Wild Hunt",
      "image": "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg",
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
  ]
}
```

IGDB ratings use a `0–100` scale internally.

The backend normalizes them to the Game Helper `0–5` scale.

The default list filters out games without useful rating data and prefers games with enough ratings.

Category and platform filtering is currently additionally performed on the frontend.

---

## GET `/api/games/:id`

Returns detailed information for one IGDB game.

Example:

```text
GET /api/games/1942
```

Returned fields:

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

IGDB integration uses:

```text
server/services/igdb.service.js
```

Required environment variables:

```text
IGDB_CLIENT_ID
IGDB_CLIENT_SECRET
IGDB_BASE_URL
TWITCH_TOKEN_URL
```

The backend automatically obtains and caches a Twitch App Access Token.

IGDB/Twitch credentials must remain backend-only.

---

# Game Library

The game-library backend is implemented.

Library data is persisted in PostgreSQL through the `UserGame` Sequelize model.

All library endpoints require authentication.

The current user is determined through:

```text
req.user.id
```

This ensures that users can only access and modify their own library entries.

---

## GET `/api/library`

Returns all game-library entries belonging to the authenticated user.

Example response:

```json
{
  "games": [
    {
      "id": 1,
      "userId": 3,
      "rawgGameId": 1942,
      "title": "The Witcher 3: Wild Hunt",
      "image": "https://images.igdb.com/...",
      "rawgRating": 4.7,
      "released": "2015-05-19",
      "status": "playing",
      "personalRating": null,
      "note": null
    }
  ]
}
```

---

## POST `/api/library`

Adds a game to the authenticated user's library.

Example request:

```json
{
  "gameId": 1942,
  "title": "The Witcher 3: Wild Hunt",
  "image": "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg",
  "rating": 4.7,
  "released": "2015-05-19",
  "status": "playing"
}
```

Required fields:

```text
gameId
title
```

Supported status values:

```text
wishlist
want_to_play
playing
completed
dropped
```

The backend prevents the same user from adding the same external game more than once.

---

## PUT `/api/library/:id`

Updates an existing library entry belonging to the authenticated user.

The `:id` parameter represents the `UserGame` database record ID, not the IGDB game ID.

Supported update fields:

```text
status
personalRating
note
```

Example:

```text
PUT /api/library/1
```

Example request:

```json
{
  "status": "completed",
  "personalRating": 5,
  "note": "Great game"
}
```

`personalRating` must be between `1` and `5` when provided.

Users cannot update library entries belonging to another user.

---

## DELETE `/api/library/:id`

Removes a library entry belonging to the authenticated user.

Example:

```text
DELETE /api/library/1
```

Example response:

```json
{
  "message": "Game removed from library"
}
```

Users cannot delete library entries belonging to another user.

---

## Library Implementation Status

```text
UserGame model                Implemented
User/UserGame relationship    Implemented
Library frontend UI           Implemented
Frontend persistence          localStorage
Library backend controller    Implemented
Library backend routes        Implemented
Library API registration      Implemented
Frontend/backend integration  Not implemented
```

The backend library API is ready and stores data in PostgreSQL.

The frontend currently still uses `localStorage` for the game library. It must be connected to `/api/library` before PostgreSQL becomes the frontend library's source of truth.

### Legacy field names

The `UserGame` model currently contains:

```text
rawgGameId
rawgRating
```

These are legacy field names from the previous RAWG integration.

The project now uses IGDB, so `rawgGameId` currently stores the external IGDB game ID and `rawgRating` stores the normalized external game rating.

These fields should eventually be renamed to provider-neutral or IGDB-specific names through a deliberate database migration.

They should not be renamed directly in the Sequelize model without handling the existing database schema.

---

# Global Chat

## GET `/api/chat/messages`

Returns up to 50 recent global chat messages ordered by `createdAt ASC`.

Example response item:

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

Creates a global chat message.

Request body:

```json
{
  "username": "ExampleUser",
  "message": "Hello!"
}
```

Messages are stored in PostgreSQL through `ChatMessage`.

Empty messages return `400`.

---

# Friends

All friend endpoints require authentication.

The current user is determined through:

```text
req.user.id
```

Friendship state is stored in the `Friendship` model.

Status values:

```text
pending
accepted
```

---

## POST `/api/friends/requests`

Sends a friend request.

Request body:

```json
{
  "userId": 5
}
```

The backend prevents:

- friend requests to yourself
- duplicate pending requests
- duplicate friendships

---

## GET `/api/friends/requests`

Returns incoming pending friend requests.

---

## PUT `/api/friends/requests/:id/accept`

Accepts an incoming friend request.

Example:

```text
PUT /api/friends/requests/4/accept
```

---

## DELETE `/api/friends/requests/:id`

Declines an incoming friend request.

Example:

```text
DELETE /api/friends/requests/4
```

---

## GET `/api/friends`

Returns all accepted friends of the current user.

---

## DELETE `/api/friends/:userId`

Removes an existing friend.

Example:

```text
DELETE /api/friends/5
```

---

# Private Chat

Private chat is only available between users with an accepted friendship.

All endpoints require authentication.

Private messages are stored through the `PrivateMessage` Sequelize model.

---

## POST `/api/private-chat/:userId`

Sends a private message to a friend.

Example:

```text
POST /api/private-chat/5
```

Request body:

```json
{
  "message": "Hello!"
}
```

Non-friends receive:

```text
403 Forbidden
```

Users cannot send private messages to themselves.

Empty messages return `400`.

---

## GET `/api/private-chat/:userId`

Returns the private conversation between the authenticated user and a specific friend.

Example:

```text
GET /api/private-chat/5
```

Messages are returned in chronological order.

---

# Security Notes

- Never commit `server/.env`.
- Never expose `JWT_SECRET`.
- Never expose `IGDB_CLIENT_SECRET`.
- Never expose Twitch credentials.
- Never return `passwordHash`.
- Protected routes must use `authMiddleware`.
- Passwords must be hashed with bcrypt.
- Private chat is restricted to accepted friends.
- Library operations are restricted to the authenticated user's own records.
- Uploaded files should be validated by type and size.
- Keep external API credentials on the backend only.