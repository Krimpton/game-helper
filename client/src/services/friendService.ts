const API_URL = "http://localhost:3000/api/friends";
const USERS_API_URL = "http://localhost:3000/api/users";


// ==========================
// GET FRIENDS
// ==========================

export async function getFriends() {
  const response = await fetch(API_URL, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load friends"
    );
  }

  return data.friends;
}


// ==========================
// SEARCH USERS
// ==========================

export async function searchUsers(username: string) {
  const response = await fetch(
    `${USERS_API_URL}/search?username=${encodeURIComponent(username)}`,
    {
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to search users"
    );
  }

  return data.users;
}


// ==========================
// SEND FRIEND REQUEST
// ==========================

export async function sendFriendRequest(userId: number) {
  const response = await fetch(`${API_URL}/requests`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to send friend request"
    );
  }

  return data;
}


// ==========================
// GET INCOMING REQUESTS
// ==========================

export async function getFriendRequests() {
  const response = await fetch(`${API_URL}/requests`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load friend requests"
    );
  }

  return data.requests;
}


// ==========================
// ACCEPT FRIEND REQUEST
// ==========================

export async function acceptFriendRequest(requestId: number) {
  const response = await fetch(
    `${API_URL}/requests/${requestId}/accept`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to accept friend request"
    );
  }

  return data;
}


// ==========================
// DECLINE FRIEND REQUEST
// ==========================

export async function declineFriendRequest(requestId: number) {
  const response = await fetch(
    `${API_URL}/requests/${requestId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to decline friend request"
    );
  }

  return data;
}


// ==========================
// REMOVE FRIEND
// ==========================

export async function removeFriend(userId: number) {
  const response = await fetch(
    `${API_URL}/${userId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to remove friend"
    );
  }

  return data;
}