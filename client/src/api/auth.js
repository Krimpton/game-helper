const API_URL = "http://localhost:3000/api/auth";

export async function registerUser(username, email, password) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
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

export async function loginUser(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
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

export async function getCurrentUser() {
    const response = await fetch(`${API_URL}/me`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Not authenticated");
    }

    return data.user;
}

export async function logoutUser() {
    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Logout failed");
    }

    return data;
}