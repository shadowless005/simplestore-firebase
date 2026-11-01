import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore";

import { auth, db } from "../firebaseConfig";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);

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

    if (!user.email || !deletePassword) {
      setError("Enter your current password before deleting your account.");
      return;
    }

    const confirmed = window.confirm(
      "Permanently delete your account, profile, and order history?",
    );

    if (!confirmed) {
      return;
    }

    setMessage("");
    setError("");

    setDeleting(true);
    try {
      // Verify the password before deleting any stored data.
      await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, deletePassword),
      );
      const profileRef = doc(db, "users", user.uid);
      const profileSnapshot = await getDoc(profileRef);
      const orders = await getDocs(query(
        collection(db, "orders"), where("userId", "==", user.uid),
      ));
      // Keep each write batch below Firestore's operation limit.
      for (let offset = 0; offset < orders.docs.length; offset += 400) {
        const batch = writeBatch(db);
        orders.docs.slice(offset, offset + 400).forEach((order) => batch.delete(order.ref));
        await batch.commit();
      }
      await deleteDoc(profileRef);
      try {
        await deleteUser(user);
      } catch (authError) {
        // Restore the profile if Authentication deletion fails.
        if (profileSnapshot.exists()) {
          await setDoc(profileRef, profileSnapshot.data());
        }
        throw authError;
      }
      sessionStorage.removeItem("cart");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Account deletion did not finish. Check your password and connection, then retry. Some order data may already have been removed.");
    } finally {
      setDeleting(false);
      setDeletePassword("");
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

          <label htmlFor="delete-password">Current password (only for account deletion)</label>
          <input id="delete-password" type="password" autoComplete="current-password"
            value={deletePassword} onChange={(event) => setDeletePassword(event.target.value)} />
          <button
            type="button"
            disabled={deleting}
            className="delete-account-button"
            onClick={handleDeleteAccount}
          >
            {deleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
