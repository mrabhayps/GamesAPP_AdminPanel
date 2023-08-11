const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const cors=require("cors")
require('dotenv').config()

const api = require('./server/routes/api');
const public = require('./public/routes/public');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname+"/public")));// default URL for website

app.use('/api/v1',api); //Routs for Server
app.use('/_v',public); //Routs for Client

app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/public/view/index.html'));
    //__dirname : It will resolve to your project folder.
});


const server = http.createServer(app);
const port = process.env.PORT;
server.listen(port);
console.log('Server listening on port ' + port);