const express = require("express");
const runQuery = require('../services/runQuery');
require("dotenv").config();

const app = express();

app.use(express.json());


async function getData (req,res){

    let data = {};
    console.log(req.query)
    let key = req.query.securityKey.trim();

    let page = req.query.page;

    if(key == process.env.SecurityKeyCountTxn || key == process.env.MASTER_SECURITY_KEY){
      console.log('Matching')

      if(page=='filter'){
        await runQuery(`SELECT * FROM gmsUserBankAccount WHERE   createdAt >= NOW() - INTERVAL 30 DAY 
                      ORDER BY createdAt DESC`).then((res) => data = res);
      }else{
        await runQuery(`SELECT COUNT(id) AS count FROM gmsPaymentTransactionLogWithdraw WHERE requestType=10 AND
        payStatus='10' AND  createdAt >= NOW() - INTERVAL 1 DAY`).then((res) => data.withdrawalSuccess = res);

        await runQuery(`SELECT COUNT(id) AS count FROM gmsPaymentTransactionLogWithdraw WHERE requestType=10 AND 
        payStatus='20' AND createdAt >= NOW() - INTERVAL 1 DAY`).then((res) => data.withdrawalFail = res);

         
        await runQuery(`SELECT COUNT(id) AS count FROM gmsPaymentTransactionLogDeposit WHERE requestType=10 AND
        payStatus='10' AND  createdAt >= NOW() - INTERVAL 1 DAY`).then((res) => data.depositSuccess = res);

         
        await runQuery(`SELECT COUNT(id) AS count FROM gmsPaymentTransactionLogDeposit WHERE payStatus='20' AND 
        requestType=10 AND createdAt >= NOW() - INTERVAL 1 DAY`).then((res) => data.depositFail = res);
    }
      

    //   console.log(Array.isArray(countResponse))
    //   let countObj = countResponse[0]

    //   let countKeys = Object.keys(countObj);
      
    //   let countValue = countObj[countKeys[0]];
    //   console.log(countValue);

    res.send(
      {
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


module.exports = getData;