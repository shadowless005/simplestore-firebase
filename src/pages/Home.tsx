import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchProductsFromFirestore } from "../services/productService";

import type { Product } from "../types/Product";

import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProductsFromFirestore,
  });

  const categories = [
    ...new Set(products?.map((product) => product.category) ?? []),
  ];

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return <p className="status-message">Loading products...</p>;
  }

  if (error) {
    return (
      <p className="status-message error-message">Error loading products.</p>
    );
  }

  return (
    <main className="store-page" id="products">
      <section className="catalog-intro">
        <div className="catalog-heading">
          <p className="section-label">OUR COLLECTION</p>

          <h1>Product Catalog</h1>

          <p className="catalog-description">
            Browse our curated selection of high-quality products.
          </p>
        </div>

        <div className="product-count">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 7V6a6 6 0 0 1 12 0v1" />
            <path d="M4 7h16l1 14H3L4 7z" />
          </svg>

          <span>{filteredProducts?.length ?? 0} Products</span>
        </div>
      </section>

      <section className="store-controls" id="store-controls">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        <div className="search-container">
          <div className="control-label">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <label htmlFor="search">Search Products:</label>
          </div>

          <input
            id="search"
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </section>

      {filteredProducts?.length === 0 ? (
        <div className="no-products">
          <h2>No products found</h2>
          <p>Try a different search or category.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
