const express = require('express');
const creatorData= express.Router();
const creatorCtrl = require('../controller/creatorCtrl');


creatorData.get('/getList', creatorCtrl);
module.exports = creatorData;