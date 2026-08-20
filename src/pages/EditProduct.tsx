import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebaseConfig";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product not found.");
        setLoading(false);
        return;
      }

      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const data = productSnap.data();

          setTitle(data.title ?? "");
          setPrice(String(data.price ?? ""));
          setDescription(data.description ?? "");
          setCategory(data.category ?? "");
          setImage(data.image ?? "");
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        console.error(error);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const productRef = doc(db, "products", id);

      await updateDoc(productRef, {
        title,
        price: Number(price),
        description,
        category,
        image,
      });

      setMessage("Product updated successfully!");
    } catch (error) {
      console.error(error);
      setError("Unable to update product.");
    }
  };

  if (loading) {
    return <p className="status-message">Loading product...</p>;
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="section-label">PRODUCT MANAGEMENT</p>

        <h1>Edit Product</h1>

        <p className="auth-subtitle">Update this product's information.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="edit-title">Product Name</label>

            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-price">Price</label>

            <input
              id="edit-price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-category">Category</label>

            <input
              id="edit-category"
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-image">Image URL</label>

            <input
              id="edit-image"
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Description</label>

            <textarea
              id="edit-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>

          {error && <p className="auth-message auth-error">{error}</p>}

          {message && <p className="auth-message auth-success">{message}</p>}

          <button type="submit" className="auth-button">
            Save Changes
          </button>

          <button
            type="button"
            className="logout-button"
            onClick={() => navigate("/")}
          >
            Back to Products
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditProduct;
