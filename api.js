const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000';
const API_KEY = 'YOUR_API_KEY';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// ==============================
// CREATE PAYMENT
// ==============================

async function createPayment() {
  try {
    const res = await api.post('/api/payment/create', {
      amount: 10000,
      method: 'QRIS',
      phone: '081234567890',
      customer_id: 'USER001'
    });

    console.log('CREATE PAYMENT');
    console.log(res.data);

    return res.data;
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

// ==============================
// CHECK STATUS
// ==============================

async function checkStatus(txId) {
  try {
    const res = await api.get(`/api/payment/status/${txId}`);

    console.log('CHECK STATUS');
    console.log(res.data);

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

// ==============================
// CANCEL PAYMENT
// ==============================

async function cancelPayment(txId) {
  try {
    const res = await api.delete(`/api/payment/cancel/${txId}`);

    console.log('CANCEL PAYMENT');
    console.log(res.data);

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

// ==============================
// ORDERKUOTA LOGIN
// ==============================

async function orderLogin() {
  try {
    const res = await api.post('/api/order/login', {
      username: '628123456789',
      password: 'password123'
    });

    console.log('ORDER LOGIN');
    console.log(res.data);

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

// ==============================
// VERIFY OTP TOKEN
// ==============================

async function verifyToken() {
  try {
    const res = await api.post('/api/order/token', {
      username: '628123456789',
      otp: '123456'
    });

    console.log('VERIFY TOKEN');
    console.log(res.data);

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

// ==============================
// QRIS TRANSACTION
// ==============================

async function qrisTransaction() {
  try {
    const res = await api.get('/api/qris/transaction', {
      data: {
        auth_username: 'USERNAME_OK',
        auth_token: 'TOKEN_OK'
      }
    });

    console.log('QRIS TRANSACTION');
    console.log(res.data);

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

// ==============================
// QRIS WITHDRAW
// ==============================

async function qrisWithdraw() {
  try {
    const res = await api.post('/api/qris/withdraw', {
      auth_username: 'USERNAME_OK',
      auth_token: 'TOKEN_OK',
      amount: 10000
    });

    console.log('QRIS WITHDRAW');
    console.log(res.data);

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

// ==============================
// WEBHOOK
// ==============================

async function sendWebhook() {
  try {
    const res = await api.post('/api/webhook', {
      transaction_id: 'TXN123456',
      status: 'SUCCESS',
      amount: 10000
    });

    console.log('WEBHOOK');
    console.log(res.data);

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

// ==============================
// EXPORT
// ==============================

module.exports = {
  createPayment,
  checkStatus,
  cancelPayment,
  orderLogin,
  verifyToken,
  qrisTransaction,
  qrisWithdraw,
  sendWebhook
};
