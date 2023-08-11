/*
This  function for refund the tfg stuck transaction by Id or by the list 
if , 
call by id isFncCallfrmgetAllTFGStuckTxn will be false and gameTxnId will be null
else, 
if call from the getAllTFGStuckTxn function isFncCallfrmgetAllTFGStuckTxn=true 
and gameTxnId get from attributes
*/

async function tfgRefundTxn(isFncCallfrmgetAllTFGStuckTxn = false, gameTxnId = null) {
  try {
    let security_key = document.getElementById("security_key").value;
    //endpoint of admin  backend
    let publicAPI = public_API.Api_host + public_API.endpoint_tfgRefundTxn + "?security_key=" + security_key;

    if (!isFncCallfrmgetAllTFGStuckTxn) {
      //get txnId from html input field
      gameTxnId = document.getElementById("refund_txn").value;
    }

    let body = {};
    body.gameTxnId = gameTxnId;

    let reqBody = JSON.stringify(body);

    await fetch(publicAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqBody,
    })
      .then((result) => {
        result.text().then((result) => {
          result = JSON.parse(result);
          if (result.meta.status == 200 && isFncCallfrmgetAllTFGStuckTxn) {
            getAllTFGStuckTxn(true);
          }
          let text = result.meta.message;
          response(text);
        });
      })
      .catch((error) => {
        console.log("error:" + error);
        let text = "Internal server error";
        response(text);
      });
  } catch (error) {
    console.log("error:" + error);
    let text = error;
    return response(text);
  }
}
/*
This function is to get all the transaction stuck  for tfg,
and also for update the list after end of it 
*/

async function getAllTFGStuckTxn(isCallforUpdateList = false) {
  try {
    let security_key = document.getElementById("security_key").value;
    let public_endPoint =
      public_API.Api_host +
      public_API.endPoint_getAllTfgStuckTxn +
      "?security_key=" +
      security_key;

    await fetch(public_endPoint, {
      method: "GET",
    })
      .then((result) => {
        if (result) {
          if (result.status == 500) {
            let text = result.statusText;
            response(text);
          } else {
            result.json().then((result) => {
              if (result.data) {
                data = result.data;
              }
              let tabledata = "";
              if (data && data.length > 0) {
                data.forEach((value) => {
                  let [gameTxnId, UserName, Amount, Time] = [
                    value.gameTxnId,
                    value.username,
                    value.amount,
                    value.createdAt,
                  ];

                  tabledata += `<tr>
                 <td>${gameTxnId}</td>
                 <td>${UserName}</td>
                 <td>${Amount}</td>
                 <td>${Time}</td>
                  <td><button onclick="tfgRefundTxn(${true},'${gameTxnId}')">End</button></td>
                 </tr>`;
                });
              } else {
                if (!isCallforUpdateList) {
                  let text = result.meta.message;
                  response(text);
                }
              }
              document.getElementById("table_data").innerHTML = tabledata;
            });
          }
        } else {
          let text = "Internal Server error";
          response(text);
        }
      })
      .catch((err) => {
        console.log("Error", err);
        let text = err;
        response(text);
      });
  } catch (error) {
    console.log("Error", error);
    let text = "Internal server error";
    response(text);
  }
}
