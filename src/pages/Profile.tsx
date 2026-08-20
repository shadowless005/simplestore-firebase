import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteUser } from "firebase/auth";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

import { auth, db } from "../firebaseConfig";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;

      if (!user) {
        setError("You must be logged in to view your profile.");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          setEmail(data.email ?? user.email ?? "");
          setName(data.name ?? "");
          setAddress(data.address ?? "");
        } else {
          setError("User profile not found.");
        }
      } catch (error) {
        console.error(error);
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    const user = auth.currentUser;

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    setMessage("");
    setError("");

    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        name,
        address,
      });

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      setError("Unable to update profile.");
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account?",
    );

    if (!confirmed) {
      return;
    }

    setMessage("");
    setError("");

    try {
      await deleteDoc(doc(db, "users", user.uid));

      await deleteUser(user);

      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Unable to delete account.");
    }
  };

  if (loading) {
    return <p className="status-message">Loading profile...</p>;
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="section-label">YOUR ACCOUNT</p>

        <h1>Profile</h1>

        <p className="auth-subtitle">
          View and update your account information.
        </p>

        {error && <p className="auth-message auth-error">{error}</p>}

        {message && <p className="auth-message auth-success">{message}</p>}

        <div className="auth-form">
          <div className="form-group">
            <label htmlFor="profile-email">Email</label>

            <input id="profile-email" type="email" value={email} disabled />
          </div>

          <div className="form-group">
            <label htmlFor="profile-name">Name</label>

            <input
              id="profile-name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="profile-address">Address</label>

            <input
              id="profile-address"
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>

          <button type="button" className="auth-button" onClick={handleUpdate}>
            Update Profile
          </button>

          <button
            type="button"
            className="delete-account-button"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
