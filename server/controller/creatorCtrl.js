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

    if(key == process.env.SecurityKeyCreator || key == process.env.MASTER_SECURITY_KEY){
      console.log('Matching')

      if(page=='filter'){
        await runQuery(`SELECT * FROM gmsUserBankAccount WHERE   createdAt >= NOW() - INTERVAL 30 DAY 
                      ORDER BY createdAt DESC`).then((res) => data = res);
      }else{
        await runQuery(`SELECT gmsUsers.firstName AS firstName, gmsUsers.lastName AS lastName
                      , gmsUsers.mobile AS mobile , gmsUserCreators.*
                      FROM gmsUserCreators JOIN gmsUsers ON gmsUserCreators.fkUserId = gmsUsers.id
                      ORDER BY createdAt DESC limit 100 OFFSET ${(page-1)*100}`).then((res) => data = res);
      }
      

      await runQuery('SELECT COUNT(id) as count FROM gmsUserCreators')
                 .then((res) => countResponse = res);

      // console.log(Array.isArray(countResponse))
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