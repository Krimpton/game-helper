import { useState } from "react";
import "./AuthModal.css";

const defaultProfilePictures = [
  "/images/dummy-profile-red.png",
  "/images/dummy-profile-blue.png",
  "/images/dummy-profile-green.png",
  "/images/dummy-profile-orange.png",
];

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

    
    const randomProfilePicture =
      defaultProfilePictures[
        Math.floor(
          Math.random() * defaultProfilePictures.length
        )
      ];

    const newUser = {
      username,
      password,

      profileImage: randomProfilePicture,

      favoriteGenre: "",
      favoritePlatform: "",
      favoriteGame: "",
      aboutMe: "",
      banner: "",
      steam: "",
      discord: "",
      github: "",
      website: "",

      gamesViewed: 0,
      favoriteGames: 0,
      wishlist: 0,
      friends: [],
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