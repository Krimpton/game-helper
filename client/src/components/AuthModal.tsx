import { useState } from "react";
import "./AuthModal.css";
import { login, register } from "../services/authService";

function AuthModal({ onLogin }: any) {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = (loginMode: boolean) => {
    setIsLogin(loginMode);

    setError("");
    setSuccess("");

    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);

      await login(email, password);

      const response = await fetch(
        "http://localhost:3000/api/auth/me",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.user) {
        throw new Error("Could not load user data.");
      }

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setSuccess("Login successful!");

      onLogin(data.user);

      window.dispatchEvent(
        new Event("userChanged")
      );

    } catch (err: any) {
      setError(
        err.message || "Login failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);

      const data = await register(
        username,
        email,
        password
      );

      if (!data.user) {
        throw new Error("Registration failed.");
      }

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setSuccess("Account created successfully!");

      onLogin(data.user);

      window.dispatchEvent(
        new Event("userChanged")
      );

    } catch (err: any) {
      setError(
        err.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (loading) return;

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isLogin && !username) {
      setError("Please enter a username.");
      return;
    }

    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
    <div className="auth-overlay">

      <div className="auth-modal">

        {/* =========================
            HEADER
        ========================= */}

        <div className="auth-header">

          <h1>GameHelper</h1>

          <p>
            {isLogin
              ? "Welcome back, gamer."
              : "Create your gaming profile."
            }
          </p>

        </div>


        {/* =========================
            LOGIN / REGISTER TABS
        ========================= */}

        <div className="auth-tabs">

          <button
            type="button"
            className={isLogin ? "active" : ""}
            onClick={() => switchMode(true)}
            disabled={loading}
          >
            LOGIN
          </button>

          <button
            type="button"
            className={!isLogin ? "active" : ""}
            onClick={() => switchMode(false)}
            disabled={loading}
          >
            REGISTER
          </button>

        </div>


        {/* =========================
            FORM
        ========================= */}

        <div className="auth-form">

          {!isLogin && (
            <div className="auth-field">

              <label>USERNAME</label>

              <div className="auth-input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  disabled={loading}
                  autoComplete="username"
                />

              </div>

            </div>
          )}


          <div className="auth-field">

            <label>EMAIL</label>

            <div className="auth-input-wrapper">

              <span className="input-icon">
                ✉
              </span>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
                autoComplete="email"
              />

            </div>

          </div>


          <div className="auth-field">

            <label>PASSWORD</label>

            <div className="auth-input-wrapper">

              <span className="input-icon">
                •••
              </span>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={loading}
                autoComplete={
                  isLogin
                    ? "current-password"
                    : "new-password"
                }
              />

            </div>

          </div>


          {/* =========================
              ERROR
          ========================= */}

          {error && (
            <div className="auth-message auth-error">

              <span>!</span>

              <p>{error}</p>

            </div>
          )}


          {/* =========================
              SUCCESS
          ========================= */}

          {success && (
            <div className="auth-message auth-success">

              <span>✓</span>

              <p>{success}</p>

            </div>
          )}


          {/* =========================
              SUBMIT
          ========================= */}

          <button
            type="button"
            className="auth-submit"
            onClick={handleSubmit}
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="loading-spinner"></span>

                {isLogin
                  ? "Signing in..."
                  : "Creating account..."
                }
              </>
            ) : (
              <>
                <span>
                  {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
                </span>

                <span className="submit-arrow">
                  →
                </span>
              </>
            )}

          </button>

        </div>


        {/* =========================
            FOOTER
        ========================= */}

        <div className="auth-footer">

          {isLogin ? (
            <>
              <span>
                Don't have an account?
              </span>

              <button
                type="button"
                onClick={() => switchMode(false)}
                disabled={loading}
              >
                Create one
              </button>
            </>
          ) : (
            <>
              <span>
                Already have an account?
              </span>

              <button
                type="button"
                onClick={() => switchMode(true)}
                disabled={loading}
              >
                Sign in
              </button>
            </>
          )}

        </div>


        {/* =========================
            BOTTOM DECORATION
        ========================= */}

        <div className="auth-decoration">

          <span></span>
          <span></span>
          <span></span>

        </div>

      </div>

    </div>
  );
}

export default AuthModal;