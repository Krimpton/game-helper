const API_URL = "http://localhost:3000/api/private-chat";

// ==========================
// GET PRIVATE CHAT
// ==========================

export async function getPrivateMessages(userId: number) {
  const response = await fetch(`${API_URL}/${userId}`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load private chat"
    );
  }

  return data;
}


// ==========================
// SEND PRIVATE MESSAGE
// ==========================

export async function sendPrivateMessage(
  userId: number,
  message: string
) {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to send private message"
    );
  }

  return data;
}