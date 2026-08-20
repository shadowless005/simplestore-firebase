import { useState } from "react";
import type { FormEvent } from "react";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setMessage("Login successful!");

      setEmail("");
      setPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  const handleLogout = async () => {
    setError("");
    setMessage("");

    try {
      await signOut(auth);
      setMessage("Logged out successfully.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="section-label">WELCOME BACK</p>

        <h1>Login</h1>

        <p className="auth-subtitle">Sign in to your SimpleStore account.</p>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email">Email</label>

            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>

            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="auth-message auth-error">{error}</p>}

          {message && <p className="auth-message auth-success">{message}</p>}

          <button type="submit" className="auth-button">
            Login
          </button>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
