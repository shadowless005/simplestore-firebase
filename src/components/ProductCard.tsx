import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { addToCart } from "../redux/cartSlice";
import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      }),
    );
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          onError={(event) => {
            event.currentTarget.src =
              "https://via.placeholder.com/300?text=No+Image";
          }}
        />
      </div>

      <div className="product-content">
        <p className="product-category">{product.category}</p>

        <h2>{product.title}</h2>

        <div className="rating-row">
          <span className="rating-stars">★</span>

          <span>{product.rating.rate.toFixed(1)}</span>

          <span className="rating-count">({product.rating.count} reviews)</span>
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <p className="product-price">${product.price.toFixed(2)}</p>

          <button
            type="button"
            onClick={handleAddToCart}
            className="add-cart-button"
          >
            <svg
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
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
