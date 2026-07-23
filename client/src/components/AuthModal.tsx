import { useState } from "react";
import "./AuthModal.css";
import { login, register, } from "../services/authService";

const defaultProfilePictures = [
  "/images/dummy-profile-red.png",
  "/images/dummy-profile-blue.png",
  "/images/dummy-profile-green.png",
  "/images/dummy-profile-orange.png",
];

const defaultProfilePictures = [
  "/images/dummy-profile-red.png",
  "/images/dummy-profile-blue.png",
  "/images/dummy-profile-green.png",
  "/images/dummy-profile-orange.png",
];

function AuthModal({ onLogin }: any) {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async () => {
  try {
    setError("");

    await login(email, password);

    // Benutzerdaten vom Backend laden
    const response = await fetch(
      "http://localhost:3000/api/auth/me",
      {
        credentials: "include",
      }
    );

    const user = await response.json();

    onLogin(user);

  } catch (err: any) {
    setError(err.message);
  }
};

  const handleRegister = async () => {
  try {
    setError("");

    const data = await register(
      username,
      email,
      password
    );


    onLogin(data.user);


  } catch (err: any) {

    setError(err.message);

  }
};

  return (
    <div className="auth-overlay">
      <div className="auth-modal">

        <div className="auth-avatar">
          🎮
        </div>

        <h1>GameHelper</h1>

        <p className="auth-subtitle">
          Your personal gaming library
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <button
          className="auth-submit"
          onClick={isLogin ? handleLogin : handleRegister}
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        <div className="auth-switch">
          {isLogin ? (
            <>
              Don't have an account?
              <span
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                }}
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?
              <span
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                }}
              >
                Login
              </span>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default AuthModal;