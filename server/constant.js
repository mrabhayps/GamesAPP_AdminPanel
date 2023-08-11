const statusRespnse={
    "OK":200,
    "BAD_REQUEST":400,
    "NOT_FOUND":404,
    "UNAUTHORISED":403,
    "SERVER_ERR":500,
    "DB_ERR":502
 }

const msgRespnseApiCall={
    200:"OK",
    400:"Bad Reques",
    403:"Unauthorised Access",
    404:"API not found",
    500:" Internal Server Error"
}


let constnt={statusRespnse,msgRespnseApiCall}

module.exports=constnt