import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import type { User } from "firebase/auth";

import type { RootState } from "../redux/store";
import { auth } from "../firebaseConfig";

interface NavbarProps {
  user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const items = useSelector((state: RootState) => state.cart.items);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <div className="brand-logo">
            <span className="brand-simple">Simple</span>
            <span className="brand-store">Store</span>
          </div>

          <p className="brand-tagline">
            Shop Smarter. Shop <span>Simple.</span>
          </p>
        </NavLink>

        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Home
          </NavLink>

          <a href="/#products" className="nav-link">
            Products
          </a>

          <a href="/#store-controls" className="nav-link">
            Categories
          </a>

          {user ? (
            <>
              <NavLink
                to="/products/add"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Add Product
              </NavLink>

              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Orders
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        <div className="nav-actions">
          {user && (
            <button
              type="button"
              className="navbar-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "cart-link active-cart" : "cart-link"
            }
          >
            <svg
              className="cart-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="20" r="1" />
              <circle cx="19" cy="20" r="1" />
              <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
            </svg>

            <span>Cart</span>

            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
