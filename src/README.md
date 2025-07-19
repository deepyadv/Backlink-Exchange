# 🌐 Guest Posting Platform

A full-featured MERN stack application that connects **buyers** and **sellers** of guest post services. The platform enables sellers to list websites and buyers to purchase guest posts, with real-time chat, order management, and admin controls.

---

## 📌 Features

### 👥 User System
- Buyer & Seller registration
- Role-based access (Buyer, Seller, Admin)
- Profile settings and authentication (JWT)

### 🖥️ Website Listings (for Sellers)
- Add websites with:
  - URL, Domain Authority, Traffic, Language, Categories, Price
- Upload website images (Cloudinary)
- Edit/delete listings from seller dashboard

### 💸 Order & Payments
- Buyers can:
  - Browse listings
  - Buy guest post (Razorpay integration)
- Order status: Pending, Complete
- Order details view in dashboard

### 💬 Real-time Chat (Socket.IO)
- End-to-end chat between Buyer & Seller (post-order)
- Unread message notification
- Message history stored in MongoDB
- Optimistic UI & auto-scroll

### 📊 Admin Dashboard
- Manage users, websites, and orders
- Delete spam content
- View analytics:
  - Total revenue
  - Top websites
  - Orders by month
  - Websites by category

---

## ⚙️ Tech Stack

| Layer         | Tech Stack                    |
|---------------|-------------------------------|
| **Frontend**  | React, Redux Toolkit, Tailwind |
| **Backend**   | Node.js, Express              |
| **Database**  | MongoDB + Mongoose            |
| **Real-time** | Socket.IO                     |
| **Payments**  | Razorpay                      |
| **Image Upload** | Cloudinary                |
| **Auth**      | JWT (JSON Web Tokens)         |

---


