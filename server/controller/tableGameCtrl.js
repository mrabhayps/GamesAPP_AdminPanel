const { apiCallGet, apiCallPost,apiCallPost1} = require("../services/axios.service");
const { sendResponse } = require("../helper");
const constnt = require("../constant");
require("dotenv").config();

/*
date=14.02.2023
Api-functionality= refund the amount stuck in table format game (connected to 
    node backend /games/table/refundTxn)
*/
async function tfgRefundTxn(req, res) {
  try {
    //txId getting from the adminpanel
    const gameTxnId = req.body.gameTxnId;
    console.log("game Txn Id:",gameTxnId)

    const security_key = req.query["security_key"];
    console.log(`Security Key : ${security_key}`);
    console.log(
      `Process Env Security Key : ${process.env.WEBPANEL_SECURITY_KEY}`
    );

    if (!security_key) {
      statusCode = constnt.statusRespnse.UNAUTHORISED;
      return sendResponse(
        res,
        [],
        true,
        statusCode,
        constnt.msgRespnseApiCall[statusCode],
        0
      );
    } else {
      if (security_key != process.env.WEBPANEL_SECURITY_KEY) {
        statusCode = constnt.statusRespnse.UNAUTHORISED;
        return sendResponse(
          res,
          [],
          true,
          statusCode,
          constnt.msgRespnseApiCall[statusCode],
          0
        );
      } else {
        //api endpoint of node backend
        const server_endPoint =
          process.env.Api_Host + process.env.endpoint_tfgRefundTxn;

        //secretkey and token taking from env file
        const secretKey = process.env.TFG_REFUND_API_SECRET;
        const token = process.env.BACKEND_TOKEN;


        let requestBody = {};
        let headers = {};
        let statusCode;


        requestBody["gameTxnId"] = gameTxnId
        requestBody["secretKey"]= secretKey
        headers["x-auth-key"]=token;

        //api call to node backend  for refund
        const apiData = await apiCallPost1(server_endPoint, requestBody, headers);
        if (apiData) {
          return sendResponse(
            res,
            apiData.data,
            apiData.error,
            apiData.status,
            apiData.message,
            apiData.recordTotal
          );
        } else {
          statusCode = constnt.statusRespnse.SERVER_ERR;
          return sendResponse(
            res,
            [],
            true,
            statusCode,
            constnt.msgRespnseApiCall[statusCode],
            0
          );
        }
      }
    }
  } catch (error) {
    let statusCode = constnt.statusRespnse.SERVER_ERR;
    return sendResponse(
      res,
      [],
      true,
      statusCode,
      constnt.msgRespnseApiCall[statusCode],
      0
    );
  }
}
/*
date=14.02.2023
Api-functionality= get all stuck Txn for table format game (connected to 
    node backend /games/table/getStuckTrxnList)
*/
async function getAllTfgStuckTxn(req, res) {
  try {

    const security_key = req.query["security_key"];
    console.log(`Security Key : ${security_key}`);
    console.log(
      `Process Env Security Key : ${process.env.WEBPANEL_SECURITY_KEY}`
    );

    if (!security_key) {
      statusCode = constnt.statusRespnse.UNAUTHORISED;
      return sendResponse(
        res,
        [],
        true,
        statusCode,
        constnt.msgRespnseApiCall[statusCode],
        0
      );
    } else {
      if (security_key != process.env.WEBPANEL_SECURITY_KEY) {
        statusCode = constnt.statusRespnse.UNAUTHORISED;
        return sendResponse(
          res,
          [],
          true,
          statusCode,
          constnt.msgRespnseApiCall[statusCode],
          0
        );
      } else {
        
        const token = process.env.BACKEND_TOKEN;
        console.log("token frm Process env variable: ",token)
        
         //api endpoint of node backend
        const server_endPoint =
          process.env.Api_Host + process.env.endpoint_tfgGetAllStuckTxn;
        
        //node backend api call for all stuck Txn
        const apiData = await apiCallGet(server_endPoint, token);
        if (apiData) {
          return sendResponse(
            res,
            apiData.data,
            apiData.error,
            apiData.status,
            apiData.message,
            apiData.recordTotal
          );
        } else {
          console.log("Err_getAllStuckTxn(Web Backend) :",error)
          statusCode = constnt.statusRespnse.SERVER_ERR;
          return sendResponse(
            res,
            [],
            true,
            statusCode,
            constnt.msgRespnseApiCall[statusCode],
            0
          );
        }
      }
    }
  } catch (error) {
    console.log("Err_getAllStuckTxn(Web Backend) :",error)
    let statusCode = constnt.statusRespnse.SERVER_ERR;
    return sendResponse(
      res,
      [],
      true,
      statusCode,
      constnt.msgRespnseApiCall[statusCode],
      0
    );
  }
}
const tableGamesCtrl = { tfgRefundTxn ,getAllTfgStuckTxn};

module.exports = tableGamesCtrl;
