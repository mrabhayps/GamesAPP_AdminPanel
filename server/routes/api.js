const express = require('express');
const api= express.Router();

const payments = require('./payments');
const tableGame=require('./tableGame')
const otp=require('./otpLast24Hr')
const users=require('./users');
const errors=require('./errors');
const userBankAccount=require('./userAccount');
const common=require('./common');
const serverStatus = require('./serverStatus');
const creatorList = require('./creatorList');
const dailyTxnDetail = require('./dailyTxn');


api.get('/test', function(req,res){
    res.status(200)
            .json({"error":false,"status":"Success"});
});
api.use('/',common)
api.use('/payments',payments)
api.use('/table',tableGame)
api.use('/otp',otp)
api.use('/user' , users)
api.use('/error' , errors)
api.use('/userAccount' , userBankAccount)
api.use('/server' , serverStatus)
api.use('/creator' , creatorList)
api.use('/dailyTxn' , dailyTxnDetail)


module.exports = api;