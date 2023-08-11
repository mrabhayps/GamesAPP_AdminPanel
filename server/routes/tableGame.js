const express=require("express")
const tableGame=express.Router()
const tableGamesCtrl=require("../controller/tableGameCtrl")


tableGame.post("/tfgRefundTxn",tableGamesCtrl.tfgRefundTxn)
tableGame.get("/getAllTfgStuckTxn",tableGamesCtrl.getAllTfgStuckTxn)



module.exports=tableGame