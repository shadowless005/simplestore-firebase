import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";

import type { AppDispatch } from "../redux/store";
import { addToCart } from "../redux/cartSlice";
import type { Product } from "../types/Product";

import { auth, db } from "../firebaseConfig";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  const user = auth.currentUser;

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

  const handleDeleteProduct = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, "products", product.id));

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    } catch (error) {
      console.error(error);
      alert("Unable to delete product.");
    }
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

          {user && (
            <>
              <Link
                to={`/products/edit/${product.id}`}
                className="edit-product-button"
              >
                Edit Product
              </Link>

              <button
                type="button"
                className="delete-product-button"
                onClick={handleDeleteProduct}
              >
                Delete Product
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
