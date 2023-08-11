const express = require('express');
const table= express.Router();
const path = require('path');

table.use('/tfgRefundTxn',function(req,res){
    console.log(__dirname);
    res.sendFile(path.join(__dirname+'/tfgRefundTxn.html'));
    //__dirname : It will resolve to your project folder.
});
table.use('/tfgGetAllStuckTxn',function(req,res){
    console.log(__dirname);
    res.sendFile(path.join(__dirname+'/tfgGetAllStuckTxn.html'));
    //__dirname : It will resolve to your project folder.
});


module.exports=table