# API_INTEGRATION.md

# RentNest Frontend API Integration

This document describes how the frontend consumes the backend REST API.

---

## Base URL

Production:

```text
https://rentnest-backend-green.vercel.app/api
```

Development:

```text
http://localhost:5000/api

```

The frontend uses:

```env
NEXT_PUBLIC_API_BASE_URL=https://rentnest-backend-green.vercel.app/api
```

---

# Authentication

| Frontend Feature | Endpoint              | Method |
| ---------------- | --------------------- | ------ |
| Register         | `/auth/register`      | POST   |
| Login            | `/auth/login`         | POST   |
| Logout           | `/auth/logout`        | POST   |
| Current User     | `/auth/me`            | GET    |

Used in:

* Login Page
* Register Page
* Navbar
* Dashboard Layout
* Profile Page

---

# Properties

| Frontend Feature | Endpoint                   | Method |
| ---------------- | -------------------------- | ------ |
| Property List    | `/properties`              | GET    |
| Property Details | `/properties/:id`          | GET    |
| Create Property  | `/landlord/properties`     | POST   |
| Update Property  | `/landlord/properties/:id` | PATCH  |
| Delete Property  | `/landlord/properties/:id` | DELETE |
| My Properties    | `/landlord/properties`     | GET    |

Used in:

* Home
* Properties Page
* Property Details
* Landlord Dashboard

---

# Categories

| Frontend Feature | Endpoint          | Method |
| ---------------- | ----------------- | ------ |
| Get Categories   | `/categories`     | GET    |
| Create Category  | `/categories`     | POST   |
| Update Category  | `/categories/:id` | PATCH  |
| Delete Category  | `/categories/:id` | DELETE |

Used in:

* Property Form
* Admin Categories

---

# Rental Requests

| Frontend Feature         | Endpoint                        | Method |
| ------------------------ | ------------------------------- | ------ |
| Create Rental Request    | `/rental-requests`              | POST   |
| Tenant Rental Requests   | `/tenant/rental-requests`       | GET    |
| Landlord Rental Requests | `/landlord/rental-requests`     | GET    |
| Update Rental Status     | `/landlord/rental-requests/:id` | PATCH  |

Used in:

* Property Details
* Tenant Dashboard
* Landlord Dashboard

---

# Payments

| Frontend Feature        | Endpoint                                | Method |
| ----------------------- | --------------------------------------- | ------ |
| Create Checkout Session | `/payments/create-checkout-session/:id` | POST   |
| Stripe Webhook          | `/payments/webhook`                     | POST   |

Used in:

* Tenant Payment Page
* Payment Success Page
* Payment Cancel Page

---

# User Profile

| Frontend Feature | Endpoint         | Method |
| ---------------- | ---------------- | ------ |
| Get Profile      | `/auth/me`       | GET    |
| Update Profile   | `/users/profile` | PATCH  |

Used in:

* Profile Page
* Edit Profile Dialog

---

# Admin

## Dashboard Statistics

| Endpoint                 | Method |
| ------------------------ | ------ |
| `/admin/dashboard-stats` | GET    |

Used in:

* Admin Dashboard

---

## Users

| Endpoint           | Method |
| ------------------ | ------ |
| `/admin/users`     | GET    |
| `/admin/users/:id` | PATCH  |

Used in:

* User Management
* Admin Dashboard

---

# Authentication Strategy

* JWT Authentication
* Access Token stored in HTTP-only cookies
* Refresh Token support
* Role-based authorization
* Protected routes for Admin, Landlord, and Tenant dashboards

---

# Frontend Technologies

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* shadcn/ui
* Server Actions
* Lucide React
* React Hook Form
* Sonner Toast

---

# Backend Technologies

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Stripe Checkout
* Cloudinary (planned)

---

# Notes

* All protected API requests include authentication via HTTP-only cookies.
* Dashboard pages use server-side rendering with authenticated requests.
* Stripe Checkout is initiated from the frontend and completed through the backend webhook.
* The frontend communicates with the backend using a centralized service layer and Server Actions.
