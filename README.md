# SimpleStore

SimpleStore is an e-commerce web application built with React and TypeScript. Users can browse products, search by name, filter by category, add items to their cart, update quantities, and complete a checkout.

## Features

- Browse products
- Search products
- Filter by category
- Shopping cart
- Update item quantities
- Remove items from cart
- Simulated checkout clears the Redux cart and its sessionStorage entry
- Checkout success feedback
- Same-tab cart persistence with sessionStorage
- Product ratings, descriptions, and image fallbacks
- API-loaded category dropdown and category-specific product requests

## Technologies Used

- React
- TypeScript
- Redux Toolkit
- React Query
- React Router
- Axios
- CSS

## Installation

Clone the repository:

```bash
git clone https://github.com/shadowless005/simplestore.git
cd simplestore
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

## Author

Matt Shin
Coding Temple Software Engineering Bootcamp

## How It Works

React Query fetches products and categories from FakeStoreAPI. Redux Toolkit manages cart items and quantities. The cart is saved as an array of product objects in sessionStorage and restored on same-tab refresh. Totals update as quantities change. Checkout is a simulation; it does not process payments or create server-side orders.

## Validation

```bash
npm run build
npm run lint
```
