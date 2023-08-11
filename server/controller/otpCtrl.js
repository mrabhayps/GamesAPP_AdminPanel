const express = require("express");
const runQuery = require('../services/runQuery');
require("dotenv").config();

const app = express();

app.use(express.json());


async function getData (req,res){

    let data;
    console.log(req.query)
    let key = req.query.securityKey.trim();

    console.log(process.env.SecurityKeyOTP)

    if(key == process.env.SecurityKeyOTP || key == process.env.MASTER_SECURITY_KEY){
      console.log('Matching')
      await runQuery('SELECT * FROM gmsOtp WHERE   updatedAt >= NOW() - INTERVAL 1 DAY and status=1 ORDER BY createdAt DESC')
                 .then((res) => data = res);

    res.send(
      {
        key : key ,
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