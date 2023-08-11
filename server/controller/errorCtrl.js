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
    let days = req.query.days;

    if(key == process.env.SecurityKeyError || key == process.env.MASTER_SECURITY_KEY){
      console.log('Matching')

      //to get Errors for last n days

      if(days>1){
        await runQuery(`SELECT * FROM gmsErrorLog WHERE   createdAt >= NOW() - INTERVAL ${days} DAY 
        ORDER BY createdAt DESC limit 100 OFFSET ${(page-1)*100}`)
        .then((res) => data = res);

        await runQuery(`SELECT COUNT(id) as count FROM gmsErrorLog WHERE   createdAt >= NOW() - INTERVAL ${days} DAY`)
              .then((res) => countResponse = res);

        res.send({
        count: countResponse[0].count,
        data : data
      });

      return;

      }

      //To get Errors in last 1 day

      await runQuery(`SELECT * FROM gmsErrorLog WHERE   createdAt >= NOW() - INTERVAL 1 DAY 
                      ORDER BY createdAt DESC limit 100 OFFSET ${(page-1)*100}`)
                 .then((res) => data = res);

      await runQuery('SELECT COUNT(id) as count FROM gmsErrorLog WHERE   createdAt >= NOW() - INTERVAL 1 DAY')
                 .then((res) => countResponse = res);

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