import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

import { auth } from "./firebaseConfig";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetails";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar user={user} />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/add"
            element={
              <ProtectedRoute user={user}>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/edit/:id"
            element={
              <ProtectedRoute user={user}>
                <EditProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute user={user}>
                <OrderHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute user={user}>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
        </Routes>

        {user && (
          <div className="auth-status">
            Signed in as <strong>{user.email}</strong>
          </div>
        )}

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
