const express = require('express');
const public = express.Router();
const path = require('path');

const paymentRoutes = require('../view/payments/paymentRoutes');
// const tableRouter=require('../view/table/tableRouter')
const commonRoutes=require('../view/common/commonRoutes')

public.get('/test', function(req,res){
    console.log("Dir Name : ",__dirname);
    res.sendFile(path.join(__dirname+'/view/test.html'));
});

public.use('/payments',paymentRoutes)
// public.use('/table',tableRouter)
public.use('/',commonRoutes)

module.exports = public;