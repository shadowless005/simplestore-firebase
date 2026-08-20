import { useState } from "react";
import type { FormEvent } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebaseConfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: "",
        address: "",
      });

      setSuccessMessage("Registration successful!");

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

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="section-label">CREATE ACCOUNT</p>

        <h1>Register</h1>

        <p className="auth-subtitle">Create your SimpleStore account.</p>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="register-email">Email</label>

            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>

            <input
              id="register-password"
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="auth-message auth-error">{error}</p>}

          {successMessage && (
            <p className="auth-message auth-success">{successMessage}</p>
          )}

          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
