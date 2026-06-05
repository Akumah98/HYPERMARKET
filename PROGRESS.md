# 🛒 HYPERMARKET — 15-Day Build Progress

> **Project**: FreshMarkt Hypermarket App (Cameroon)  
> **Stack**: Node.js + Express + MongoDB | React Native + Expo  
> **Started**: June 4, 2026  

---

## Overview

| Day | Phase | Status | Date Completed |
|-----|-------|--------|----------------|
| 1 | Backend Setup + Auth | ✅ Complete | June 4, 2026 |
| 2 | Product + Category APIs | ✅ Complete | June 4, 2026 |
| 3 | Cart + Order APIs | ✅ Complete | June 4, 2026 |
| 4 | Fapshi Payment Integration | ✅ Complete | June 4, 2026 |
| 5 | Vendor Dashboard APIs | ✅ Complete | June 4, 2026 |
| 6 | Expo Project + Navigation + Auth UI | ⬜ Not Started | — |
| 7 | Home Screen + Product Browsing UI | ⬜ Not Started | — |
| 8 | Product Details + Search UI | ⬜ Not Started | — |
| 9 | Cart + Checkout UI | ⬜ Not Started | — |
| 10 | Orders + Order Tracking UI | ⬜ Not Started | — |
| 11 | Vendor Dashboard UI | ⬜ Not Started | — |
| 12 | Profile + Settings UI | ⬜ Not Started | — |
| 13 | Push Notifications + Real-time | ⬜ Not Started | — |
| 14 | Polish, Animations, Edge Cases | ⬜ Not Started | — |
| 15 | Testing, Build, Deploy | ⬜ Not Started | — |

---

## Day 1 — Backend Setup + Auth Feature ✅

**Goal**: Initialize backend, config layer, middleware, and full auth feature.

### What was built

| Layer | Files | Description |
|-------|-------|-------------|
| Config | `env.js`, `db.js`, `cloudinary.js`, `fapshi.js` | Environment, DB, image upload, payment client |
| Middleware | `errorHandler.js`, `auth.js`, `roleCheck.js`, `validate.js`, `rateLimiter.js` | Error handling, JWT auth, RBAC, Joi validation, rate limiting |
| Utils | `apiError.js`, `apiResponse.js`, `pagination.js` | Custom errors, standardized responses, pagination |
| Auth Feature | `user.model.js`, `auth.validation.js`, `auth.service.js`, `auth.controller.js`, `auth.routes.js` | Full auth with register, login, profile |
| App | `app.js`, `server.js` | Express setup, entry point |
| Tests | `tests/auth.test.js` | 11 automated endpoint tests |
| **Total** | **20 source files** | All under 60 lines each |

### Architecture compliance

- ✅ Feature-based folder structure
- ✅ Separation of concerns (Model → Service → Controller → Route)
- ✅ No file over 100 lines
- ✅ No inline styles or mock data
- ✅ Custom error class + global error handler
- ✅ JWT auth + role-based access middleware

### Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/register` | No | Create account (customer/vendor) |
| POST | `/api/auth/login` | No | Login + get token |
| GET | `/api/auth/me` | Yes | Get current user profile |

### Test results — June 4, 2026

```
🧪 HYPERMARKET AUTH API TESTS
==================================================

📋 Health Check
  ✅ PASS: GET /api/health returns 200

📋 Registration
  ✅ PASS: Register customer succeeds
  ✅ PASS: Register vendor succeeds
  ✅ PASS: Duplicate email returns 409
  ✅ PASS: Invalid input returns 400

📋 Login
  ✅ PASS: Login with valid credentials succeeds
  ✅ PASS: Login with wrong password returns 401
  ✅ PASS: Login with non-existent email returns 401

📋 Protected Routes
  ✅ PASS: GET /api/auth/me with token returns profile
  ✅ PASS: GET /api/auth/me without token returns 401
  ✅ PASS: GET /api/auth/me with bad token returns 401

==================================================
📊 Results: 11 passed, 0 failed
==================================================
```

### Bug fixed during testing

- **Mongoose 7+ pre-save hook**: Async hooks no longer receive `next` callback. Fixed by removing `next()` calls and using plain `return` instead.

---

## Day 2 — Product + Category + Review APIs ✅

**Goal**: Full CRUD for categories, products with filtering/pagination, and product reviews.

### What was built

| Feature | Files | Description |
|---------|-------|-------------|
| Category | `category.model.js`, `category.validation.js`, `category.service.js`, `category.controller.js`, `category.routes.js` | CRUD with auto-slug, admin-only write |
| Product | `product.model.js`, `product.validation.js`, `product.query.service.js`, `product.write.service.js`, `product.read.controller.js`, `product.write.controller.js`, `product.routes.js` | Full CRUD, search, filter, sort, pagination, Cloudinary upload |
| Review | `review.model.js`, `review.validation.js`, `review.service.js`, `review.controller.js`, `review.routes.js` | Create/delete reviews, auto-recalculate product rating |
| Data | `data/data.json`, `data/seed.js` | 8 categories, 12 products, 4 reviews, 3 users |
| Tests | `tests/day2.test.js` | 17 automated endpoint tests |
| **Total** | **18 new files** | All under 70 lines each |

### Architecture compliance

- ✅ Feature-based folder structure (category/, product/, review/)
- ✅ Service split into query + write to stay under 100 lines
- ✅ Controller split into read + write for same reason
- ✅ All mock data in `data/data.json` (no inline data)
- ✅ Vendor ownership checks on product CRUD
- ✅ Admin-only category management

### New endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/categories` | No | List all categories |
| GET | `/api/categories/:slug` | No | Get category by slug |
| POST | `/api/categories` | Admin | Create category |
| PUT | `/api/categories/:id` | Admin | Update category |
| DELETE | `/api/categories/:id` | Admin | Delete category |
| GET | `/api/products` | No | List products (filter, sort, paginate) |
| GET | `/api/products/slug/:slug` | No | Get product by slug |
| GET | `/api/products/:id` | No | Get product by ID |
| GET | `/api/products/vendor/me` | Vendor | Get own products |
| POST | `/api/products` | Vendor | Create product |
| PUT | `/api/products/:id` | Vendor | Update own product |
| DELETE | `/api/products/:id` | Vendor | Delete own product |
| POST | `/api/products/:id/images` | Vendor | Upload images |
| GET | `/api/reviews/product/:id` | No | Get product reviews |
| POST | `/api/reviews` | Auth | Create review |
| DELETE | `/api/reviews/:id` | Auth | Delete own review |

### Test results — June 4, 2026

```
🧪 DAY 2: CATEGORY + PRODUCT + REVIEW TESTS
=======================================================

📋 Categories
  ✅ PASS: GET /categories returns seeded data
  ✅ PASS: GET /categories/:slug returns single
  ✅ PASS: POST /categories requires admin
  ✅ PASS: POST /categories works for admin

📋 Products
  ✅ PASS: GET /products returns paginated list
  ✅ PASS: GET /products filters by category
  ✅ PASS: GET /products sorts by price ascending
  ✅ PASS: GET /products/slug/:slug returns product
  ✅ PASS: POST /products creates as vendor
  ✅ PASS: POST /products blocked for customers
  ✅ PASS: PUT /products/:id updates own product
  ✅ PASS: GET /products/vendor/me returns vendor products
  ✅ PASS: DELETE /products/:id deletes own product

📋 Reviews
  ✅ PASS: POST /reviews creates review
  ✅ PASS: POST /reviews prevents duplicate
  ✅ PASS: GET /reviews/product/:id returns reviews
  ✅ PASS: Product rating updated after review

=======================================================
📊 Results: 17 passed, 0 failed
=======================================================
```

### Bugs fixed during testing

- **insertMany vs create**: `insertMany` bypasses Mongoose pre-save hooks, so slugs weren't generated. Fixed seed script to use `create()` in a loop.
- **Route ordering**: `/vendor/me` was placed after `/:id`, causing Express to match "vendor" as an ID. Moved it above `/:id`.

---

## Day 3 — Cart + Order APIs ✅

**Goal**: Full cart management and order lifecycle from cart-to-checkout.

### What was built

| Feature | Files | Description |
|---------|-------|-------------|
| Cart | `cart.model.js`, `cart.validation.js`, `cart.service.js`, `cart.controller.js`, `cart.routes.js` | Add/update/remove items, price snapshot, subtotals, 1500 XAF delivery fee |
| Order | `order.model.js`, `order.validation.js`, `order.helpers.js`, `order.create.service.js`, `order.query.service.js`, `order.controller.js`, `order.routes.js` | Create from cart, stock reduction, status tracking, cancel guard |
| Tests | `tests/day3.test.js` | 15 automated endpoint tests |
| **Total** | **12 new files** | All under 100 lines each |

### Architecture compliance

- ✅ Order service split into `create` and `query` for SRP
- ✅ Cart uses price snapshot to prevent price manipulation
- ✅ Stock validated on add-to-cart AND order creation
- ✅ Order ID format matches screenshots (#AFR-XXXXXX)
- ✅ Delivery fee waived for store pickup
- ✅ Cancel guard: only placed/processing orders can be cancelled

### New endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/cart` | Auth | Get cart with totals |
| POST | `/api/cart/items` | Auth | Add item to cart |
| PUT | `/api/cart/items/:id` | Auth | Update item quantity |
| DELETE | `/api/cart/items/:id` | Auth | Remove item from cart |
| DELETE | `/api/cart` | Auth | Clear cart |
| POST | `/api/orders` | Auth | Create order from cart |
| GET | `/api/orders` | Auth | List my orders (paginated) |
| GET | `/api/orders/:id` | Auth | Get order details |
| PUT | `/api/orders/:id/cancel` | Auth | Cancel own order |
| PUT | `/api/orders/:id/status` | Vendor/Admin | Update order status |

### Test results — June 4, 2026

```
🧪 DAY 3: CART + ORDER TESTS
=======================================================

📋 Cart
  ✅ PASS: GET /cart starts empty
  ✅ PASS: POST /cart/items adds product
  ✅ PASS: POST /cart/items adds second product
  ✅ PASS: POST /cart/items increments existing
  ✅ PASS: PUT /cart/items/:id updates quantity
  ✅ PASS: GET /cart shows totals
  ✅ PASS: Cart requires auth

📋 Orders
  ✅ PASS: POST /orders creates from cart
  ✅ PASS: Cart is empty after order
  ✅ PASS: POST /orders fails on empty cart
  ✅ PASS: GET /orders returns my orders
  ✅ PASS: GET /orders/:id returns single order
  ✅ PASS: PUT /orders/:id/status updates (vendor)
  ✅ PASS: PUT /orders/:id/cancel cancels order
  ✅ PASS: Cannot cancel delivered order

=======================================================
📊 Results: 15 passed, 0 failed
=======================================================
```

### Notes

- **Zero bugs on first run** — all 15 tests passed immediately.
- Order flow: Cart → Validate stock → Create order → Reduce stock → Clear cart
- Cumulative test count: **Day 1 (11) + Day 2 (17) + Day 3 (15) = 43 tests**

---

## Day 4 — Fapshi Payment Integration ✅

**Goal**: Integrate Fapshi Direct Pay (USSD Push MTN MoMo & Orange Money) and webhook callbacks.

### What was built

| Layer | Files | Description |
|-------|-------|-------------|
| Config | `fapshi.js` | Custom client implementing Fapshi SDK functions (`directPay`, `paymentStatus`) reading from environment |
| Payment Feature | `payment.validation.js`, `payment.service.js`, `payment.controller.js`, `payment.routes.js` | Joi validation, direct pay initiation, polling, secure webhook receiver |
| Order Integration | `app.js` | Mounted payment routes under `/api/payment` |
| **Total** | **5 updated/new files** | All strictly under 100 lines each (average ~45 lines) |

### Architecture compliance

- ✅ Standard MVC/Service structure for payments
- ✅ Fapshi configuration fully decoupled and using process.env
- ✅ Custom Joi validators for Cameroonian MoMo/Orange Money phone formats (`6[\d]{8}`)
- ✅ Double-verification of webhooks (calls Fapshi payment status API to prevent status spoofing)
- ✅ Automatic stock reservation during checkout (managed in Day 3 order creation) with order status transitions on payment success (`paid`, `processing`)

### New endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/payment/initiate` | Yes | Triggers Fapshi direct pay for an order, returns `transId` |
| GET | `/api/payment/status/:transId` | Yes | Polls payment status from database/Fapshi |
| POST | `/api/payment/webhook` | No | Asynchronous callback handler from Fapshi |

### Webhook Verification Flow

1. Fapshi server triggers POST request to `/api/payment/webhook` with `{ transId }`.
2. Backend catches webhook and immediately queries Fapshi's official `GET /payment-status/{transId}` endpoint to verify authenticity.
3. If Fapshi returns `SUCCESSFUL`, order is marked `paid`, and order status updates to `processing` (notifying vendor).
4. If Fapshi returns `FAILED` or `EXPIRED`, order is marked `failed`.

---

## Day 5 — Vendor & Admin APIs + Push Notifications ✅

**Goal**: Complete backend development, implement vendor dashboard metrics, admin overview statistics, and integrate Expo push notifications for order status transitions.

### What was built

| Layer | Files | Description |
|-------|-------|-------------|
| Vendor Feature | `vendor.service.js`, `vendor.controller.js`, `vendor.routes.js` | Calculated vendor revenue, orders count, top selling products. Fetches vendor's products and orders. |
| Admin Feature | `admin.service.js`, `admin.controller.js`, `admin.routes.js` | Fetches platform metrics (total users, orders, revenue, active products), all users, all orders (paginated). |
| Notification Feature | `notification.validation.js`, `notification.service.js`, `notification.controller.js`, `notification.routes.js` | Saves Expo push tokens. Implements push alerts sent directly to users via Expo's HTTP API. |
| Order Integration | `order.query.service.js` | Integrated `sendPush` into `updateOrderStatus` so buyers receive real-time push messages on status changes. |
| App Routing | `app.js` | Mounted new routes under `/api/vendor`, `/api/admin`, and `/api/notifications`. |
| **Total** | **11 new/modified files** | Fully aligned with modular, single-responsibility, and under-100-line guidelines. |

### Architecture compliance

- ✅ Clean feature-based co-location (`vendor/`, `admin/`, `notification/`)
- ✅ Security: Only authenticated vendors can fetch vendor stats; only admins can query platform reports.
- ✅ Silent fail safety: Expo Push API errors (e.g. invalid tokens or network issues) are caught and logged without crashing request lifecycles.
- ✅ Average line count across new files: ~40 lines.

### New endpoints

| Method | Path | Auth | Role | Description |
|--------|------|------|------|-------------|
| GET | `/api/vendor/products` | Yes | Vendor | List own products |
| GET | `/api/vendor/orders` | Yes | Vendor | List orders containing own products |
| GET | `/api/vendor/stats` | Yes | Vendor | Total revenue, completed sales, and top products |
| GET | `/api/admin/users` | Yes | Admin | List all users on the platform |
| GET | `/api/admin/orders` | Yes | Admin | List all orders on the platform |
| GET | `/api/admin/stats` | Yes | Admin | Total platform users, orders, products, and revenue |
| POST | `/api/notifications/register` | Yes | Any | Save Expo push token to User document |

---

### Test results — June 4, 2026

```
🧪 DAY 4: FAPSHI PAYMENT INTEGRATION TESTS
=======================================================
  ✅ PASS: POST /api/payment/initiate fails on invalid phone
  ✅ PASS: POST /api/payment/initiate succeeds with valid payload
  ✅ PASS: GET /api/payment/status/:transId returns status & updates order
  ✅ PASS: POST /api/payment/webhook updates order status

🧪 DAY 5: VENDOR & ADMIN APIS + NOTIFICATIONS TESTS
=======================================================
  ✅ PASS: POST /api/notifications/register saves push token
  ✅ PASS: GET /api/vendor/products lists vendor products
  ✅ PASS: GET /api/vendor/orders lists vendor orders
  ✅ PASS: GET /api/vendor/stats returns vendor sales metrics
  ✅ PASS: GET /api/admin/users lists all users for admin
  ✅ PASS: GET /api/admin/orders lists all orders for admin
  ✅ PASS: GET /api/admin/stats returns platform reports
  ✅ PASS: GET /api/admin/stats blocked for customers

=======================================================
📊 Results: 12 passed, 0 failed
=======================================================
```

### Cumulative stats
- Cumulative test count: **Day 1 (11) + Day 2 (17) + Day 3 (15) + Day 4 (4) + Day 5 (8) = 55 tests**
- Cumulative source files: **66 backend JS source files (all under 100 lines each!)**

---


