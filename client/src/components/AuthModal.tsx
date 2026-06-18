import { useState } from "react";
import "./AuthModal.css";

function AuthModal({ onLogin }: any) {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const user = users.find(
      (u: any) => u.username === username
    );

    if (!user) {
      setError("User not registered");
      return;
    }

    if (user.password !== password) {
      setError("Wrong password");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    onLogin(user);
  };

  const handleRegister = () => {
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const existingUser = users.find(
      (u: any) => u.username === username
    );

    if (existingUser) {
      setError("Username already exists");
      return;
    }

    const newUser = {
      username,
      password,
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );

    onLogin(newUser);
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">

        <h1>GameHelper</h1>

        <div className="auth-tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
          >
            Login
          </button>

          <button
            className={!isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
          >
            Register
          </button>
        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <button
          className="auth-submit"
          onClick={
            isLogin
              ? handleLogin
              : handleRegister
          }
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

      </div>
    </div>
  );
}

export default AuthModal;