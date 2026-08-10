# Aura Store — Modern Full-Stack MERN E-Commerce Platform

A feature-complete, modern full-stack MERN e-commerce application inspired by major retail platforms, with original branding ("Aura Store"), dynamic filtering/search, multi-step checkout, cash-on-delivery & Stripe payments, complete authentication with roles (User & Admin), customer reviews, promotional coupons, user account tracking, and an analytical admin management suite.

---

## 🌟 Highlights & Key Features

### 🛒 Customer Storefront
- **Modern Responsive Design**: Built with Tailwind CSS, Lucide icons, glassmorphism elements, and smooth dynamic micro-animations.
- **Dynamic Search & Autocomplete**: Real-time search suggestions modal with instantaneous API feedback.
- **Comprehensive Multi-Facet Filtering**: Filter products by Category, Brand, Price Range Slider, Minimum Rating, Discount %, Availability, and Sort by Low/High price, Popularity, or Newest.
- **Product Details & Pincode Checker**: Multi-image zoom gallery, stock availability tracker, live pincode delivery estimator, specifications table, and verified customer reviews.
- **Cart & Coupon System**: Real-time quantity controls, stock validation, and coupon code support (`AURA20`, `WELCOME100`).
- **Multi-Step Checkout**:
  - Step 1: Select / Add Address
  - Step 2: Order Summary
  - Step 3: Cash on Delivery or Stripe Payment Gateway

### 🔐 User Portal
- **Authentication**: JWT Auth via HTTP-Only Cookies & Bearer Headers, `bcryptjs` password hashing.
- **Order Tracking Timeline**: Interactive visual timeline tracking order fulfillment status (`Pending` ➔ `Confirmed` ➔ `Processing` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`).
- **Wishlist & Address Book**: Save favorite products and manage multiple shipping destinations.

### ⚡ Admin Suite (`admin@aura.com`)
- **Executive Dashboard**: Aggregate statistics (Total Revenue, Orders, Products, Users, Low Stock Alerts) with Recharts visual revenue charts.
- **Product Catalog Management**: Full CRUD capability, featured / bestseller toggles, stock adjustments.
- **Order Fulfillment Manager**: Update customer order status directly.
- **User Access Control**: Change user roles (`user` / `admin`), block/unblock accounts.
- **Coupon Manager**: Create, toggle, or delete promo discount codes.

---

## 🔑 Demo Account Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@aura.com` | `password123` | Full Admin Dashboard & Storefront |
| **User** | `user@aura.com` | `password123` | Customer Storefront, Cart, Orders, Checkout |

**Active Promo Coupons:**
- `AURA20`: 20% OFF on orders over ₹1,000
- `WELCOME100`: ₹500 OFF on orders over ₹2,000

---

## 🚀 Quick Setup Instructions

### 1. Install Backend Dependencies & Start Server
```bash
cd backend
npm install
npm run seed   # (Optional) Seed demo products & accounts
npm run dev    # Starts API server on http://localhost:5000
```
> **Note**: The backend automatically falls back to an in-memory MongoDB database (`mongodb-memory-server`) if a local MongoDB service is not detected.

### 2. Install Frontend Dependencies & Start App
```bash
cd frontend
npm install
npm run dev    # Starts Vite web app on http://localhost:5173
```

---

## 📁 Directory Structure

```
ecommerce/
├── backend/
│   ├── src/
│   │   ├── config/ (db.js with MongoMemoryServer fallback)
│   │   ├── controllers/ (auth, product, category, cart, wishlist, order, review, coupon, admin, payment)
│   │   ├── middleware/ (authMiddleware, errorMiddleware)
│   │   ├── models/ (User, Product, Category, Cart, Wishlist, Order, Review, Coupon)
│   │   ├── routes/ (auth, product, category, cart, wishlist, order, review, coupon, admin, payment)
│   │   ├── utils/ (seedData.js, generateToken.js)
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/ (Navbar, Footer, ProductCard, QuickViewModal, ProtectedRoute, AdminRoute)
    │   ├── context/ (AuthContext, CartContext, WishlistContext)
    │   ├── pages/ (public, user, admin)
    │   ├── services/ (api.js)
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```
