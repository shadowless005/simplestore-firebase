import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebaseConfig";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: OrderItem[];
  totalItems: number;
  totalPrice: number;
  createdAt?: {
    toDate: () => Date;
  };
}

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        setError("Order not found.");
        setLoading(false);
        return;
      }

      try {
        const orderRef = doc(db, "orders", id);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          setOrder({
            id: orderSnap.id,
            ...orderSnap.data(),
          } as Order);
        } else {
          setError("Order not found.");
        }
      } catch (error) {
        console.error(error);
        setError("Unable to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <p className="status-message">Loading order...</p>;
  }

  if (error || !order) {
    return (
      <main className="orders-page">
        <p className="auth-message auth-error">{error || "Order not found."}</p>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-header">
        <p className="section-label">ORDER DETAILS</p>

        <h1>Order #{order.id.slice(0, 8)}</h1>

        <p>
          Placed{" "}
          {order.createdAt
            ? order.createdAt.toDate().toLocaleDateString()
            : "recently"}
        </p>
      </div>

      <div className="order-details-card">
        <div className="order-details-top">
          <div>
            <span className="order-detail-label">Order ID</span>
            <strong>{order.id}</strong>
          </div>

          <div>
            <span className="order-detail-label">Email</span>
            <strong>{order.userEmail}</strong>
          </div>
        </div>

        <div className="order-items-list">
          {order.items.map((item) => (
            <div key={item.id} className="order-item">
              <div className="order-item-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="order-item-image"
                  onError={(event) => {
                    event.currentTarget.src =
                      "https://via.placeholder.com/100?text=No+Image";
                  }}
                />
              </div>

              <div className="order-item-info">
                <h2>{item.title}</h2>

                <p>Quantity: {item.quantity}</p>

                <p>${item.price.toFixed(2)} each</p>
              </div>

              <strong className="order-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}
        </div>

        <div className="order-details-summary">
          <div>
            <span>Total Items</span>
            <strong>{order.totalItems}</strong>
          </div>

          <div>
            <span>Total Price</span>
            <strong>${order.totalPrice.toFixed(2)}</strong>
          </div>
        </div>

        <Link to="/orders" className="edit-product-button">
          Back to Order History
        </Link>
      </div>
    </main>
  );
};

export default OrderDetails;
