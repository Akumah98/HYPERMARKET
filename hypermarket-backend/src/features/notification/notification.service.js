const User = require('../auth/user.model');
const axios = require('axios');
const env = require('../../config/env');

const registerToken = async (userId, token) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { expoPushToken: token },
    { new: true }
  );
  return user;
};

const sendPush = async (userId, title, body, data = {}) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.expoPushToken) return null;

    const payload = {
      to: user.expoPushToken,
      sound: 'default',
      title,
      body,
      data,
    };

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (env.expoAccessToken && env.expoAccessToken !== 'placeholder') {
      headers['Authorization'] = `Bearer ${env.expoAccessToken}`;
    }

    const response = await axios.post(
      'https://exp.host/--/api/v2/push/send',
      payload,
      { headers }
    );

    return response.data;
  } catch (error) {
    // Fail silently in production to avoid disrupting server flow
    console.error('Push notification delivery failed:', error.message);
    return null;
  }
};

module.exports = {
  registerToken,
  sendPush,
};
