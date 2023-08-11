const express = require('express');
const dailyTxnData= express.Router();
const dailyTxnCtrl = require('../controller/dailyTxnCtrl');


dailyTxnData.get('/getDetails', dailyTxnCtrl);
module.exports = dailyTxnData;