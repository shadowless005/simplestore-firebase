import { useState } from "react";
import type { FormEvent } from "react";

import { addDoc, collection } from "firebase/firestore";

import { db } from "../firebaseConfig";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      await addDoc(collection(db, "products"), {
        title,
        price: Number(price),
        description,
        category,
        image,

        rating: {
          rate: 0,
          count: 0,
        },
      });

      setMessage("Product added successfully!");

      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");
    } catch (error) {
      console.error(error);
      setError("Unable to add product.");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="section-label">PRODUCT MANAGEMENT</p>

        <h1>Add Product</h1>

        <p className="auth-subtitle">Add a new product to SimpleStore.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="product-title">Product Name</label>

            <input
              id="product-title"
              type="text"
              placeholder="Product name"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-price">Price</label>

            <input
              id="product-price"
              type="number"
              step="0.01"
              min="0"
              placeholder="29.99"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-category">Category</label>

            <input
              id="product-category"
              type="text"
              placeholder="electronics"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-image">Image URL</label>

            <input
              id="product-image"
              type="url"
              placeholder="https://example.com/product.jpg"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-description">Description</label>

            <textarea
              id="product-description"
              placeholder="Enter product description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>

          {error && <p className="auth-message auth-error">{error}</p>}

          {message && <p className="auth-message auth-success">{message}</p>}

          <button type="submit" className="auth-button">
            Add Product
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddProduct;
