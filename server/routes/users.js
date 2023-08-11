const express = require('express');
const userData= express.Router();
const userCtrl = require('../controller/userCtrl');


userData.get('/getUserDetails', userCtrl.getData);
userData.get('/showUserDetailsOnDailyBasic',userCtrl.getUserDetailDailyBasic);
userData.get('/cronjobstatus',userCtrl.cronJobStatus);
// otpData.get('/getGmsUsers', otpCtrl.gmsUsersData);
module.exports = userData;