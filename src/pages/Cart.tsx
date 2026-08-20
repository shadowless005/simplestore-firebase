import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import type { RootState, AppDispatch } from "../redux/store";

import { clearCart } from "../redux/cartSlice";
import CartItem from "../components/CartItem";

import { auth, db } from "../firebaseConfig";

const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items);

  const dispatch = useDispatch<AppDispatch>();

  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    const user = auth.currentUser;

    setCheckoutMessage("");
    setCheckoutError("");

    if (!user) {
      setCheckoutError("You must be logged in to place an order.");
      return;
    }

    if (items.length === 0) {
      setCheckoutError("Your cart is empty.");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        userEmail: user.email,
        items,
        totalItems,
        totalPrice,
        createdAt: serverTimestamp(),
      });

      dispatch(clearCart());

      setCheckoutMessage("Order placed successfully!");
    } catch (error) {
      console.error(error);

      setCheckoutError("Unable to place your order.");
    }
  };

  return (
    <main className="cart-page">
      <section className="cart-header">
        <div>
          <p className="section-label">YOUR ORDER</p>

          <h1>Shopping Cart</h1>

          <p className="cart-subtitle">Review your items before checkout.</p>
        </div>

        {items.length > 0 && (
          <div className="cart-item-count">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </div>
        )}
      </section>

      {checkoutMessage && (
        <div className="checkout-message">{checkoutMessage}</div>
      )}

      {checkoutError && (
        <div className="auth-message auth-error">{checkoutError}</div>
      )}

      {items.length === 0 ? (
        <section className="empty-cart">
          <div className="empty-cart-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="20" r="1" />
              <circle cx="19" cy="20" r="1" />
              <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
            </svg>
          </div>

          <h2>Your cart is empty</h2>

          <p>Add some products to your cart and they’ll appear here.</p>

          <a href="/#products" className="continue-shopping-button">
            Continue Shopping
          </a>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </section>

          <aside className="cart-summary">
            <p className="summary-label">ORDER SUMMARY</p>

            <h2>Summary</h2>

            <div className="summary-row">
              <span>Products</span>
              <strong>{totalItems}</strong>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>

              <strong>${totalPrice.toFixed(2)}</strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <strong>Free</strong>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>

              <strong>${totalPrice.toFixed(2)}</strong>
            </div>

            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>

            <p className="secure-checkout-text">Secure checkout</p>
          </aside>
        </div>
      )}
    </main>
  );
};

export default Cart;
