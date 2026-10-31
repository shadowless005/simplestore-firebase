import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";

import type { CartItem as CartItemType } from "../redux/cartSlice";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <article className="cart-item">
      <div className="cart-item-image-wrapper">
        <img
          src={item.image}
          alt={item.title}
          className="cart-item-image"
          onError={(event) => {
            event.currentTarget.src =
              "https://via.placeholder.com/150?text=No+Image";
          }}
        />
      </div>

      <div className="cart-item-info">
        <div className="cart-item-top">
          <div>
            <h2>{item.title}</h2>

            <p className="cart-item-unit-price">
              ${item.price.toFixed(2)} each
            </p>
          </div>

          <button
            className="remove-button"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </button>
        </div>

        <div className="cart-item-bottom">
          <div className="quantity-section">
            <span className="quantity-label">Quantity</span>

            <div className="quantity-controls">
              <button
                aria-label="Decrease quantity"
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                aria-label="Increase quantity"
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                +
              </button>
            </div>
          </div>

          <div className="cart-item-subtotal">
            <span>Subtotal</span>

            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
