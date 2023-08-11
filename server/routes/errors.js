const express = require('express');
const errorData= express.Router();
const errorCtrl = require('../controller/errorCtrl');


errorData.get('/getErrors', errorCtrl);
module.exports = errorData;