const axios=require("axios")
const constnt=require("../constant")


async function apiCallGet(endPoint,token){
  let apiData={}
  try{

    await axios
    .get(endPoint, {
      headers: {
        "x-auth-key": token,
        "Content-Type": "application/json",
      },
    })
    .then((result) => {
     
      if(result){
       result=result.data
       apiData.data=result.data
       apiData.status=result.meta.statusCode
       apiData.error=result.meta.error
       apiData.message=result.meta.message
       apiData.recordTotal=result.meta.recordTotal}
       else{
        apiData.data=[]
        apiData.status=constnt.statusRespnse.SERVER_ERR
        apiData.error=true
        apiData.message=constnt.msgRespnseApiCall[apiData["status"]]
        apiData.recordTotal=0
       }
      
    })
    .catch((err) => {
      console.log("error" + err);
      apiData.data=err.data
      apiData.status=constnt.statusRespnse.SERVER_ERR
      apiData.error=true
      apiData.message=constnt.msgRespnseApiCall[apiData["status"]]
      apiData.recordTotal=0
    });
    return apiData
   }
   catch(err){
    apiData.data=err
    apiData.status=constnt.statusRespnse.SERVER_ERR
    apiData.error=true
    apiData.message=constnt.msgRespnseApiCall[apiData["status"]]
    apiData.recordTotal=0
    return apiData
   }
  }


async function apiCallPost(endPoint,body,token,secret_key){
let apiData={}
try {
  await axios
  .post(endPoint, body, {
    headers: {
      "x-auth-key": token,
      "Content-Type": "application/json",
      "SECRET_KEY":secret_key
    },
  })
  .then((result) => {
   
    if(result){
    result=result.data
    apiData.data=result.data
    apiData.status=result.meta.statusCode
    apiData.error=result.meta.error
    apiData.message=result.meta.message
    apiData.recordTotal=result.meta.recordTotal}
    else{
      apiData.data=[]
      apiData.status=constnt.statusRespnse.SERVER_ERR
      apiData.error=true
      apiData.message=constnt.msgRespnseApiCall[apiData["status"]]
      apiData.recordTotal=0
    }
  })
  .catch((err) => {
    console.log(err)
    apiData.data=[]
    apiData.status=constnt.statusRespnse.SERVER_ERR
    apiData.error=true
    apiData.message=constnt.msgRespnseApiCall[apiData["status"]]
    apiData.recordTotal=0
  });
  return apiData
} catch (error) {
  apiData.data=[]
  apiData.status=constnt.statusRespnse.SERVER_ERR
  apiData.error=true
  apiData.message=constnt.msgRespnseApiCall[apiData["status"]]
  apiData.recordTotal=0
  return apiData
}
}


async function apiCallPost1(endPoint,body,headers){
  
let apiData={}

headers["Content-Type"]="application/json"

console.log("<===inputs for api call=====>")
console.log("api endPointfor Post: ",endPoint)
console.log("headers: ",headers)
console.log("resBody: ",body)
console.log("<===inputs for api call=====>")

try {
  await axios
  .post(endPoint, body, {
    headers: headers
  })
  .then((result) => {

     if(result){
    result=result.data
    apiData.data=result.data
    apiData.status=result.meta.statusCode
    apiData.error=result.meta.error
    apiData.message=result.meta.message
    apiData.recordTotal=result.meta.recordTotal}
    else{
      apiData.data=[]
      apiData.status=constnt.statusRespnse.SERVER_ERR
      apiData.error=true
      apiData.message=constnt.msgRespnseApiCall[apiData["status"]]
      apiData.recordTotal=0
    }
  })
  .catch((err) => {
    console.log(err.response)
    apiData.data=[]
    apiData.status=constnt.statusRespnse.SERVER_ERR
    apiData.error=true
    apiData.message=constnt.msgRespnseApiCall[apiData["status"]]
    apiData.recordTotal=0
  });
  return apiData
} catch (error) {
  apiData.data=[]
  apiData.status=constnt.statusRespnse.SERVER_ERR
  apiData.error=true
  apiData.message=constnt.msgRespnseApiCall[apiData["status"]]
  apiData.recordTotal=0
  return apiData
}
}

module.exports={apiCallGet,apiCallPost,apiCallPost1}