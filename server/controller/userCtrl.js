const express = require("express");
const runQuery = require('../services/runQuery');
require("dotenv").config();
const { sendResponse } = require("../helper");

const app = express();

app.use(express.json());


async function getData (req,res){

    let data;
    let countResponse;
    console.log(req.query)
    console.log(process.env.SecurityKeyUserDetail);
    let key = req.query.securityKey.trim();
    let page = req.query.page;

    if(key == process.env.SecurityKeyUserDetail || key == process.env.MASTER_SECURITY_KEY){
      console.log('Matching')

      if(page=='filter'){
        await runQuery(`SELECT * FROM gmsUsers WHERE   updatedAt >= NOW() - INTERVAL 1 DAY 
                      ORDER BY createdAt DESC`).then((res) => data = res);
      }else{
        await runQuery(`SELECT * FROM gmsUsers WHERE   updatedAt >= NOW() - INTERVAL 1 DAY 
                      ORDER BY createdAt DESC limit 100 OFFSET ${(page-1)*100}`).then((res) => data = res);
      }
      

      await runQuery('SELECT COUNT(id) as count FROM gmsUsers WHERE   updatedAt >= NOW() - INTERVAL 1 DAY')
                 .then((res) => countResponse = res);

      // console.log(Array.isArray(countResponse))
      // let countObj = countResponse[0]

      // let countKeys = Object.keys(countObj);
      
      // let countValue = countObj[countKeys[0]];
      // console.log(countValue);

    res.send(
      {
        count: countResponse[0].count,
        data : data
      });

      return;
    }
    else{
      res.status(401).json({
        data : "Not Authorized"
      })
      return;
    }
}

async function getUserDetailDailyBasic(req,res){

let data ;
console.log(req.query)
console.log(process.env.SecurityKeyUserDetail);
let key = req.query.securityKey.trim();
let date = req.query.date;
  if(key == process.env.SecurityKeyUserDetail){

    if (new Date(date) <= new Date()) {
      try {
        data = await runQuery(`SELECT * FROM gmsUsers WHERE DATE(createdAt) = '${date}'`);
        res.status(200).json({ data: data });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }else{
      return sendResponse(res, [], true, 400, "Date must be prior to current date", 0);
    }

  }else{
    res.status(401).json({
      data : "Not Authorized"
    })
    return;
  }
}

async function cronJobStatus(req,res){
  
  const cronId = req.query['cronId'];
  let url = `http://${process.env.Api_Host}/api/v1/cronjobstatus?cronId=${cronId}`;

  let resultData;
  await fetch(url, {
    method: "GET",
    headers: {
      "secretkey": "QihGLPwEHdwtg1QudRxVH3Ek6Gd2ofn5"
    }
  }).then((result) => {
    result.json().then((result) => {
      if (result.data) {
        resultData = result.data;
        console.log(result);
        return sendResponse(res, resultData, true, 200, "success", result.meta.recordTotal);
      }
    })
  })

}

let User = {
  getData,
  getUserDetailDailyBasic,
  cronJobStatus
}
module.exports = User;