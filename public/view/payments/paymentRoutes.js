const express = require('express');
const payments = express.Router();
const path = require('path');

payments.use('/withdrawPendingApproval', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/pendingApproval.html'));
    //__dirname : It will resolve to your project folder.
});

payments.use('/depositTxnList', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/depositTxnList.html'));
    //__dirname : It will resolve to your project folder.
})
payments.use('/otpDetails', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/otpDetails.html'));
    //__dirname : It will resolve to your project folder.
})
payments.use('/userDetails', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/userDetails.html'));
    //__dirname : It will resolve to your project folder.
})
payments.use('/withdrawTransactions', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/withdrawTransactions.html'));
})
payments.use('/externalApiLogWithdraws', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/externalApiLogWithdraws.html'));
})
payments.use('/txnHistory', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/txnHistory.html'));
})

payments.use('/errorDetails', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/errorDetails.html'));
    //__dirname : It will resolve to your project folder.
})

payments.use('/bankAccountDetails', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/bankAccountDetails.html'));
    //__dirname : It will resolve to your project folder.
})
payments.use('/useridDetails', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/useridDetails.html'));
    //__dirname : It will resolve to your project folder.
})

payments.use('/creatorDetails', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/creatorDetails.html'));
    //__dirname : It will resolve to your project folder.
})
payments.use('/topActivity', function (req, res) {
    res.sendFile(path.join(__dirname + '/topActivity.html'));
})
module.exports = payments;