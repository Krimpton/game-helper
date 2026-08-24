import { useState } from "react";

import "./AuthModal.css";

import {
  login,
  register,
} from "../services/authService";


function AuthModal({
                     onLogin,
                   }: any) {

  const [isLogin, setIsLogin] =
      useState(true);

  const [username, setUsername] =
      useState("");

  const [email, setEmail] =
      useState("");

  const [password, setPassword] =
      useState("");

  const [error, setError] =
      useState("");

  const [success, setSuccess] =
      useState("");

  const [loading, setLoading] =
      useState(false);


  // =====================================================
  // SWITCH LOGIN / REGISTER
  // =====================================================

  const switchMode = (
      loginMode: boolean
  ) => {

    setIsLogin(
        loginMode
    );

    setError("");

    setSuccess("");

    setUsername("");

    setEmail("");

    setPassword("");

  };


  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin =
      async () => {

        try {

          setError("");

          setSuccess("");

          setLoading(true);


          await login(
              email,
              password
          );


          const response =
              await fetch(
                  "http://localhost:3000/api/auth/me",
                  {
                    credentials:
                        "include",
                  }
              );


          const data =
              await response.json();


          if (
              !response.ok ||
              !data.user
          ) {

            throw new Error(
                "Could not load user data."
            );

          }


          localStorage.setItem(
              "user",
              JSON.stringify(
                  data.user
              )
          );


          setSuccess(
              "Login successful!"
          );


          onLogin(
              data.user
          );


          window.dispatchEvent(
              new Event(
                  "userChanged"
              )
          );


        } catch (err: any) {

          setError(
              err.message ||
              "Login failed. Please check your details."
          );

        } finally {

          setLoading(false);

        }

      };


  // =====================================================
  // REGISTER
  // =====================================================

  const handleRegister =
      async () => {

        try {

          setError("");

          setSuccess("");

          setLoading(true);


          const data =
              await register(
                  username,
                  email,
                  password
              );


          if (!data.user) {

            throw new Error(
                "Registration failed."
            );

          }


          localStorage.setItem(
              "user",
              JSON.stringify(
                  data.user
              )
          );


          setSuccess(
              "Account created successfully!"
          );


          onLogin(
              data.user
          );


          window.dispatchEvent(
              new Event(
                  "userChanged"
              )
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


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit =
      () => {

        if (loading) {
          return;
        }


        if (
            !email.trim() ||
            !password.trim()
        ) {

          setError(
              "Please fill in all required fields."
          );

          return;

        }


        if (
            !isLogin &&
            !username.trim()
        ) {

          setError(
              "Please enter a username."
          );

          return;

        }


        if (isLogin) {

          handleLogin();

        } else {

          handleRegister();

        }

      };


  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (
      event: React.KeyboardEvent
  ) => {

    if (
        event.key === "Enter" &&
        !loading
    ) {

      handleSubmit();

    }

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

      <div className="auth-overlay">

        <div className="auth-modal">


          {/* =================================================
            HEADER
        ================================================= */}

          <div className="auth-header">


            <div className="auth-badge">

              <span className="auth-badge-dot" />

              GameHelper Account

            </div>


            <h1>
              GameHelper
            </h1>


            <p>

              {isLogin
                  ? "Welcome back. Your games are waiting."
                  : "Create your profile and start building your library."
              }

            </p>

          </div>


          {/* =================================================
            LOGIN / REGISTER TABS
        ================================================= */}

          <div className="auth-tabs">

            <button
                type="button"

                className={
                  isLogin
                      ? "active"
                      : ""
                }

                onClick={() =>
                    switchMode(true)
                }

                disabled={
                  loading
                }
            >

              Login

            </button>


            <button
                type="button"

                className={
                  !isLogin
                      ? "active"
                      : ""
                }

                onClick={() =>
                    switchMode(false)
                }

                disabled={
                  loading
                }
            >

              Register

            </button>

          </div>


          {/* =================================================
            FORM
        ================================================= */}

          <div
              className="auth-form"

              onKeyDown={
                handleKeyDown
              }
          >


            {/* USERNAME */}

            {!isLogin && (

                <div className="auth-field">

                  <label>
                    Username
                  </label>


                  <div className="auth-input-wrapper">

                <span className="input-icon">

                  @

                </span>


                    <input
                        type="text"

                        placeholder="Choose a username"

                        value={
                          username
                        }

                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }

                        disabled={
                          loading
                        }

                        autoComplete="username"
                    />

                  </div>

                </div>

            )}


            {/* EMAIL */}

            <div className="auth-field">

              <label>
                Email
              </label>


              <div className="auth-input-wrapper">

              <span className="input-icon">

                ✉

              </span>


                <input
                    type="email"

                    placeholder="Enter your email"

                    value={
                      email
                    }

                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }

                    disabled={
                      loading
                    }

                    autoComplete="email"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="auth-field">

              <label>
                Password
              </label>


              <div className="auth-input-wrapper">

              <span className="input-icon">

                •••

              </span>


                <input
                    type="password"

                    placeholder="Enter your password"

                    value={
                      password
                    }

                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }

                    disabled={
                      loading
                    }

                    autoComplete={
                      isLogin
                          ? "current-password"
                          : "new-password"
                    }
                />

              </div>


              {!isLogin && (

                  <span className="auth-field-hint">

                Use at least 6 characters.

              </span>

              )}

            </div>


            {/* =================================================
              ERROR
          ================================================= */}

            {error && (

                <div className="auth-message auth-error">

              <span className="auth-message-icon">

                !

              </span>


                  <p>

                    {error}

                  </p>

                </div>

            )}


            {/* =================================================
              SUCCESS
          ================================================= */}

            {success && (

                <div className="auth-message auth-success">

              <span className="auth-message-icon">

                ✓

              </span>


                  <p>

                    {success}

                  </p>

                </div>

            )}


            {/* =================================================
              SUBMIT
          ================================================= */}

            <button
                type="button"

                className="auth-submit"

                onClick={
                  handleSubmit
                }

                disabled={
                  loading
                }
            >

              {loading ? (

                  <>

                    <span className="auth-loading-spinner" />

                    <span>

                  {isLogin
                      ? "Signing in..."
                      : "Creating account..."
                  }

                </span>

                  </>

              ) : (

                  <>

                <span>

                  {isLogin
                      ? "Sign In"
                      : "Create Account"
                  }

                </span>


                    <span className="submit-arrow">

                  →

                </span>

                  </>

              )}

            </button>

          </div>


          {/* =================================================
            SWITCH MODE
        ================================================= */}

          <div className="auth-footer">

            {isLogin ? (

                <>

              <span>

                New to GameHelper?

              </span>


                  <button
                      type="button"

                      onClick={() =>
                          switchMode(false)
                      }

                      disabled={
                        loading
                      }
                  >

                    Create account

                  </button>

                </>

            ) : (

                <>

              <span>

                Already have an account?

              </span>


                  <button
                      type="button"

                      onClick={() =>
                          switchMode(true)
                      }

                      disabled={
                        loading
                      }
                  >

                    Sign in

                  </button>

                </>

            )}

          </div>


          {/* =================================================
            SMALL INFO
        ================================================= */}

          <div className="auth-meta">

          <span>
            🎮 Build your library
          </span>

            <span className="auth-meta-divider">
            •
          </span>

            <span>
            👥 Connect with players
          </span>

            <span className="auth-meta-divider">
            •
          </span>

            <span>
            💬 Join the chat
          </span>

          </div>


          {/* =================================================
            DECORATION
        ================================================= */}

          <div className="auth-decoration">

            <span />

            <span />

            <span />

          </div>

        </div>

      </div>

  );

}


export default AuthModal;