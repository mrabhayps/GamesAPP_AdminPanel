const express = require('express');
const otpData= express.Router();
const otpCtrl = require('../controller/otpCtrl');


otpData.get('/getOtpDataLast24Hr', otpCtrl);
// otpData.get('/getGmsUsers', otpCtrl.gmsUsersData);
module.exports = otpData;