const API_URL = "http://localhost:3000/api/auth";

export async function login(
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}


export async function register(
  username: string,
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}


export async function getCurrentUser() {

  const response = await fetch(
    "http://localhost:3000/api/auth/me",
    {
      credentials: "include",
    }
  );


  if (!response.ok) {
    return null;
  }


  const data = await response.json();


  return data.user;
}


export async function logout() {

  await fetch(
    "http://localhost:3000/api/auth/logout",
    {
      method: "POST",
      credentials: "include",
    }
  );

}