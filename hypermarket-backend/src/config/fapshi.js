const axios = require('axios');
const env = require('./env');

const baseUrl = env.fapshi.baseUrl;
const headers = {
  apiuser: env.fapshi.apiUser,
  apikey: env.fapshi.apiKey,
};

module.exports = {
  directPay(data) {
    return new Promise(async (resolve) => {
      try {
        if (!data?.amount) resolve(error('amount required', 400));
        if (!Number.isInteger(data.amount)) resolve(error('amount must be of type integer', 400));
        if (data.amount < 100) resolve(error('amount cannot be less than 100 XAF', 400));
        if (!data?.phone) resolve(error('phone number required', 400));
        if (typeof data.phone !== 'string') resolve(error('phone must be of type string', 400));
        if (!/^6[\d]{8}$/.test(data.phone)) resolve(error('invalid phone number', 400));

        const config = {
          method: 'post',
          url: `${baseUrl}/direct-pay`,
          headers,
          data,
        };
        const response = await axios(config);
        response.data.statusCode = response.status;
        resolve(response.data);
      } catch (e) {
        const errorData = e.response?.data || { message: e.message };
        errorData.statusCode = e.response?.status || 500;
        resolve(errorData);
      }
    });
  },

  paymentStatus(transId) {
    return new Promise(async (resolve) => {
      try {
        if (!transId || typeof transId !== 'string') resolve(error('invalid type, string expected', 400));
        if (!/^[a-zA-Z0-9]{8,10}$/.test(transId)) resolve(error('invalid transaction id', 400));

        const config = {
          method: 'get',
          url: `${baseUrl}/payment-status/${transId}`,
          headers,
        };
        const response = await axios(config);
        response.data.statusCode = response.status;
        resolve(response.data);
      } catch (e) {
        const errorData = e.response?.data || { message: e.message };
        errorData.statusCode = e.response?.status || 500;
        resolve(errorData);
      }
    });
  },
};

function error(message, statusCode) {
  return { message, statusCode };
}
