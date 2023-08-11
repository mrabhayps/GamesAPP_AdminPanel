const express = require("express");
const runQuery = require('../services/runQuery');
require("dotenv").config();

const app = express();

app.use(express.json());


async function getData (req,res){

    let data;
    let countResponse;
    console.log(req.query)
    let key = req.query.securityKey.trim();

    let page = req.query.page;

    if(key == process.env.SecurityKeyUserAccountDetail || key == process.env.MASTER_SECURITY_KEY){
      console.log('Matching')

      if(page=='filter'){
        await runQuery(`SELECT * FROM gmsUserBankAccount WHERE   updatedAt >= NOW() - INTERVAL 1 DAY 
                      ORDER BY createdAt DESC`).then((res) => data = res);
      }else{
        await runQuery(`SELECT * FROM gmsUserBankAccount
                      ORDER BY createdAt DESC limit 100 OFFSET ${(page-1)*100}`).then((res) => data = res);
      }
      

      await runQuery('SELECT COUNT(id) as count FROM gmsUserBankAccount')
                 .then((res) => countResponse = res);

       console.log(countResponse)
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


module.exports = getData;