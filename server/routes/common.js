const express = require('express');
const common= express.Router();
const commonCtrl=require("../controller/commonCtrl")


common.get("/sendPushNotification",commonCtrl.sendPushNotification)


module.exports=common