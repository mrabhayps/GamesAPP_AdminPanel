const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

async function getStatus(req,res){
    const data = await fetch(process.env.Api_Host + process.env.endpoint_serverStatus).then(res => res.json())
    .then(data => data.data.serverStatus);

    console.log(data);

    res.send({
        data : data
    })
}

module.exports = getStatus;