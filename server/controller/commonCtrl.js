const {
  apiCallGet,
  apiCallPost,
  apiCallPost1,
} = require("../services/axios.service");
const { sendResponse } = require("../helper");
const constnt = require("../constant");
require("dotenv").config();




async function sendPushNotification(req, res) {
  try {
    const security_key = req.query["security_key"];
    console.log(`Security Key : ${security_key}`);
    console.log(
      `Process Env Security Key : ${process.env.WEBPANEL_SECURITY_KEY}`
    );

    if (!security_key) {
      console.log(
        "...UNAUTHORISED Access ! security key not coming from admin panel..."
      );
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
        console.log(
          "...UNAUTHORISED Access ! security key not coming from admin panel..."
        );
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
        console.log("...Authorisation Check done Sucessfully...");
        let query = "?";

        const notificationType = req.query.notificationType;
        console.log("notificateion type :", notificationType);
        query += "notificationType=" + notificationType;

        
        const version = req.query.version;
        console.log("for version:", version);
        query += "&version=" + version;


        const msg = req.query.msg;
        console.log("msg of notification :", msg);
        query += "&msg=" + msg;


        const url = req.query.url;
        if (url) {
          console.log("url link :", url);
          query += "&url=" + url;
        }


        let server_endPoint =
          process.env.Api_Host +
          process.env.endpoint_sendPushNotification +
          query;
        console.log("enpoint call for notication : ", server_endPoint);

        const token = process.env.BACKEND_TOKEN;
        console.log("token : ", token);
       

        let apiData =await apiCallGet(server_endPoint,token);

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
    console.log("Err in (sendPushNotification)", error);
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

let commonCtrl = { sendPushNotification };

module.exports = commonCtrl;
