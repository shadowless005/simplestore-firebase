# SimpleStore

SimpleStore is a full-stack e-commerce application built with React, TypeScript, Redux Toolkit, React Query, and Firebase. It uses Firebase Authentication and Firestore to provide secure user authentication, product management, shopping cart functionality, and order management.

## Features

- User registration and login with Firebase Authentication
- User profile management (Create, Read, Update, Delete)
- Browse products from Firestore
- Search products
- Filter products by category
- Add new products
- Edit existing products
- Delete products
- Shopping cart with quantity management
- Demonstration checkout that saves orders (no payment processing)
- Store orders in Firestore
- View order history
- View order details
- Responsive design

## Technologies Used

- React
- TypeScript
- Redux Toolkit
- React Query
- React Router
- Firebase Authentication
- Firestore
- CSS

## Installation

Clone the repository:

```bash
git clone https://github.com/shadowless005/simplestore-firebase.git
cd simplestore-firebase
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

Matthew Shin  
Coding Temple Software Engineering Bootcamp

## Firebase setup and demo checks

Configure your Firebase web app in `src/firebaseConfig.ts`. Enable Email/Password Authentication and create a Firestore database. Product documents contain title, numeric price, description, category, image URL, and rating with numeric rate and count. Use Add Product to create demo products.

Firestore rules must permit the intended product reads/writes, restrict user profiles to their owner, and restrict order reads/deletes to the matching userId. Client-side route checks are not a substitute for database rules. Live rules are configured separately and are not verified by the local build.

Before recording, use a disposable account to check registration, logout/login, profile update, product create/edit/delete, checkout, and order history/details. Account deletion requires the current password and removes the user's orders and profile before deleting the Authentication account. These services cannot be deleted in one atomic operation; partial failure is reported and can require retrying. Shared catalog products are retained.
