# Environment Config & Credentials

This document covers variables required to boot the services and test credentials.

## 1. Backend Environment Configuration (`.env`)

Configure the following variables in `hypermarket-backend/.env`:

| Key | Example/Default | Description |
|:---|:---|:---|
| `PORT` | `5000` | Local port for Express API |
| `NODE_ENV` | `development` | Service running environment |
| `MONGO_URI` | `mongodb+srv://...` | Connection URI for MongoDB Atlas cluster |
| `JWT_SECRET` | `your-jwt-secret-string`| Signature key for hashing user sessions |
| `JWT_EXPIRES_IN`| `7d` | Token expiry timeframe definition |
| `CLOUDINARY_CLOUD_NAME`| `your-cloud-name` | Cloudinary asset hosting cloud identity |
| `CLOUDINARY_API_KEY` | `your-api-key` | Cloudinary asset API validation key |
| `CLOUDINARY_API_SECRET`| `your-api-secret`| Cloudinary asset API validation secret |
| `FAPSHI_BASE_URL` | `https://sandbox.fapshi.com`| Fapshi API payment gateway environment URL |
| `FAPSHI_API_KEY` | `your-fapshi-key` | Fapshi API merchant key |
| `FAPSHI_API_USER` | `your-fapshi-user`| Fapshi API merchant username |
| `EXPO_ACCESS_TOKEN`| `your-expo-token` | Token for posting push requests |

---

## 2. Seeded Account Credentials

The database seeding script populates three accounts mapped to user roles:

### 👤 Customer Tester
- **Email**: `jean@test.com`
- **Password**: `Test123456`
- **Role**: `customer`
- **Use Case**: Browsing the catalog, adding items to cart, completing checkouts, paying via Momo, and tracking orders.

### 🏪 Vendor Tester
- **Email**: `mami@test.com`
- **Password**: `Vendor123`
- **Role**: `vendor`
- **Use Case**: Accessing vendor dashboard metrics, managing own products, and changing order status milestones.

### 🛡️ Admin Tester
- **Email**: `admin@hypermarket.cm`
- **Password**: `Admin123456`
- **Role**: `admin`
- **Use Case**: Accessing administrative platform metrics and searching registered user lists.
