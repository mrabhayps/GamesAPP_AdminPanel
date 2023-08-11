const express = require('express');
const userAccountData= express.Router();
const userAccountCtrl = require('../controller/userAccountCtrl');


userAccountData.get('/getDetails', userAccountCtrl);
module.exports = userAccountData;