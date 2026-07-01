const crypto = require('crypto');

// ─── In-Memory Transaction Store ────────────────────────────────────────────
const transactions = new Map();

const TRANSITION_DELAY_MS = process.env.NODE_ENV === 'test' ? 10 : 10000; // Fast in tests, normal in dev

const generateTransId = () => {
  return 'SIM' + crypto.randomBytes(3).toString('hex').toUpperCase();
};

// ─── Simulator Methods ──────────────────────────────────────────────────────

module.exports = {
  /**
   * Simulates Fapshi directPay.
   * Validates phone/amount, stores a transaction in-memory,
   * and auto-transitions it to SUCCESSFUL after ~10 seconds.
   */
  directPay(data) {
    return new Promise((resolve) => {
      if (!data?.amount) return resolve(error('amount required', 400));
      if (!Number.isInteger(data.amount)) return resolve(error('amount must be of type integer', 400));
      if (data.amount < 100) return resolve(error('amount cannot be less than 100 XAF', 400));
      if (!data?.phone) return resolve(error('phone number required', 400));
      if (typeof data.phone !== 'string') return resolve(error('phone must be of type string', 400));
      if (!/^6[\d]{8}$/.test(data.phone)) return resolve(error('invalid phone number', 400));

      const transId = generateTransId();
      const transaction = {
        transId,
        status: 'PENDING',
        amount: data.amount,
        phone: data.phone,
        medium: data.medium || 'mobile money',
        name: data.name || '',
        email: data.email || '',
        userId: data.userId || '',
        externalId: data.externalId || '',
        message: data.message || '',
        createdAt: new Date().toISOString(),
      };

      transactions.set(transId, transaction);

      console.log(`[FAPSHI SIM] Payment initiated: ${transId} | ${data.amount} XAF | ${data.phone}`);

      // Auto-transition to SUCCESSFUL after delay
      setTimeout(() => {
        const tx = transactions.get(transId);
        if (tx && tx.status === 'PENDING') {
          tx.status = 'SUCCESSFUL';
          console.log(`[FAPSHI SIM] Payment successful: ${transId}`);
        }
      }, TRANSITION_DELAY_MS);

      resolve({ transId, statusCode: 200 });
    });
  },

  /**
   * Simulates Fapshi paymentStatus.
   * Looks up the in-memory store and returns current status.
   */
  paymentStatus(transId) {
    return new Promise((resolve) => {
      if (!transId || typeof transId !== 'string') {
        return resolve(error('invalid type, string expected', 400));
      }

      const transaction = transactions.get(transId);
      if (!transaction) {
        return resolve(error('transaction not found', 404));
      }

      console.log(`[FAPSHI SIM] Status check: ${transId} → ${transaction.status}`);

      resolve({
        ...transaction,
        statusCode: 200,
      });
    });
  },
  /**
   * Simulates Fapshi refund.
   * Looks up the in-memory store and updates status to REFUNDED.
   */
  refund(transId, amount) {
    return new Promise((resolve) => {
      if (!transId || typeof transId !== 'string') {
        return resolve(error('invalid type, string expected', 400));
      }

      const transaction = transactions.get(transId);
      if (!transaction) {
        return resolve(error('transaction not found', 404));
      }

      if (transaction.status !== 'SUCCESSFUL') {
        return resolve(error('transaction must be SUCCESSFUL to be refunded', 400));
      }

      if (amount > transaction.amount) {
        return resolve(error('refund amount cannot exceed original amount', 400));
      }

      transaction.status = 'REFUNDED';
      console.log(`[FAPSHI SIM] Refund successful: ${transId} | ${amount} XAF`);

      resolve({
        transId,
        status: 'REFUNDED',
        refundAmount: amount,
        statusCode: 200,
      });
    });
  },
};

function error(message, statusCode) {
  return { message, statusCode };
}
