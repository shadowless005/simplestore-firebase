import axios from "axios";

const BASE_URL = "https://fakestoreapi.com/products";

// Get all products
export const fetchProducts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Get all categories
export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data;
};

// Get products by category
export const fetchProductsByCategory = async (category: string) => {
  const response = await axios.get(`${BASE_URL}/category/${category}`);
  return response.data;
};

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
