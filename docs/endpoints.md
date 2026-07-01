# API Endpoints Directory

All API paths are prefixed with `/api`.

## 1. Authentication & Users
| Method | Endpoint | Auth Required | Description |
|:---|:---|:---|:---|
| POST | `/auth/register` | None | Register a customer, vendor, or admin |
| POST | `/auth/login` | None | Authenticate and obtain JWT token |
| GET | `/auth/me` | JWT | Get authenticated user profile |

## 2. Product Catalog & Categories
| Method | Endpoint | Auth Required | Role Required | Description |
|:---|:---|:---|:---|:---|
| GET | `/categories` | None | None | List all product categories |
| POST | `/categories` | JWT | Admin | Create a new category |
| GET | `/products` | None | None | Query paginated, filtered products |
| GET | `/products/:id` | None | None | Retrieve specific product details |
| POST | `/products` | JWT | Vendor | Create a vendor product listing |
| PUT | `/products/:id` | JWT | Vendor | Update a vendor product listing |
| DELETE | `/products/:id` | JWT | Vendor | Delete a vendor product listing |
| POST | `/products/:id/images` | JWT | Vendor | Upload product gallery images |

## 3. Cart & Checkout
| Method | Endpoint | Auth Required | Description |
|:---|:---|:---|:---|
| GET | `/cart` | JWT | Fetch current shopping cart and price snapshots |
| POST | `/cart/items` | JWT | Add or increment product items in cart |
| PUT | `/cart/items/:id` | JWT | Adjust item quantities inside cart |
| DELETE | `/cart/items/:id` | JWT | Remove a specific item from the cart |
| DELETE | `/cart` | JWT | Clear all items from the cart |

## 4. Orders & Fulfillment
| Method | Endpoint | Auth Required | Role Required | Description |
|:---|:---|:---|:---|:---|
| POST | `/orders` | JWT | None | Place order from current cart |
| GET | `/orders` | JWT | None | List current user's order history |
| GET | `/orders/:id` | JWT | None | Retrieve detailed order timeline details |
| PUT | `/orders/:id/cancel` | JWT | None | Self-cancel order (placed/processing only) |
| PUT | `/orders/:id/status` | JWT | Vendor/Admin | Progress order status states |

## 5. Payments (Fapshi Integration)
| Method | Endpoint | Auth Required | Description |
|:---|:---|:---|:---|
| POST | `/payment/initiate` | JWT | Request USSD Push payment for an order |
| GET | `/payment/status/:transId` | JWT | Check/Poll transaction status with Fapshi |
| POST | `/payment/webhook` | None | Receive status callbacks from Fapshi |

## 6. Dashboards & Push Notifications
| Method | Endpoint | Auth Required | Role Required | Description |
|:---|:---|:---|:---|:---|
| GET | `/vendor/stats` | JWT | Vendor | Get revenue and top product statistics |
| GET | `/admin/stats` | JWT | Admin | Get platform-wide business intelligence stats |
| GET | `/admin/users` | JWT | Admin | Query and filter registered user database |
| POST | `/notifications/register`| JWT | None | Save Expo Push Token to user profile |
