function sendResponse(res,data,error,statusCode,message,recordTotal,errorCode=null){
    return res.status(statusCode).json({
     meta:{
         error:error,
         status:statusCode,
         message:message,
         recordTotal:recordTotal,
         errorCode:null
     },
     data:data
    })
 }

 
 module.exports={sendResponse}