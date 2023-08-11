const user = require('../model/user');
const express = require('express');

const app = express();

app.use(express.json());

async function User (req,res) {
    const data = await user.findAll({limit : 50}) ;

    console.log('aaaaaa');
    console.log(data);
    res.send({
        data : data
    })
}

module.exports = User ;