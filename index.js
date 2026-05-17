const api = require('./api');

(async () => {

  // CREATE PAYMENT
  const payment = await api.createPayment();

  // CHECK STATUS
  if (payment?.transaction_id) {
    await api.checkStatus(payment.transaction_id);

    // CANCEL PAYMENT
    await api.cancelPayment(payment.transaction_id);
  }

  // ORDERKUOTA LOGIN
  await api.orderLogin();

  // VERIFY OTP
  await api.verifyToken();

  // QRIS TRANSACTION
  await api.qrisTransaction();

  // QRIS WITHDRAW
  await api.qrisWithdraw();

  // WEBHOOK
  await api.sendWebhook();

})();
