const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { apiLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./features/auth/auth.routes');
const categoryRoutes = require('./features/category/category.routes');
const productRoutes = require('./features/product/product.routes');
const reviewRoutes = require('./features/review/review.routes');
const cartRoutes = require('./features/cart/cart.routes');
const orderRoutes = require('./features/order/order.routes');
const paymentRoutes = require('./features/payment/payment.routes');
const vendorRoutes = require('./features/vendor/vendor.routes');
const adminRoutes = require('./features/admin/admin.routes');
const notificationRoutes = require('./features/notification/notification.routes');

const app = express();

// Global middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', apiLimiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, data: { status: 'OK', timestamp: new Date() } });
});

// Feature routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
