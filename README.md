# F-Orkut Payment Gateway API Wrapper

Simple implementation request untuk F-Orkut Payment Gateway menggunakan Axios.

---

# Installation

```bash
npm install axios
```

---

# Structure

```bash
project/
├── app.js
└── api.js
```

---

# Configuration

Edit bagian berikut:

```js
const API_KEY = 'YOUR_API_KEY';
```

---

# api.js

```js
const axios = require('axios');
const API_BASE_URL = "https://api.f-orkut.fazzcode.qzz.io";
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

    return res.data;

  } catch (err) {
    return err.response?.data || err.message;
  }
}

// ==============================
// CHECK STATUS
// ==============================

async function checkStatus(txId) {
  try {
    const res = await api.get(`/api/payment/status/${txId}`);

    return res.data;

  } catch (err) {
    return err.response?.data || err.message;
  }
}

// ==============================
// CANCEL PAYMENT
// ==============================

async function cancelPayment(txId) {
  try {
    const res = await api.delete(`/api/payment/cancel/${txId}`);

    return res.data;

  } catch (err) {
    return err.response?.data || err.message;
  }
}

// ==============================
// ORDERKUOTA LOGIN
// ==============================

async function orderLogin(username, password) {
  try {
    const res = await api.post('/api/order/login', {
      username,
      password
    });

    return res.data;

  } catch (err) {
    return err.response?.data || err.message;
  }
}

// ==============================
// VERIFY OTP TOKEN
// ==============================

async function verifyToken(username, otp) {
  try {
    const res = await api.post('/api/order/token', {
      username,
      otp
    });

    return res.data;

  } catch (err) {
    return err.response?.data || err.message;
  }
}

// ==============================
// QRIS TRANSACTION
// ==============================

async function qrisTransaction(auth_username, auth_token) {
  try {
    const res = await api.get('/api/qris/transaction', {
      data: {
        auth_username,
        auth_token
      }
    });

    return res.data;

  } catch (err) {
    return err.response?.data || err.message;
  }
}

// ==============================
// QRIS WITHDRAW
// ==============================

async function qrisWithdraw(auth_username, auth_token, amount) {
  try {
    const res = await api.post('/api/qris/withdraw', {
      auth_username,
      auth_token,
      amount
    });

    return res.data;

  } catch (err) {
    return err.response?.data || err.message;
  }
}

// ==============================
// WEBHOOK
// ==============================

async function sendWebhook(transaction_id, status, amount) {
  try {
    const res = await api.post('/api/webhook', {
      transaction_id,
      status,
      amount
    });

    return res.data;

  } catch (err) {
    return err.response?.data || err.message;
  }
}

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
```

---

# app.js

```js
const api = require('./api');

(async () => {

  // CREATE PAYMENT
  const payment = await api.createPayment();

  console.log(payment);

  // CHECK STATUS
  if (payment?.transaction_id) {

    const status = await api.checkStatus(payment.transaction_id);

    console.log(status);

    // CANCEL PAYMENT
    const cancel = await api.cancelPayment(payment.transaction_id);

    console.log(cancel);
  }

  // ORDER LOGIN
  const login = await api.orderLogin(
    '628123456789',
    'password123'
  );

  console.log(login);

  // VERIFY OTP
  const otp = await api.verifyToken(
    '628123456789',
    '123456'
  );

  console.log(otp);

  // QRIS TRANSACTION
  const qris = await api.qrisTransaction(
    'USERNAME_OK',
    'TOKEN_OK'
  );

  console.log(qris);

  // QRIS WITHDRAW
  const withdraw = await api.qrisWithdraw(
    'USERNAME_OK',
    'TOKEN_OK',
    10000
  );

  console.log(withdraw);

  // WEBHOOK
  const webhook = await api.sendWebhook(
    'TXN123456',
    'SUCCESS',
    10000
  );

  console.log(webhook);

})();
```

---

# Run Script

```bash
node app.js
```

---

# Required Headers

Semua request wajib menggunakan:

```http
X-API-Key: YOUR_API_KEY
X-Requested-With: XMLHttpRequest
```

---

# Example Response

## Create Payment

```json
{
  "success": true,
  "transaction_id": "TXN4F2D8A7B",
  "amount": 10000,
  "method": "QRIS",
  "payment_url": "https://api.f-orkut.fazzcode.qzz.io/pay/TXN4F2D8A7B",
  "expired_at": "2026-05-17T10:00:00.000Z",
  "status": "PENDING"
}
```

---

# Example cURL

## Create Payment

```bash
curl -X POST https://api.f-orkut.fazzcode.qzz.io/api/payment/create \
-H "Content-Type: application/json" \
-H "X-API-Key: YOUR_API_KEY" \
-H "X-Requested-With: XMLHttpRequest" \
-d '{
  "amount": 10000,
  "method": "QRIS",
  "phone": "081234567890"
}'
```

---

# Author

FazzCodeStudio
