const express = require('express');
const common= express.Router();
const path = require('path');


common.use('/sendPushNotification',function(req,res){
    console.log(__dirname);
    res.sendFile(path.join(__dirname+'/sendPushNotification.html'));
    //__dirname : It will resolve to your project folder.
});

common.use('/countTxnDetails',function(req,res){
    console.log(__dirname);
    res.sendFile(path.join(__dirname+'/countTxnDetails.html'));
    //__dirname : It will resolve to your project folder.
});

module.exports=common