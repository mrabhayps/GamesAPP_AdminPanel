const express = require('express');
const serverData= express.Router();
const serverCtrl = require('../controller/serverStatus');


serverData.get('/status', serverCtrl);
// otpData.get('/getGmsUsers', otpCtrl.gmsUsersData);
module.exports = serverData;