# Online Hypermarket Commercial Center — 15-Day Implementation Plan

> Refined plan aligned with coding rules • Fapshi payments (MTN MoMo / Orange Money) • Feature-based architecture

---

## 1. PROJECT OVERVIEW

Build a cross-platform (Android + iOS) online hypermarket mobile app in 15 days using only free-tier services. Customers browse products, add to cart, pay via Mobile Money (Fapshi), and track orders. Vendors manage products and fulfill orders. Admins oversee the platform.

### 1.1 Core MVP Features

| Feature | Description |
|---|---|
| **Authentication** | Register, login, logout with JWT. Roles: Customer, Vendor, Admin |
| **Product Catalog** | Browse by category, search, filter. Pagination |
| **Product Details** | Images, description, price, stock, reviews |
| **Shopping Cart** | Persistent cart tied to user account |
| **Checkout & Payment** | Fapshi Direct Pay (MTN MoMo / Orange Money) |
| **Order Tracking** | Status: Placed → Processing → Ready → Delivered |
| **Vendor Portal** | Add products, update stock, manage orders |
| **Push Notifications** | Expo Push for order status updates |

---

## 2. TECHNOLOGY STACK — FREE TIER ONLY

| Layer | Technology | Why |
|---|---|---|
| Frontend | React Native + Expo SDK 51 | Free. Cross-platform iOS/Android |
| Navigation | Expo Router (file-based) | Convention over configuration |
| State | Zustand | Lightweight, no boilerplate |
| Backend | Node.js 20 + Express 4 (JavaScript) | Lightweight REST API |
| Validation | Joi | Request body validation |
| Database | MongoDB Atlas (M0 Free) | 512MB, document model fits products |
| Images | Cloudinary | 25GB storage, auto-resize, CDN |
| Payments | **Fapshi** (Sandbox → Live) | MTN MoMo + Orange Money, Cameroon-native |
| Hosting | Render.com (Free Web Service) | 750hrs/month, auto-deploy from GitHub |
| Push | Expo Push Notifications | Free, no native module required |
| Distribution | Expo Go | Free testing without App Store |

### 2.1 Why Fapshi over Stripe

| Concern | Stripe | Fapshi |
|---|---|---|
| Local relevance | International cards only | MTN MoMo + Orange Money (what Cameroonians use) |
| Native SDK conflict | `@stripe/stripe-react-native` does NOT work in Expo Go | REST API only — no native modules needed |
| Currency | USD/EUR | **XAF (CFA Franc)** — no conversion |
| Sandbox | Yes | Yes (`sandbox.fapshi.com`) |
| Cost | Free in test mode | Free in sandbox, low fees in live |

### 2.2 Fapshi Integration Approach

We will use **Fapshi Direct Pay** for the best UX:

```
Mobile App → Backend API → Fapshi Direct Pay API → User's MoMo/OM
                                    ↓
                              Webhook callback
                                    ↓
                          Backend updates order status
                                    ↓
                          Push notification to customer
```

**Key Fapshi Endpoints:**
- `POST https://sandbox.fapshi.com/direct-pay` — Initiate payment (amount, phone)
- `GET https://sandbox.fapshi.com/payment-status/{transId}` — Check status
- Webhook — Fapshi POSTs to your backend when payment completes

**Headers required:**
```
Content-Type: application/json
apikey: <your-api-key>
apiuser: <your-api-user>
```

---

## 3. ARCHITECTURE — FULLY ALIGNED WITH CODING RULES

### 3.1 Backend Structure (Node.js — JavaScript)

> Follows: Controllers → Services → Models separation. Max 100 lines per file.

```
hypermarket-backend/
├── src/
│   ├── config/
│   │   ├── db.js                     # MongoDB connection
│   │   ├── cloudinary.js             # Cloudinary config
│   │   ├── fapshi.js                 # Fapshi API config (base URL, headers)
│   │   └── env.js                    # Environment variable validation
│   │
│   ├── middleware/
│   │   ├── auth.js                   # JWT verification
│   │   ├── roleCheck.js              # Role-based access control
│   │   ├── errorHandler.js           # Global error handler
│   │   ├── rateLimiter.js            # express-rate-limit config
│   │   └── validate.js               # Joi validation middleware
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.validation.js    # Joi schemas
│   │   │   └── user.model.js
│   │   │
│   │   ├── product/
│   │   │   ├── product.routes.js
│   │   │   ├── product.controller.js
│   │   │   ├── product.service.js
│   │   │   ├── product.validation.js
│   │   │   ├── product.model.js
│   │   │   ├── category.model.js
│   │   │   └── review.model.js
│   │   │
│   │   ├── cart/
│   │   │   ├── cart.routes.js
│   │   │   ├── cart.controller.js
│   │   │   ├── cart.service.js
│   │   │   ├── cart.validation.js
│   │   │   └── cart.model.js
│   │   │
│   │   ├── order/
│   │   │   ├── order.routes.js
│   │   │   ├── order.controller.js
│   │   │   ├── order.service.js
│   │   │   ├── order.validation.js
│   │   │   └── order.model.js
│   │   │
│   │   ├── payment/
│   │   │   ├── payment.routes.js
│   │   │   ├── payment.controller.js
│   │   │   ├── payment.service.js    # Fapshi API calls
│   │   │   └── payment.validation.js
│   │   │
│   │   ├── vendor/
│   │   │   ├── vendor.routes.js
│   │   │   ├── vendor.controller.js
│   │   │   └── vendor.service.js
│   │   │
│   │   ├── admin/
│   │   │   ├── admin.routes.js
│   │   │   ├── admin.controller.js
│   │   │   └── admin.service.js
│   │   │
│   │   └── notification/
│   │       ├── notification.routes.js
│   │       ├── notification.controller.js
│   │       └── notification.service.js  # Expo push logic
│   │
│   ├── utils/
│   │   ├── apiResponse.js            # Standardized response format
│   │   ├── apiError.js               # Custom error class
│   │   └── pagination.js             # Cursor/offset pagination helper
│   │
│   └── app.js                        # Express setup, middleware, route mounting
│
├── data/
│   └── seed.json                     # Seed data for demo
│
├── scripts/
│   └── seed.js                       # Database seeder script
│
├── server.js                         # Entry point
├── .env.example                      # Environment variable template
└── package.json
```

### 3.2 Frontend Structure (React Native + Expo Router)

> Follows: Feature-based architecture, Smart/Dumb components, custom hooks for logic, services for API calls, max 100 lines per file, no inline styles, all mock data in data.json.

```
hypermarket-app/
├── app/                              # Expo Router (file-based routing)
│   ├── _layout.tsx                   # Root layout with auth gate
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx                 # Smart: uses useLogin hook
│   │   └── register.tsx              # Smart: uses useRegister hook
│   │
│   ├── (customer)/
│   │   ├── _layout.tsx               # Tab navigator
│   │   ├── index.tsx                 # Home screen (orchestrator)
│   │   ├── category/
│   │   │   └── [id].tsx              # Category products
│   │   ├── product/
│   │   │   └── [id].tsx              # Product details
│   │   ├── cart.tsx                   # Cart screen
│   │   ├── checkout.tsx              # Checkout + Fapshi payment
│   │   ├── orders.tsx                # Order list
│   │   └── order/
│   │       └── [id].tsx              # Order details
│   │
│   ├── (vendor)/
│   │   ├── _layout.tsx
│   │   ├── dashboard.tsx
│   │   ├── add-product.tsx
│   │   ├── edit-product/
│   │   │   └── [id].tsx
│   │   └── orders.tsx
│   │
│   └── (admin)/
│       ├── _layout.tsx
│       └── dashboard.tsx
│
├── features/                         # Feature modules (co-located)
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx         # Dumb: renders form UI
│   │   │   ├── RegisterForm.tsx
│   │   │   └── SocialAuthButton.tsx
│   │   ├── hooks/
│   │   │   ├── useLogin.ts           # Smart: login logic
│   │   │   └── useRegister.ts
│   │   ├── services/
│   │   │   └── authService.ts        # API: login, register, refresh
│   │   └── styles/
│   │       └── authStyles.ts         # StyleSheet.create()
│   │
│   ├── catalog/
│   │   ├── components/
│   │   │   ├── ProductCard.tsx       # Dumb: displays product
│   │   │   ├── CategoryBar.tsx       # Dumb: horizontal category list
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterModal.tsx
│   │   │   └── ProductList.tsx       # Dumb: FlatList wrapper
│   │   ├── hooks/
│   │   │   ├── useProducts.ts        # Fetch products with pagination
│   │   │   ├── useCategories.ts
│   │   │   └── useProductSearch.ts
│   │   ├── services/
│   │   │   └── catalogService.ts
│   │   └── styles/
│   │       └── catalogStyles.ts
│   │
│   ├── product-detail/
│   │   ├── components/
│   │   │   ├── ImageCarousel.tsx
│   │   │   ├── ProductInfo.tsx
│   │   │   ├── ReviewList.tsx
│   │   │   ├── ReviewItem.tsx
│   │   │   └── AddToCartButton.tsx
│   │   ├── hooks/
│   │   │   ├── useProductDetail.ts
│   │   │   └── useReviews.ts
│   │   ├── services/
│   │   │   └── productDetailService.ts
│   │   └── styles/
│   │       └── productDetailStyles.ts
│   │
│   ├── cart/
│   │   ├── components/
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   ├── QuantitySelector.tsx
│   │   │   └── EmptyCart.tsx
│   │   ├── hooks/
│   │   │   └── useCart.ts
│   │   ├── services/
│   │   │   └── cartService.ts
│   │   └── styles/
│   │       └── cartStyles.ts
│   │
│   ├── checkout/
│   │   ├── components/
│   │   │   ├── DeliveryToggle.tsx    # Home Delivery vs BOPIS
│   │   │   ├── AddressForm.tsx
│   │   │   ├── MomoPaymentForm.tsx   # Phone number input for MoMo/OM
│   │   │   ├── PaymentStatusModal.tsx # Polling payment status
│   │   │   └── OrderConfirmation.tsx
│   │   ├── hooks/
│   │   │   ├── useCheckout.ts
│   │   │   └── usePaymentStatus.ts   # Polls Fapshi status
│   │   ├── services/
│   │   │   └── paymentService.ts     # Calls backend payment API
│   │   └── styles/
│   │       └── checkoutStyles.ts
│   │
│   ├── orders/
│   │   ├── components/
│   │   │   ├── OrderCard.tsx
│   │   │   ├── OrderStatusBadge.tsx
│   │   │   ├── OrderTimeline.tsx
│   │   │   └── EmptyOrders.tsx
│   │   ├── hooks/
│   │   │   ├── useOrders.ts
│   │   │   └── useOrderDetail.ts
│   │   ├── services/
│   │   │   └── orderService.ts
│   │   └── styles/
│   │       └── orderStyles.ts
│   │
│   ├── vendor/
│   │   ├── components/
│   │   │   ├── VendorStats.tsx
│   │   │   ├── VendorOrderCard.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── ImageUploader.tsx
│   │   │   └── StatusDropdown.tsx
│   │   ├── hooks/
│   │   │   ├── useVendorDashboard.ts
│   │   │   ├── useVendorOrders.ts
│   │   │   └── useProductForm.ts
│   │   ├── services/
│   │   │   └── vendorService.ts
│   │   └── styles/
│   │       └── vendorStyles.ts
│   │
│   ├── admin/
│   │   ├── components/
│   │   │   ├── UserList.tsx
│   │   │   ├── PlatformStats.tsx
│   │   │   └── AdminOrderList.tsx
│   │   ├── hooks/
│   │   │   └── useAdminDashboard.ts
│   │   ├── services/
│   │   │   └── adminService.ts
│   │   └── styles/
│   │       └── adminStyles.ts
│   │
│   └── notification/
│       ├── hooks/
│       │   └── useNotifications.ts   # Permission + token registration
│       └── services/
│           └── notificationService.ts
│
├── shared/                           # Cross-feature shared code
│   ├── components/
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── EmptyState.tsx
│   │   └── AppButton.tsx
│   ├── hooks/
│   │   └── useRefreshOnFocus.ts
│   ├── constants/
│   │   ├── theme.ts                  # Colors, spacing, typography
│   │   ├── api.ts                    # Base URL, timeout
│   │   └── config.ts                 # App-wide config
│   ├── utils/
│   │   ├── responsive.ts            # Responsive sizing utilities
│   │   ├── formatCurrency.ts        # XAF formatting
│   │   └── formatDate.ts
│   └── styles/
│       └── globalStyles.ts           # Shared StyleSheet
│
├── store/                            # Zustand stores
│   ├── authStore.ts
│   └── cartStore.ts
│
├── services/                         # Shared API infrastructure
│   └── api.ts                        # Axios instance with JWT interceptor
│
├── data/
│   └── data.json                     # ALL mock/seed data
│
└── app.json
```

---

## 4. DATABASE SCHEMA (MongoDB)

### User
```js
{
  _id, name, email, passwordHash,
  role: 'customer' | 'vendor' | 'admin',
  phone,                              // MoMo/OM number
  address: { street, city, quarter, region },
  expoPushToken,
  createdAt, updatedAt
}
```

### Product
```js
{
  _id, name, description, price, comparePrice,
  category: ObjectId → Category,
  vendor: ObjectId → User,
  images: [{ url, publicId }],        // Cloudinary URLs
  stock: Number, unit,
  tags: [String],
  isPerishable: Boolean,
  averageRating, reviewCount,
  isActive: Boolean
}
// Text index: { name: 'text', description: 'text' }
```

### Category
```js
{ _id, name, icon, slug, isActive }
```

### Cart
```js
{
  _id, user: ObjectId → User,
  items: [{ product: ObjectId, quantity: Number }]
}
```

### Order
```js
{
  _id, customer: ObjectId → User,
  items: [{ product: ObjectId, name, price, quantity, vendorId }],
  totalAmount,
  status: 'placed' | 'processing' | 'ready' | 'delivered',
  fulfilmentType: 'delivery' | 'pickup',
  deliveryAddress,
  payment: {
    provider: 'fapshi',
    transId: String,                   // Fapshi transaction ID
    status: 'pending' | 'successful' | 'failed',
    phone: String,                     // MoMo/OM number used
    paidAt: Date
  },
  createdAt, updatedAt
}
```

### Review
```js
{
  _id, product: ObjectId, user: ObjectId,
  rating: Number (1-5), comment: String,
  createdAt
}
```

---

## 5. API CONTRACTS

### Authentication
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | None | Register user, returns JWT |
| POST | `/api/auth/login` | None | Login, returns JWT |
| GET | `/api/auth/me` | Any | Get current user profile |

### Products
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | None | List products (search, filter, paginated) |
| GET | `/api/products/:id` | None | Single product with reviews |
| POST | `/api/products` | Vendor | Create product (multipart + Cloudinary) |
| PUT | `/api/products/:id` | Vendor | Update own product |
| DELETE | `/api/products/:id` | Vendor | Soft-delete own product |

### Categories
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/categories` | None | List all categories |

### Cart
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/cart` | Customer | Get user's cart |
| POST | `/api/cart/add` | Customer | Add item (productId, quantity) |
| PUT | `/api/cart/update` | Customer | Update item quantity |
| DELETE | `/api/cart/remove/:productId` | Customer | Remove item |
| DELETE | `/api/cart/clear` | Customer | Clear entire cart |

### Orders
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/orders` | Customer | Place order from cart |
| GET | `/api/orders` | Customer | List own orders |
| GET | `/api/orders/:id` | Customer | Single order detail |
| PUT | `/api/orders/:id/status` | Vendor/Admin | Update order status → triggers push |

### Payments (Fapshi)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/payment/initiate` | Customer | Call Fapshi Direct Pay, returns transId |
| GET | `/api/payment/status/:transId` | Customer | Poll Fapshi payment status |
| POST | `/api/payment/webhook` | None (Fapshi) | Webhook: Fapshi posts payment result |

### Vendor
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/vendor/products` | Vendor | List own products |
| GET | `/api/vendor/orders` | Vendor | List orders containing own products |
| GET | `/api/vendor/stats` | Vendor | Revenue, order count, top products |

### Admin
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/admin/users` | Admin | List all users |
| GET | `/api/admin/orders` | Admin | List all platform orders |
| GET | `/api/admin/stats` | Admin | Platform-wide stats |

### Notifications
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/notifications/register` | Any | Save Expo push token |

---

## 6. EXHAUSTIVE 15-DAY PLAN

> Each day = 6-8 focused hours. Commit to GitHub at the end of every session.

---

### PHASE 1: BACKEND FOUNDATION (Days 1–5)

---

#### DAY 1 — Project Setup + Auth Feature

**Goal:** Backend scaffold with config, middleware, and working auth API.

**Tasks:**
1. `npm init -y` + install dependencies:
   - `express mongoose dotenv bcryptjs jsonwebtoken cors multer multer-storage-cloudinary cloudinary axios joi express-rate-limit helmet`
2. Create `.env.example` with all required vars
3. Build `src/config/`:
   - `env.js` — validates all env vars exist on startup
   - `db.js` — MongoDB Atlas connection
   - `fapshi.js` — Fapshi base URL + header factory
4. Build `src/middleware/`:
   - `errorHandler.js` — global Express error handler (catches thrown errors, returns standardized JSON)
   - `auth.js` — JWT verify middleware
   - `roleCheck.js` — checks `req.user.role`
   - `validate.js` — generic Joi validation middleware
   - `rateLimiter.js` — rate limit config
5. Build `src/utils/`:
   - `apiResponse.js` — `success(res, data, statusCode)` and `error(res, message, statusCode)`
   - `apiError.js` — custom `AppError` class
6. Build `src/features/auth/`:
   - `user.model.js` — User schema with bcrypt pre-save hook
   - `auth.validation.js` — Joi schemas for register/login
   - `auth.service.js` — `registerUser()`, `loginUser()`, `getUserById()`
   - `auth.controller.js` — HTTP handlers calling service
   - `auth.routes.js` — wire routes
7. Build `app.js` — Express setup with helmet, cors, rateLimiter, JSON parsing, route mounting, errorHandler
8. Build `server.js` — entry point connecting DB then starting server
9. Test auth endpoints in Postman

**Deliverables:** Working register/login with JWT, validated inputs, global error handling.

**File count:** ~15 files, all under 100 lines each.

---

#### DAY 2 — Product + Category Feature

**Goal:** Full product CRUD with Cloudinary images, category listing, text search, and pagination.

**Tasks:**
1. Build `src/features/product/`:
   - `category.model.js` — name, icon, slug
   - `product.model.js` — full schema with text index
   - `review.model.js` — rating, comment, user ref
   - `product.validation.js` — Joi schemas for create/update/query params
   - `product.service.js` — `createProduct()`, `getProducts(filters, page)`, `getProductById()`, `updateProduct()`, `deleteProduct()`
   - `product.controller.js` — HTTP handlers
   - `product.routes.js` — public + vendor-protected routes
2. Build `src/config/cloudinary.js` — config + multer-storage-cloudinary setup
3. Build `src/utils/pagination.js` — offset pagination helper (page, limit, totalCount → meta)
4. Test: create categories via Postman, create products with image upload, search, paginate

**Deliverables:** Products CRUD, Cloudinary images, text search, pagination working.

---

#### DAY 3 — Cart + Order Features

**Goal:** Cart management and order placement with price snapshot.

**Tasks:**
1. Build `src/features/cart/`:
   - `cart.model.js`
   - `cart.validation.js`
   - `cart.service.js` — `getCart()`, `addItem()` (checks stock), `updateItem()`, `removeItem()`, `clearCart()`
   - `cart.controller.js`
   - `cart.routes.js`
2. Build `src/features/order/`:
   - `order.model.js` — with payment subdocument
   - `order.validation.js`
   - `order.service.js` — `placeOrder()` (snapshot prices, deduct stock, clear cart), `getOrders()`, `getOrderById()`, `updateOrderStatus()`
   - `order.controller.js`
   - `order.routes.js`
3. Test full flow: add to cart → place order → verify stock deducted

**Deliverables:** Cart CRUD, order placement with atomic stock management.

---

#### DAY 4 — Fapshi Payment Integration

**Goal:** Fapshi Direct Pay working end-to-end with webhook handling.

**Tasks:**
1. Create Fapshi sandbox account at `dashboard.fapshi.com`
2. Create a Service → get `apikey` and `apiuser`
3. Build `src/features/payment/`:
   - `payment.validation.js` — validate phone format (6XXXXXXXX), amount ≥ 100 XAF
   - `payment.service.js`:
     - `initiateDirectPay(amount, phone, orderId)` — POST to `sandbox.fapshi.com/direct-pay`
     - `checkPaymentStatus(transId)` — GET from Fapshi
     - `processWebhook(payload)` — update order payment status
   - `payment.controller.js`:
     - `initiate` — calls service, returns transId to client
     - `status` — polls Fapshi for client
     - `webhook` — receives Fapshi callback, updates order + triggers push
   - `payment.routes.js`
4. Configure webhook URL in Fapshi dashboard (will use Render URL later, use ngrok for local testing)
5. Test: initiate payment → approve on phone → webhook received → order updated

**Payment Flow:**
```
Client sends: { orderId, phone: "67XXXXXXX" }
     ↓
Backend calls Fapshi Direct Pay → gets transId
     ↓
Client polls /api/payment/status/:transId every 5 seconds
     ↓
Meanwhile: Fapshi sends USSD prompt to user's phone
     ↓
User confirms on phone → Fapshi sends webhook to backend
     ↓
Backend updates order.payment.status = 'successful'
     ↓
Client sees "Payment Successful" on next poll
```

**Deliverables:** Fapshi payments working in sandbox mode.

---

#### DAY 5 — Vendor/Admin APIs + Notifications + Deployment

**Goal:** Complete backend, deploy to Render.

**Tasks:**
1. Build `src/features/vendor/`:
   - `vendor.service.js` — `getVendorProducts()`, `getVendorOrders()`, `getVendorStats()`
   - `vendor.controller.js`
   - `vendor.routes.js`
2. Build `src/features/admin/`:
   - `admin.service.js` — `getAllUsers()`, `getAllOrders()`, `getPlatformStats()`
   - `admin.controller.js`
   - `admin.routes.js`
3. Build `src/features/notification/`:
   - `notification.service.js` — `registerToken()`, `sendPushNotification()` (Expo push SDK)
   - `notification.controller.js`
   - `notification.routes.js`
4. Wire push notifications into `order.service.js` → `updateOrderStatus()` triggers push
5. Create Postman collection covering ALL endpoints
6. Push to GitHub → connect to Render.com
7. Set all env vars in Render dashboard
8. Update Fapshi webhook URL to Render production URL
9. Test deployed backend via Postman

**Deliverables:** Full backend deployed on Render, all APIs working, Fapshi webhook connected.

---

### PHASE 2: MOBILE APP FRONTEND (Days 6–12)

---

#### DAY 6 — Expo Setup + Shared Infrastructure + Auth Feature

**Goal:** App scaffold, shared utilities, working login/register screens.

**Tasks:**
1. `npx create-expo-app hypermarket-app` + install:
   - `expo-router axios zustand @react-native-async-storage/async-storage expo-image-picker expo-notifications`
2. Build `shared/`:
   - `constants/theme.ts` — colors, spacing, fonts, shadows
   - `constants/api.ts` — `BASE_URL` pointing to Render
   - `utils/responsive.ts` — scale helpers
   - `utils/formatCurrency.ts` — `formatXAF(amount)` → "2,500 XAF"
   - `components/LoadingSpinner.tsx`, `ErrorMessage.tsx`, `EmptyState.tsx`, `AppButton.tsx`
   - `styles/globalStyles.ts`
3. Build `services/api.ts` — Axios instance with JWT interceptor from AsyncStorage
4. Build `store/authStore.ts` — Zustand: user, token, isAuthenticated, login(), logout()
5. Build `features/auth/`:
   - `services/authService.ts` — `loginAPI()`, `registerAPI()`
   - `hooks/useLogin.ts` — handles form state, validation, API call, store update
   - `hooks/useRegister.ts`
   - `components/LoginForm.tsx` — dumb, receives props
   - `components/RegisterForm.tsx`
   - `styles/authStyles.ts`
6. Build `app/(auth)/login.tsx` — smart orchestrator, uses `useLogin` hook, renders `LoginForm`
7. Build `app/(auth)/register.tsx`
8. Build `app/_layout.tsx` — auth gate: if no token → auth stack, else → role-based tabs
9. Build `data/data.json` — mock categories, sample products for local testing

**Deliverables:** Working auth flow, role-based navigation, shared design system.

---

#### DAY 7 — Home Screen + Catalog Feature

**Goal:** Beautiful home screen with categories, featured products, search.

**Tasks:**
1. Build `features/catalog/`:
   - `services/catalogService.ts` — `fetchProducts()`, `fetchCategories()`, `searchProducts()`
   - `hooks/useProducts.ts` — pagination, loading states
   - `hooks/useCategories.ts`
   - `hooks/useProductSearch.ts` — debounced search
   - `components/CategoryBar.tsx` — horizontal ScrollView
   - `components/ProductCard.tsx` — image, name, price, rating
   - `components/ProductList.tsx` — FlatList with pagination
   - `components/SearchBar.tsx`
   - `components/FilterModal.tsx`
   - `styles/catalogStyles.ts`
2. Build `app/(customer)/_layout.tsx` — bottom tab navigator (Home, Cart, Orders, Profile)
3. Build `app/(customer)/index.tsx` — Home screen orchestrator:
   ```tsx
   <HomeScreen>
     <SearchBar />
     <CategoryBar />
     <SectionTitle title="Featured Products" />
     <ProductList />
   </HomeScreen>
   ```
4. Build `app/(customer)/category/[id].tsx` — filtered product list by category

**Deliverables:** Home screen with live data, category browsing, search, infinite scroll.

---

#### DAY 8 — Product Details + Cart Feature

**Goal:** Product detail page with images, reviews. Cart with quantity management.

**Tasks:**
1. Build `features/product-detail/`:
   - `services/productDetailService.ts`
   - `hooks/useProductDetail.ts`
   - `hooks/useReviews.ts`
   - `components/ImageCarousel.tsx` — swipeable product images
   - `components/ProductInfo.tsx` — name, price, description, stock
   - `components/ReviewList.tsx`
   - `components/ReviewItem.tsx`
   - `components/AddToCartButton.tsx`
   - `styles/productDetailStyles.ts`
2. Build `app/(customer)/product/[id].tsx` — orchestrator
3. Build `store/cartStore.ts` — Zustand: items, addItem(), removeItem(), updateQuantity(), clearCart(), cartTotal
4. Build `features/cart/`:
   - `services/cartService.ts` — syncs with backend
   - `hooks/useCart.ts` — combines Zustand + API sync
   - `components/CartItem.tsx`
   - `components/CartSummary.tsx` — subtotal, item count
   - `components/QuantitySelector.tsx` — +/- buttons
   - `components/EmptyCart.tsx`
   - `styles/cartStyles.ts`
5. Build `app/(customer)/cart.tsx` — orchestrator

**Deliverables:** Product detail with carousel + reviews. Functional cart with backend sync.

---

#### DAY 9 — Checkout + Fapshi Mobile Money Payment

**Goal:** Checkout flow with delivery options and MoMo/OM payment.

**Tasks:**
1. Build `features/checkout/`:
   - `services/paymentService.ts` — `initiatePayment(orderId, phone)`, `pollPaymentStatus(transId)`
   - `hooks/useCheckout.ts` — manages checkout form state, places order
   - `hooks/usePaymentStatus.ts` — polls every 5s, auto-stops on success/failure
   - `components/DeliveryToggle.tsx` — Home Delivery vs BOPIS toggle
   - `components/AddressForm.tsx` — street, quarter, city fields
   - `components/MomoPaymentForm.tsx` — phone number input with MTN/OM selector
   - `components/PaymentStatusModal.tsx` — "Waiting for confirmation..." spinner, then success/fail
   - `components/OrderConfirmation.tsx` — success screen with order ID
   - `styles/checkoutStyles.ts`
2. Build `app/(customer)/checkout.tsx` — orchestrator:
   ```
   Cart Summary → Delivery Toggle → Address (if delivery) → MoMo Form → Pay → Status Modal → Confirmation
   ```
3. Test full flow: cart → checkout → enter phone → approve on phone → order confirmed

**Fapshi Mobile UX Flow:**
1. User enters their MoMo/OM number on the checkout screen
2. App calls backend → backend calls Fapshi Direct Pay
3. App shows "Waiting for payment confirmation..." modal
4. User receives USSD prompt on their phone → enters PIN to approve
5. Fapshi webhook hits backend → order.payment.status = 'successful'
6. App polling detects success → shows "Payment Successful!" → navigates to order confirmation

**Deliverables:** Complete checkout with MoMo/OM payment working in sandbox.

---

#### DAY 10 — Orders Feature + Push Notifications

**Goal:** Customer order tracking with push notifications.

**Tasks:**
1. Build `features/orders/`:
   - `services/orderService.ts` — `fetchOrders()`, `fetchOrderById()`
   - `hooks/useOrders.ts`
   - `hooks/useOrderDetail.ts`
   - `components/OrderCard.tsx`
   - `components/OrderStatusBadge.tsx` — color-coded by status
   - `components/OrderTimeline.tsx` — visual status progression
   - `components/EmptyOrders.tsx`
   - `styles/orderStyles.ts`
2. Build `app/(customer)/orders.tsx` — order list
3. Build `app/(customer)/order/[id].tsx` — order detail with timeline
4. Build `features/notification/`:
   - `services/notificationService.ts` — `registerForPushNotifications()`, `sendTokenToBackend()`
   - `hooks/useNotifications.ts` — request permissions, register token, listen for incoming
5. Wire notifications into `app/_layout.tsx` — register on app launch, refresh orders on notification

**Deliverables:** Order tracking with status badges and timeline. Push notifications working.

---

#### DAY 11 — Vendor Portal

**Goal:** Full vendor experience: dashboard, product management, order fulfillment.

**Tasks:**
1. Build `features/vendor/`:
   - `services/vendorService.ts` — `fetchVendorStats()`, `fetchVendorOrders()`, `updateOrderStatus()`, `createProduct()`, `fetchVendorProducts()`
   - `hooks/useVendorDashboard.ts`
   - `hooks/useVendorOrders.ts`
   - `hooks/useProductForm.ts` — handles form state + image picking + upload
   - `components/VendorStats.tsx` — revenue, orders count, active products
   - `components/VendorOrderCard.tsx` — order info + status update dropdown
   - `components/ProductForm.tsx` — reusable for add/edit
   - `components/ImageUploader.tsx` — uses expo-image-picker
   - `components/StatusDropdown.tsx` — placed → processing → ready → delivered
   - `styles/vendorStyles.ts`
2. Build `app/(vendor)/_layout.tsx` — vendor tab nav
3. Build `app/(vendor)/dashboard.tsx`
4. Build `app/(vendor)/add-product.tsx`
5. Build `app/(vendor)/orders.tsx`
6. Test: vendor adds product → customer buys → vendor updates status → customer gets push

**Deliverables:** Vendor dashboard, product CRUD, order fulfillment with push trigger.

---

#### DAY 12 — Admin Dashboard + UI Polish

**Goal:** Admin panel, complete UI polish pass across all screens.

**Tasks:**
1. Build `features/admin/`:
   - `services/adminService.ts`
   - `hooks/useAdminDashboard.ts`
   - `components/UserList.tsx`
   - `components/PlatformStats.tsx`
   - `components/AdminOrderList.tsx`
   - `styles/adminStyles.ts`
2. Build `app/(admin)/_layout.tsx`
3. Build `app/(admin)/dashboard.tsx`
4. **UI Polish Pass** (all screens):
   - Verify `LoadingSpinner` appears on every API call
   - Verify `ErrorMessage` appears on every failed call
   - Verify `EmptyState` appears on every empty list
   - Check responsive scaling on small vs large screens
   - Add micro-animations: button press feedback, list item fade-in
   - Ensure consistent spacing, colors, typography from `theme.ts`
   - Test on both Android and iOS via Expo Go

**Deliverables:** Admin dashboard. All screens polished with loading/error/empty states.

---

### PHASE 3: INTEGRATION, TESTING & LAUNCH (Days 13–15)

---

#### DAY 13 — End-to-End Integration Testing

**Goal:** Full journey testing for all three roles.

**Tests to run:**

**Customer Journey:**
1. Register → Login → Browse → Search → Filter by category
2. View product detail → Read reviews → Add to cart
3. Go to cart → Adjust quantity → Remove item → Re-add
4. Checkout → Select delivery → Enter address → Enter MoMo number → Confirm
5. Approve payment on phone (sandbox) → See confirmation
6. View orders → See status badge → Receive push when vendor updates

**Vendor Journey:**
1. Login as vendor → View dashboard stats
2. Add new product with 3 images → Verify in catalog
3. Receive customer order → Update status: Processing → Ready → Delivered
4. Verify customer receives push notification at each step

**Admin Journey:**
1. Login as admin → View platform stats
2. View all users list
3. View all orders across vendors

**Edge Cases:**
- [ ] Empty cart → Checkout blocked
- [ ] Out of stock → Add to cart blocked
- [ ] Expired JWT → Redirect to login
- [ ] Invalid MoMo number → Validation error
- [ ] Payment timeout → Error state shown
- [ ] Network offline → Error message shown

---

#### DAY 14 — Bug Fixes, Seed Data, Beta Distribution

**Goal:** Fix all Day 13 bugs, populate demo data, distribute for testing.

**Tasks:**
1. Fix all bugs found on Day 13
2. Write `scripts/seed.js` using `data/seed.json`:
   - 3 vendor accounts
   - 8 categories (Groceries, Electronics, Fashion, Home, Beauty, Sports, Baby, Pharmacy)
   - 30 products across vendors (with Cloudinary images)
   - 15 sample orders in various statuses
   - 5 reviews
3. Run seed script against production MongoDB Atlas
4. Run `npx expo publish` → generate QR code
5. Distribute QR to 3-5 testers via Expo Go
6. Collect feedback, fix critical issues

**Deliverables:** Fully seeded app, distributed to testers.

---

#### DAY 15 — Documentation + Defense Preparation

**Goal:** Defense-ready documentation and demo.

**Tasks:**
1. Write `README.md`:
   - Project overview
   - Tech stack table
   - Architecture diagram (Mermaid)
   - API endpoints table
   - Local setup instructions (backend + frontend)
   - Environment variables reference
   - Demo credentials
2. Prepare demo accounts:
   - Customer: `customer@hypermarket.cm` / `Demo1234`
   - Vendor: `vendor@hypermarket.cm` / `Demo1234`
   - Admin: `admin@hypermarket.cm` / `Demo1234`
3. Create architecture diagram:
   ```mermaid
   graph TB
     A[React Native App] -->|REST API| B[Express Backend]
     B -->|ODM| C[MongoDB Atlas]
     B -->|Image Upload| D[Cloudinary CDN]
     B -->|Payment| E[Fapshi API]
     E -->|USSD| F[MTN MoMo / Orange Money]
     E -->|Webhook| B
     B -->|Push| G[Expo Push Service]
     G -->|Notification| A
     B -->|Deployed on| H[Render.com]
   ```
4. Configure `cron-job.org` to ping Render backend every 10 minutes (prevent cold starts during defense)
5. Rehearse demo flow: Customer buys → Vendor fulfills → Admin monitors
6. Prepare answers for defense questions:
   - "Why Fapshi over Stripe?" → Local relevance, MoMo/OM support, no native SDK issues
   - "How does this scale?" → Feature-based architecture, service layer, MongoDB sharding
   - "Security measures?" → JWT, bcrypt, Joi validation, rate limiting, helmet, CORS
   - "Why not microservices?" → Monolith-first for MVP, can extract services later

**Deliverables:** README, architecture diagram, demo-ready app, defense preparation complete.

---

## 7. POST-MVP ROADMAP (Phase 2)

| Feature | Technology | Effort |
|---|---|---|
| Elasticsearch search | Elastic Cloud or self-hosted | 3-5 days |
| Event-driven architecture | RabbitMQ (CloudAMQP free) | 5-7 days |
| Cold-chain IoT simulation | Node.js cron + random data | 2-3 days |
| Vendor analytics charts | Recharts or Victory Native | 2-3 days |
| BOPIS QR confirmation | QR code per order | 2-3 days |
| GDPR consent management | Consent screen + data export API | 3-4 days |
| Product recommendations | Collaborative filtering | 5-7 days |
| Multi-language (EN/FR) | expo-localization + i18next | 2-3 days |
| Fapshi Live Mode | KYC activation + live keys | 1 day |

---

## 8. VERIFICATION PLAN

### Automated
- Postman collection testing all 20+ API endpoints
- Backend: manual E2E test script covering auth → cart → order → payment flow

### Manual
- Expo Go testing on physical Android + iOS devices
- Full customer/vendor/admin journeys on Day 13
- 3-5 external testers on Day 14

### Defense Demo
- Live demo with real MoMo sandbox transaction
- Architecture walkthrough with Mermaid diagram
- Code walkthrough showing feature-based architecture
- Postman API demo independent of mobile app
