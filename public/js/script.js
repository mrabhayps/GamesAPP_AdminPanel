/*functionality= to get all the withdraw trasaction which
 is in pending from web backend
*/

async function pendngWithdrwAllTxn() {
  try {
    let security_key = document.getElementById("security_key").value;
    let public_endPoint = public_API.Api_host + public_API.endPoint_withdrawPendngFrApprvalList + "?security_key=" + security_key;
    
    await fetch(public_endPoint, {
      method: "GET"
    })
      .then((result) => {
        if (result) {
          if (result.status == 500) {
            let text = result.statusText;
            response(text);
          } else {
            result.json().then((result) => {
              
              if (result) {
                
                data = result.data;

                if (data && data.length > 0) {
                  let tabledata = "";

                  data.forEach((value) => {
                    let [logId, username, amount, mobile, time] = [
                      value.logId,
                      value.username,
                      value.amount,
                      value.mobile,
                      value.createdAt,
                    ];
                    tabledata += `<tr>
                 <td>${logId}</td>
                 <td>${username}</td>
                 <td>${amount}</td>
                 <td>${mobile}</td>
                 <td>${time}</td>
                  <td><button onclick="tnxPendingForApproval(${logId},${30})">approve</button>
                  <button onclick="tnxPendingForApproval(${logId},${20})">reject</button></td>
                 </tr>`;
                  });
                  document.getElementById("table_data").innerHTML = tabledata;
                } else {
                  let text = result.meta.message;
                  response(text);
                }
              } else {
                let text = "Internal Server error";
                response(text);
              }
            });
          }
        } else {
          let text = "Internal Server error";
          response(text);
        }
      })
      .catch((err) => {
        console.log(err);
        let text = err;
        response(text);
      });
  } catch (error) {
    console.log(error);
    let text = "Internal server error";
    response(text);
  }
}

/*
functionality= to approveor or  reject all the withdraw transaction 
which is pending for approval
*/
const aprrvalStatus={
  30:"Approve",
  20:"Reject"
}

async function tnxPendingForApproval(logId, status) {
  try {
    const security_key = document.getElementById("security_key").value;

    let public_endPoint =
      public_API.Api_host + public_API.endPoint_withdrawTxnApprval;
   
    let data = {};
     
    data.logId = logId;
    data.status = status;
    data.security_key=security_key;
    data = JSON.stringify(data);

    let text=aprrvalStatus[status]+" request initiated with logId : "+logId+" wait untitl it proceed"
    response(text)

    await fetch(public_endPoint, {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: data,
    })
      .then((result) => {
        result
          .text()
          .then((result) => {
            result = JSON.parse(result);
            if(result.meta.status==200){
              pendngWithdrwAllTxn();
            }
            let text = result.meta.message+" for logId:"+logId;

            return response(text);
          })
          .catch((err) => {
            console.log(err);
            let text = err;
            return response(text);
          });
      })
      .catch((err) => {
        let text = err;
        console.log(err);
        return response(text);
      });
  } catch (err) {
    let text = "Internal server Error";
    response(text);
  }
}







 const payStatus_depositlog={
  10:"Success",
  20:"Failure",
  30:"pending"
 }
/*functionality to get last hour deposit txn and all pending txn list
  attributes for only getting pending txn  and isCallForpendingTxnListNextorPrev= true when 
  next page is required 
*/
async function  getDepositTXNList(page=0,page_size=20,isCallForpendingTxnListNextorPrev=false){
  try {
    //getting list_option(1.last hr txn,2.all pending txn) && security_key from webpanel
    const security_key = document.getElementById("security_key").value
    const getTxnDepositType=document.getElementById("list_option").value
    console.log("page",page)
    console.log("page_size",page_size)

    let query=""
    let paginateOption=false
    let paginateQuery=""

     //for all pending txn query addition
    if(getTxnDepositType=="allPendingTxn"|| isCallForpendingTxnListNextorPrev == "true"){
     query="&isAllPendingDepositTxn="+true
     paginateOption=true
     paginateQuery="&page="+page+"&page_size="+page_size

    }
    //for last hour txn list query addition
    else if(getTxnDepositType=="lastHrTXN"){
      query="&isAllPendingDepositTxn="+false
    }
    //if we don't choose any option
    else{
      let text="Please select an option"
      response(text)
    }
    if(query.length>0){

      let public_endPoint =
       public_API.Api_host + public_API.endPoint_getDepositTxnList+"?security_key=" + security_key
       +query+paginateQuery
       

    
      let tabledata = ""
      let prevnextbutton=""
     await fetch(public_endPoint, {
      method: "GET"
      })
      .then((result) => {
        if (result) {
          if (result.status == 500) {
            document.getElementById("table_data").innerHTML=tabledata
            let text = result.statusText;
            response(text);
          } else {
            result.json().then((result) => {
              if (result) {
                data = result.data;
               if (data && data.length > 0) {

                //preparaing data to render table in html page
                  data.forEach((value) => {
                    let [logID, userName, Amount, createdAt, updatedAt,status] = [
                      value.logId,
                      value.username,
                      value.amount,
                      value.createdAt,
                      value.updatedAt,
                      payStatus_depositlog[value.payStatus]
                    ];
                    tabledata += `<tr>
                 <td>${logID}</td>
                 <td>${userName}</td>
                 <td>${Amount}</td>
                 <td>${createdAt}</td>
                 <td>${updatedAt}</td>
                  <td>${status}</td>
                 </tr>`;
                  });

                  //if pagination option is available for all pending txn
                  if(paginateOption){
                    if(page>0){
                      prevnextbutton+=`<button type="button" onclick="getDepositTXNList(${page-1},${page_size},${true})">Prev</button>`
                    }
                    if(data.length>=20){
                      prevnextbutton+=`<button type="button" onclick="getDepositTXNList(${page+1},${page_size},${true})">Next</button>`
                    }
                  }

                  document.getElementById("table_data").innerHTML = tabledata;
                  document.getElementById("prev_next_button").innerHTML=prevnextbutton
                } else {
                  //if no txn is there to render
                  document.getElementById("table_data").innerHTML=tabledata;
                  document.getElementById("prev_next_button").innerHTML=prevnextbutton
                  let text = result.meta.message;
                  response(text);
                }
              } else {
                document.getElementById("table_data").innerHTML=tabledata;
                document.getElementById("prev_next_button").innerHTML=prevnextbutton
                let text = "Internal Server error";
                response(text);
              }
            });
          }
        } else {
          document.getElementById("table_data").innerHTML=tabledata;
          document.getElementById("prev_next_button").innerHTML=prevnextbutton
          let text = "Internal Server error";
          response(text);
        }
      })
      .catch((err) => {
        console.log(err);
        let text = err;
        response(text);
      });
    }
  } catch (error) {
    let text="Internal server Error"
    response(text)
  }

}


//to create response in the screen
function response(text) {
  let para = document.createElement("p");
  para.innerText = text;
  document.body.appendChild(para);
  return;
}
