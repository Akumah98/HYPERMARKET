/**
 * Generates a unique order ID like #AFR-10XXX
 * Uses timestamp + random digits for uniqueness
 */
const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(Math.random() * 90 + 10);
  return `AFR-${timestamp}${random}`;
};

module.exports = { generateOrderId };
