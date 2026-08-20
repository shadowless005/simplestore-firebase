import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import { auth, db } from "../firebaseConfig";

interface Order {
  id: string;
  totalPrice: number;
  totalItems: number;
  createdAt?: {
    toDate: () => Date;
  };
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;

      if (!user) {
        setError("You must be logged in to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(ordersQuery);

        const userOrders = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        })) as Order[];

        setOrders(userOrders);
      } catch (error) {
        console.error(error);
        setError("Unable to load order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="status-message">Loading orders...</p>;
  }

  return (
    <main className="orders-page">
      <div className="orders-header">
        <p className="section-label">YOUR PURCHASES</p>

        <h1>Order History</h1>

        <p>View your previous SimpleStore orders.</p>
      </div>

      {error && <p className="auth-message auth-error">{error}</p>}

      {!error && orders.length === 0 && (
        <div className="no-products">
          <h2>No orders yet</h2>
          <p>Your completed orders will appear here.</p>
        </div>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="order-card"
          >
            <div>
              <p className="order-id">Order #{order.id.slice(0, 8)}</p>

              <p className="order-date">
                {order.createdAt
                  ? order.createdAt.toDate().toLocaleDateString()
                  : "Processing date..."}
              </p>
            </div>

            <div className="order-card-right">
              <span>
                {order.totalItems} {order.totalItems === 1 ? "item" : "items"}
              </span>

              <strong>${order.totalPrice.toFixed(2)}</strong>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default OrderHistory;
