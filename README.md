# 🏡 RentNest Frontend

RentNest is a modern full-stack rental property management platform that connects **Tenants**, **Landlords**, and **Administrators** in one secure application. Users can browse rental properties, submit rental requests, complete online payments via Stripe, and manage properties through role-based dashboards.

---

## 🌐 Live Demo

* **Frontend:** https://rentnest-frontend-pi.vercel.app/
* **Backend:** https://rentnest-backend-green.vercel.app/
* **API Documentation:** See `API_INTEGRATION.md`

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* JWT authentication
* Refresh token support
* Secure HTTP-only cookie authentication
* Role-based authorization

### 👤 Tenant

* Browse available rental properties
* View detailed property information
* Submit rental requests
* Pay rent securely using Stripe Checkout
* View rental request status
* Manage personal profile

### 🏠 Landlord

* Create new property listings
* Edit existing properties
* Delete properties
* Review rental requests
* Approve or reject rental requests

### 🛡️ Admin

* Dashboard overview
* View platform statistics
* Manage users
* Activate/Block users
* Manage property categories

### 💳 Payment

* Stripe Checkout integration
* Secure online payment flow
* Payment status tracking

### 👤 Profile

* View personal information
* Update profile details

---

## 🛠️ Tech Stack

### Frontend

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide React
* Server Actions
* Sonner Toast

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Stripe API

---

## 📂 Project Structure

```text
app/
components/
services/
actions/
hooks/
types/
lib/
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone <frontend-repository-url>
```

```bash
cd rentnest-frontend
```

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### Run the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 📡 API Integration

The frontend communicates with the backend using a centralized service layer.

For detailed endpoint mappings, see:

```text
API_INTEGRATION.md
```

---

## 🔒 Authentication Flow

* User logs in with email and password.
* Backend issues Access Token and Refresh Token.
* Tokens are stored securely in HTTP-only cookies.
* Protected routes are accessible based on user roles.
* Expired access tokens are refreshed automatically.

---

## 📸 Screenshots

Add screenshots here before submission.

Example:

* Home Page
* Property Listing
* Property Details
* Tenant Dashboard
* Landlord Dashboard
* Admin Dashboard
* Stripe Checkout
* Profile Page

---

## 🔮 Future Improvements

* Cloudinary image upload
* Advanced property search and filters
* Wishlist / Favorites
* Email notifications
* Dashboard analytics
* Reviews and ratings
* Real-time notifications
* Responsive landing page redesign

---

## 👨‍💻 Author

**Md. Habibur Rahman**

---

## 📄 License

This project was developed for educational purposes as part of a full-stack web development assignment.
