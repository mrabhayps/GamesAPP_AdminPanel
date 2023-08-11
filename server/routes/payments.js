const express = require('express');
const payments = express.Router();
const paymentCtrl = require('../controller/paymentCtrl');


payments.get('/getAllWithdrawApprovalPendingTxn', paymentCtrl.getAllWithdrawApprovalPendingTxn);
payments.post('/updateWithdrawApprovalPendingTxn', paymentCtrl.updateWithdrawApprovalPendingTxn);
payments.get('/getDepositTxnList', paymentCtrl.getDepositTxnList);
payments.get('/getWithdrawnTransactionsList', paymentCtrl.getWithdrawnTransactionsList);
payments.get('/getExternalApiLogWithdraws', paymentCtrl.getExternalApiLogWithdraws);
payments.get('/getTransactionHistoryDetails', paymentCtrl.getTransactionHistoryDetails);
payments.get('/getUserIdBasedData', paymentCtrl.getUserIdBasedData);
payments.get('/getTopActivities', paymentCtrl.getTopActivities);
payments.get('/getLeaderboardData', paymentCtrl.getLeaderboardData);
module.exports = payments;