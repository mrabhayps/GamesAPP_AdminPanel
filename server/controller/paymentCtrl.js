
const { apiCallGet, apiCallPost } = require("../services/axios.service")
const { sendResponse } = require("../helper");
const constnt = require("../constant")
const runQuery = require('../services/runQuery');
require("dotenv").config();



let payment = {
  getAllWithdrawApprovalPendingTxn,
  updateWithdrawApprovalPendingTxn,
  getDepositTxnList,
  getWithdrawnTransactionsList,
  getExternalApiLogWithdraws,
  getTransactionHistoryDetails,
  getUserIdBasedData,
  getTopActivities,
  getLeaderboardData
}
async function getLeaderboardData(req, res) {
  const security_key = req.query['security_key'];
  let statusCode;
  if (!security_key) {
    statusCode = constnt.statusRespnse.UNAUTHORISED
    return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
  } else {
    if (security_key != process.env.WEBPANEL_SECURITY_KEY_topActivities && security_key != process.env.MASTER_SECURITY_KEY) {
      statusCode = constnt.statusRespnse.UNAUTHORISED
      return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
    }
  }
  let url = 'https://weeklyleaderboardstats-uat.abhishekrana.workers.dev/?playerId=230886';
  await fetch(url, {
    method: "GET",
  }).then((result) => {
    result.json().then((result) => {
      console.log(result)
      if (result.data) {
        resultData = result;
        console.log(result);
        return sendResponse(res, resultData, true, 200, "success", 0);
      }
    })
  })

}

async function getTopActivities(req, res) {
  const security_key = req.query['security_key'];
  let statusCode;
  if (!security_key) {
    statusCode = constnt.statusRespnse.UNAUTHORISED
    return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
  } else {
    if (security_key != process.env.WEBPANEL_SECURITY_KEY_topActivities && security_key != process.env.MASTER_SECURITY_KEY) {
      statusCode = constnt.statusRespnse.UNAUTHORISED
      return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
    }
  }
  let topActivityDataFinal;
  let withdrawData = await runQuery(`SELECT 'WITHDRAW FAIL'  as ActivityType,
  CONCAT('User ID : ', COALESCE(fkSenderId, '---'), ', Amount : ', 
  COALESCE(amount,0), ', TDS : ', COALESCE(tds,0), ', PG REF NO : ', COALESCE(pgRefNo,'--') ) as ActivityDetails,
  createdAt
  FROM gmsPaymentTransactionLogWithdraw
  WHERE requestType=10 AND payStatus=20 AND fkSenderId !=700
  ORDER BY createdAt DESC
  LIMIT 100;`)
  let depositData = await runQuery(`SELECT 'DEPOSIT FAIL'  as ActivityType,
CONCAT('User ID : ', COALESCE(fkSenderId, '---'), ', Amount : ', 
COALESCE(amount,0),', PG REF NO : ', COALESCE(pgRefNo,'--') ) as ActivityDetails,
createdAt
FROM gmsPaymentTransactionLogDeposit
WHERE requestType=10 AND payStatus=20 AND fkSenderId !=700
ORDER BY createdAt DESC
LIMIT 100;`)
  let withdrawGreaterThanFivehundred = await runQuery(`
SELECT 'WITHDRAWS MORE THAN 500'  as ActivityType,
  CONCAT('User ID : ', COALESCE(fkSenderId, '---'), ', Amount : ', 
  COALESCE(amount,0), ', TDS : ', COALESCE(tds,0), ', PG REF NO : ', COALESCE(pgRefNo,'--') ) as ActivityDetails,
  createdAt
  FROM gmsPaymentTransactionLogWithdraw
  WHERE amount>500 AND fkSenderId !=700
  ORDER BY createdAt DESC
  LIMIT 100;
`);
  let depositMoreThanThousand = await runQuery(`SELECT 'DEPOSITS MORE THAN 1000'  as ActivityType,
CONCAT('User ID : ', COALESCE(fkSenderId, '---'), ', Amount : ', 
COALESCE(amount,0),', PG REF NO : ', COALESCE(pgRefNo,'--') ) as ActivityDetails,
createdAt
FROM gmsPaymentTransactionLogDeposit
WHERE amount>1000 AND fkSenderId !=700
ORDER BY createdAt DESC
LIMIT 100`);
  let userReporting = await runQuery(`SELECT 'USER REPORTS'  as ActivityType,
CONCAT('User ID : ', COALESCE(fkUserId, '---'), ', REPORTED USER ID: ', 
COALESCE(reportedUserId,0),', REPORT TYPE : ', COALESCE(reportType,'--') ) as ActivityDetails,
createdAt
FROM gmsReportedUser
WHERE fkUserId !=700
ORDER BY createdAt DESC
LIMIT 10`)
  topActivityDataFinal = [...withdrawData, ...depositData, ...withdrawGreaterThanFivehundred, ...depositMoreThanThousand, ...userReporting].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  let result = topActivityDataFinal.slice(0, 100);
  return sendResponse(res, result, true, 200, "success", result.length);

}
async function getUserIdBasedData(req, res) {
  const security_key = req.query['security_key'];
  const userId = req.query['userID'];
  const mobileNumber = req.query['mobile'];
  let statusCode;
  if (!security_key) {
    statusCode = constnt.statusRespnse.UNAUTHORISED
    return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
  } else {
    if (security_key != process.env.WEBPANEL_SECURITY_KEY_userIdSecurityKey && security_key != process.env.MASTER_SECURITY_KEY) {
      statusCode = constnt.statusRespnse.UNAUTHORISED
      return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
    }
  }
  let otpData;
  if (mobileNumber) {
    otpData = await runQuery(`SELECT * FROM gmsOtp WHERE mobile=${mobileNumber} limit 10`);
  } else {
    otpData = [];
  }
  let userData = await runQuery(`SELECT * FROM gmsUsers WHERE id=${userId}`);
  let bankData = await runQuery(`SELECT * FROM gmsUserBankAccount WHERE fkUserId=${userId} AND isActive=1`);
  let depositData = await runQuery(`SELECT * FROM gmsPaymentTransactionLogDeposit 
  WHERE (fkSenderId=${userId} or fkReceiverId=${userId}) ORDER BY gmsPaymentTransactionLogDeposit.createdAt desc
  LIMIT 50`);
  let withdrawData = await runQuery(`SELECT * FROM gmsPaymentTransactionLogWithdraw
WHERE (fkSenderId=${userId} or fkReceiverId=${userId}) ORDER BY gmsPaymentTransactionLogWithdraw.createdAt desc
LIMIT 50`);

  return sendResponse(res, [otpData, userData, bankData, depositData, withdrawData], true, 200, "success", 0);

}
async function getTransactionHistoryDetails(req, res) {

  console.log(req.query);

  const security_key = req.query['security_key'];
  const trueOrFalse = req.query['trueOrFalse'];
  const userId = req.query['userID'];
  const typeValue = req.query['txnHistoryTypeValue'];
  const page = req.query['page'];
  const pageSize = req.query['pageSize'];
  let statusCode;
  if (!security_key) {
    statusCode = constnt.statusRespnse.UNAUTHORISED
    return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
  } else {
    if (security_key != process.env.WEBPANEL_SECURITY_KEY_txnHistorySecurityKey && security_key != process.env.MASTER_SECURITY_KEY) {
      statusCode = constnt.statusRespnse.UNAUTHORISED
      return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
    }
  }

  let url = `http://${process.env.TransactionHistory_Host}/api/v1/transaction/history?latest=${trueOrFalse}&userId=${userId}&txnHistoryType=${typeValue}&page=${page}&page_size=${pageSize}`;

  let resultData;
  await fetch(url, {
    method: "GET",
    headers: {
      "secretkey": "QihGLPwEHdwtg1QudRxVH3Ek6Gd2ofn5"
    }
  }).then((result) => {
    result.json().then((result) => {
      console.log(result)
      if (result.data) {
        resultData = result.data;
        console.log(result);
        return sendResponse(res, resultData, true, 200, "success", result.meta.recordTotal);
      }
    })
  })

}

async function getExternalApiLogWithdraws(req, res) {
  let offset = parseInt(req.query['pageNo']) === 1 ? 0 : (parseInt(req.query['pageNo']) - 1) * 100;
  let tableRows;
  let totalCount;
  const security_key = req.query['security_key'];
  let statusCode;
  if (!security_key) {
    statusCode = constnt.statusRespnse.UNAUTHORISED
    return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
  } else {
    if (security_key != process.env.WEBPANEL_SECURITY_KEY_externalApiLogWithdrawal && security_key != process.env.MASTER_SECURITY_KEY) {
      statusCode = constnt.statusRespnse.UNAUTHORISED
      return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
    }
  }
  let querySelectedOption = req.query['selectedOption'];
  if (querySelectedOption === 'All') {
    await runQuery(`SELECT * FROM gmsExternalAPICallLogs where requestTime > now() - interval 24 hour ORDER BY gmsExternalAPICallLogs.requestTime desc  LIMIT 100 OFFSET ${offset} `)
      .then((result) => {
        tableRows = result;
      })
    // where requestTime > now() - interval 24 hour
    await runQuery(`SELECT COUNT(*) FROM gmsExternalAPICallLogs where requestTime > now() - interval 24 hour ORDER BY gmsExternalAPICallLogs.requestTime desc`)
      .then((result) => {
        totalCount = result;
      })
  } else if (querySelectedOption == 'userId') {
    await runQuery(`SELECT * FROM gmsExternalAPICallLogs
     WHERE (fkUserId=${req.query['userIdValue']}) and gmsExternalAPICallLogs.requestTime > now() - interval 24 hour ORDER BY gmsExternalAPICallLogs.requestTime desc
     LIMIT 100 OFFSET ${offset} `).then((result) => {
      tableRows = result;
    })
    await runQuery(`SELECT COUNT(*) FROM gmsExternalAPICallLogs WHERE (fkUserId=${req.query['userIdValue']}) and gmsExternalAPICallLogs.requestTime > now() - interval 24 hour ORDER BY gmsExternalAPICallLogs.requestTime desc`).then((result) => {
      totalCount = result;
    })
  }
  else if (querySelectedOption == 'type') {
    let typeValue = req.query['incOrDec'];
    await runQuery(`SELECT * FROM gmsExternalAPICallLogs
     WHERE JSON_EXTRACT(request, '$.json.type') ='${typeValue}' and gmsExternalAPICallLogs.requestTime > now() - interval 24 hour ORDER BY gmsExternalAPICallLogs.requestTime desc
     LIMIT 100 OFFSET ${offset} `).then((result) => {
      tableRows = result;
    })
    await runQuery(`SELECT COUNT(*) FROM gmsExternalAPICallLogs
    WHERE JSON_EXTRACT(request, '$.json.type') ='${typeValue}' and gmsExternalAPICallLogs.requestTime > now() - interval 24 hour ORDER BY gmsExternalAPICallLogs.requestTime desc`).then((result) => {
      totalCount = result;
    })
  }
  return sendResponse(res, [tableRows], true, 200, "success", totalCount[0]['COUNT(*)']);

}
async function getWithdrawnTransactionsList(req, res) {
  let offset = parseInt(req.query['pageNo']) === 1 ? 0 : (parseInt(req.query['pageNo']) - 1) * 100;
  let tableRows;
  let totalCount;
  const security_key = req.query['security_key'];
  console.log(`Security Key : ${security_key}`);
  console.log(`Process Env Security Key : ${process.env.WEBPANEL_SECURITY_KEY_withdrawalTransactions}`);
  const startDate = req.query['startDate'];
  const endDate = req.query['endDate'];
  let statusCode;
  if (!security_key) {
    statusCode = constnt.statusRespnse.UNAUTHORISED
    return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
  } else {
    if (security_key != process.env.WEBPANEL_SECURITY_KEY_withdrawalTransactions && security_key != process.env.MASTER_SECURITY_KEY) {
      statusCode = constnt.statusRespnse.UNAUTHORISED
      return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
    }
  }
  let querySelectedOption = req.query['selectedOption'];
  let requestTypeJSON = {
    10: "Outward",
    20: "GamePlay",
    30: "WinningPrize",
    40: "CommissionCharge",
    42: "TFGRefundToPlAc",
    50: "RefundToPlAc",
    60: "RefundOutwardAfterFailed",
    70: "RejectOutward",
    120: "Referral"
  }
  let payStatusJSON = {
    10: "Success",
    20: "Failed",
    30: "Pending",
    40: "ManualRefund",
    50: "PendingForApproval"
  }
  let gameEngineJSON = {
    1: "Battle",
    2: "Tournament",
    3: "CricketFantacy",
    4: "TableFormatGame"
  }
  if (querySelectedOption === 'All') {
    if (startDate && !endDate) {
      console.log("entered into startdate")
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName 
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
      where date(w.createdAt)='${startDate}'
      ORDER BY w.createdAt desc LIMIT 100 offset ${offset}`)
        .then((result) => {
          tableRows = result;
        })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw where date(gmsPaymentTransactionLogWithdraw.createdAt)= '${startDate}' `)
        .then((result) => {
          totalCount = result;
        })
    }
    else if (endDate && !startDate) {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName 
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
      where date(w.createdAt)='${endDate}'
      ORDER BY w.createdAt desc LIMIT 100 offset ${offset}`)
        .then((result) => {
          tableRows = result;
        })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw where date(gmsPaymentTransactionLogWithdraw.createdAt)= '${endDate}' `)
        .then((result) => {
          totalCount = result;
        })
    }
    else if (startDate && endDate) {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName 
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
      where w.createdAt between '${startDate}' AND '${endDate}'
      ORDER BY w.createdAt desc LIMIT 100 offset ${offset}`)
        .then((result) => {
          tableRows = result;
        })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw where date(gmsPaymentTransactionLogWithdraw.createdAt) between '${startDate}' and '${endDate}'
      `)
        .then((result) => {
          totalCount = result;
        })
    }
    else {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName 
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
      ORDER BY w.createdAt desc LIMIT 100 offset ${offset}`)
        .then((result) => {
          tableRows = result;
        })
      await runQuery(`select COUNT(id)  
      FROM gmsPaymentTransactionLogWithdraw`
      )
        .then((result) => {
          totalCount = result;
        })
    }

  }
  else if (querySelectedOption === 'IdAndStatus') {
    if (startDate && endDate) {
      await runQuery(`
  SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
    WHERE payStatus=${req.query['playerStatusValue']} AND (fkSenderId=${req.query['playerIdValue']} OR fkReceiverId=${req.query['playerIdValue']})
  and w.createdAt between '${startDate}' and '${endDate}' ORDER BY w.createdAt desc LIMIT 100 OFFSET ${offset}`).then((result) => {
        tableRows = result
      })
      await runQuery(`SELECT COUNT(id) as cnt FROM gmsPaymentTransactionLogWithdraw WHERE payStatus=${req.query['playerStatusValue']} AND (fkSenderId=${req.query['playerIdValue']} OR fkReceiverId=${req.query['playerIdValue']}) AND gmsPaymentTransactionLogWithdraw.createdAt between '${startDate}' and '${endDate}'  `).then((result) => {
        totalCount = result;
        console.log(totalCount, "totalCount");
      })

    } else if (startDate && !endDate) {
      await runQuery(`ELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
    WHERE payStatus=${req.query['playerStatusValue']} AND (fkSenderId=${req.query['playerIdValue']} OR fkReceiverId=${req.query['playerIdValue']})
  and date(w.createdAt)='${startDate}'
   ORDER BY w.createdAt desc
  LIMIT 100 OFFSET ${offset} `).then((result) => {
        tableRows = result
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE payStatus=${req.query['playerStatusValue']} AND (fkSenderId=${req.query['playerIdValue']} OR fkReceiverId=${req.query['playerIdValue']}) AND date(gmsPaymentTransactionLogWithdraw.createdAt)='${startDate}'  `).then((result) => {
        totalCount = result;
      })
    } else if (endDate && !startDate) {
      console.log("entered into pay id");
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
    WHERE payStatus=${req.query['playerStatusValue']} AND (fkSenderId=${req.query['playerIdValue']} OR fkReceiverId=${req.query['playerIdValue']})
  and date(w.createdAt)='${endDate}'
   ORDER BY w.createdAt desc
  LIMIT 100 OFFSET ${offset} `,).then((result) => {
        tableRows = result
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE payStatus=${req.query['playerStatusValue']} AND (fkSenderId=${req.query['playerIdValue']} OR fkReceiverId=${req.query['playerIdValue']}) AND DATE(gmsPaymentTransactionLogWithdraw.createdAt)='${endDate}' `).then((result) => {
        totalCount = result;
      })
    }
    else {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
    WHERE payStatus=${req.query['playerStatusValue']} AND (fkSenderId=${req.query['playerIdValue']} OR fkReceiverId=${req.query['playerIdValue']})
   ORDER BY w.createdAt desc
  LIMIT 100 OFFSET ${offset}  `).then((result) => {
        tableRows = result
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE payStatus=${req.query['playerStatusValue']} AND (fkSenderId=${req.query['playerIdValue']} OR fkReceiverId=${req.query['playerIdValue']})`).then((result) => {
        totalCount = result;
        console.log(totalCount, "totalCoutn");
      })
    }
  } else if (querySelectedOption === "requestType") {
    if (startDate && endDate) {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
     WHERE requestType=${req.query['requestTypeValue']} 
     AND w.createdAt between '${startDate}' and '${endDate}'
     ORDER BY w.createdAt desc
    LIMIT 100 OFFSET ${offset} `).then((result) => {
        tableRows = result;
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE requestType=${req.query['requestTypeValue']}   and  gmsPaymentTransactionLogWithdraw.createdAt between '${startDate}' and '${endDate}'    `).then((result) => {
        totalCount = result;
      })
    }
    else if (startDate && !endDate) {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
     WHERE requestType=${req.query['requestTypeValue']} 
     AND date(w.createdAt)= '${startDate}' ORDER BY w.createdAt desc LIMIT 100 OFFSET ${offset} `).then((result) => {
        tableRows = result;
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE requestType=${req.query['requestTypeValue']}   and  date(gmsPaymentTransactionLogWithdraw.createdAt)= '${startDate}' `).then((result) => {
        totalCount = result;
      })
    } else if (endDate && !startDate) {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
     WHERE requestType=${req.query['requestTypeValue']} 
     AND date(w.createdAt)='${endDate}'
     ORDER BY w.createdAt desc
    LIMIT 100 OFFSET ${offset} `).then((result) => {
        tableRows = result;
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE requestType=${req.query['requestTypeValue']}   and  date(gmsPaymentTransactionLogWithdraw.createdAt)= '${endDate}' `).then((result) => {
        totalCount = result;
      })
    }
    else {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
     WHERE requestType=${req.query['requestTypeValue']} 
     ORDER BY w.createdAt desc
    LIMIT 100 OFFSET ${offset} `).then((result) => {
        tableRows = result;
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE gmsPaymentTransactionLogWithdraw.requestType=${req.query['requestTypeValue']} `).then((result) => {
        totalCount = result;
      })

    }
  } else if (querySelectedOption === 'payStatus') {
    if (startDate && endDate) {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
     WHERE payStatus=${req.query['playerStatusValue']}
     AND w.createdAt between '${startDate}' and '${endDate}'
     ORDER BY w.createdAt desc
    LIMIT 100 OFFSET ${offset} `).then((result) => {
        tableRows = result;
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE payStatus=${req.query['playerStatusValue']} AND gmsPaymentTransactionLogWithdraw.createdAt between '${startDate}' and '${endDate}'
    `).then((result) => {
        totalCount = result;
      })
    }
    else if (startDate && !endDate) {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
     WHERE payStatus=${req.query['playerStatusValue']}
     AND date(w.createdAt)= '${startDate}'
     ORDER BY w.createdAt desc
    LIMIT 100 OFFSET ${offset}`).then((result) => {
        tableRows = result;
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE payStatus=${req.query['playerStatusValue']} AND date(gmsPaymentTransactionLogWithdraw.createdAt)='${startDate}'
    `).then((result) => {
        totalCount = result;
      })
    } else if (endDate && !startDate) {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
     WHERE payStatus=${req.query['playerStatusValue']}
     AND date(w.createdAt)='${endDate}'
     ORDER BY w.createdAt desc
    LIMIT 100 OFFSET ${offset} `).then((result) => {
        tableRows = result;
      })
      await runQuery(`SELECT COUNT(*) FROM gmsPaymentTransactionLogWithdraw WHERE payStatus=${req.query['playerStatusValue']} AND date(gmsPaymentTransactionLogWithdraw.createdAt)='${endDate}'
    `).then((result) => {
        totalCount = result;
      })
    }
    else {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
     WHERE payStatus=${req.query['playerStatusValue']}
     ORDER BY w.createdAt desc
    LIMIT 100 OFFSET ${offset} `).then((result) => {
        tableRows = result;
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE payStatus=${req.query['playerStatusValue']}`).then((result) => {
        totalCount = result;
      })
    }
  } else if (querySelectedOption === "userId") {
    if (startDate && endDate) {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
     WHERE (fkSenderId=${req.query['userIdValue']} OR fkReceiverId=${req.query['userIdValue']})
     AND w.createdAt between '${startDate}' and '${endDate}'
     ORDER BY w.createdAt desc
     LIMIT 100 OFFSET ${offset}`).then((result) => {
        tableRows = result;
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE (fkSenderId=${req.query['userIdValue']} OR fkReceiverId=${req.query['userIdValue']}) AND gmsPaymentTransactionLogWithdraw.createdAt between '${startDate}' and '${endDate}' `).then((result) => {
        totalCount = result;
      })
    }
    else if (startDate && !endDate) {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
     WHERE (fkSenderId=${req.query['userIdValue']} OR fkReceiverId=${req.query['userIdValue']})
     AND date(w.createdAt)='${startDate}'
     ORDER BY w.createdAt desc
     LIMIT 100 OFFSET ${offset} `).then((result) => {
        tableRows = result;
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE (fkSenderId=${req.query['userIdValue']} OR fkReceiverId=${req.query['userIdValue']}) AND date(gmsPaymentTransactionLogWithdraw.createdAt)= '${startDate}' `).then((result) => {
        totalCount = result;
      })
    }
    else if (endDate && !startDate) {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
     WHERE (fkSenderId=${req.query['userIdValue']} OR fkReceiverId=${req.query['userIdValue']})
     AND date(w.createdAt)='${endDate}'
     ORDER BY w.createdAt desc
     LIMIT 100 OFFSET ${offset}`).then((result) => {
        tableRows = result;
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE (fkSenderId=${req.query['userIdValue']} OR fkReceiverId=${req.query['userIdValue']}) AND date(gmsPaymentTransactionLogWithdraw.createdAt)= '${endDate}' `).then((result) => {
        totalCount = result;
      })
    }
    else {
      await runQuery(`SELECT w.*,g.*,
      DATE_FORMAT(w.createdAt, '%Y-%m-%d') AS createdAt,
      DATE_FORMAT(w.updatedAt, '%Y-%m-%d') AS updatedAt,
      u1.userName as SenderName,
      u2.userName as ReceiverName
      FROM gmsPaymentTransactionLogWithdraw as w
      left join gmsGames as g ON w.fkGameId = g.id
      left join gmsUsers as u1 on w.fkSenderId=u1.id
      left join gmsUsers as u2 on w.fkReceiverId=u2.id
     WHERE (fkSenderId=${req.query['userIdValue']} OR fkReceiverId=${req.query['userIdValue']}) ORDER BY w.createdAt desc
     LIMIT 100 OFFSET ${offset} `).then((result) => {
        tableRows = result;
      })
      await runQuery(`SELECT COUNT(id) FROM gmsPaymentTransactionLogWithdraw WHERE (fkSenderId=${req.query['userIdValue']} OR fkReceiverId=${req.query['userIdValue']})`).then((result) => {
        totalCount = result;
      })
    }
  }
  //const [rows, fields] = await pool.execute('SELECT * FROM gmsPaymentTransactionLogWithdraw LIMIT 10');
  // AND createdAt > now() - interval 24 hour
  return sendResponse(res, [tableRows, requestTypeJSON, payStatusJSON, gameEngineJSON], true, 200, "success", totalCount[0]['COUNT(id)']);
}


async function getAllWithdrawApprovalPendingTxn(req, res) {
  //Start to code here .
  try {

    const security_key = req.query['security_key'];
    console.log(`Security Key : ${security_key}`);
    console.log(`Process Env Security Key : ${process.env.WEBPANEL_SECURITY_KEY}`);

    if (!security_key) {
      statusCode = constnt.statusRespnse.UNAUTHORISED
      return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
    } else {
      if (security_key != process.env.WEBPANEL_SECURITY_KEY && security_key != process.env.MASTER_SECURITY_KEY) {
        statusCode = constnt.statusRespnse.UNAUTHORISED
        return sendResponse(res, { rows }, true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
      } else {
        const token = process.env.BACKEND_TOKEN;

        const server_endPoint =
          process.env.Api_Host +
          process.env.endPoint_withdrawPendingForApprovalList;



        const apiData = await apiCallGet(server_endPoint, token);
        if (apiData) {
          return sendResponse(
            res,
            apiData.data,
            apiData.error,
            apiData.status,
            apiData.message,
            apiData.recordTotal
          );
        } else {
          statusCode = constnt.statusRespnse.SERVER_ERR
          return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
        }
      }
    }
  } catch (err) {
    console.log("error" + err);
    statusCode = constnt.statusRespnse.SERVER_ERR
    return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
  }
}


async function updateWithdrawApprovalPendingTxn(req, res) {
  //Start to code here .
  try {
    const requestBody = req.body;
    const security_key = requestBody['security_key'];

    let statusCode;
    if (!security_key) {
      statusCode = constnt.statusRespnse.UNAUTHORISED
      return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
    }
    else {
      if (security_key != process.env.WEBPANEL_SECURITY_KEY && security_key != process.env.MASTER_SECURITY_KEY) {
        statusCode = constnt.statusRespnse.UNAUTHORISED
        return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
      }
      else {
        const token = process.env.BACKEND_TOKEN;
        const SECRET_KEY = process.env.WITHDRAW_APPROVAL_API_SECRET;

        const server_endPoint =
          process.env.Api_Host + process.env.endpoint__withdrawTxnApproval;


        let apiData = await apiCallPost(
          server_endPoint,
          requestBody,
          token,
          SECRET_KEY
        );
        if (apiData) {
          return sendResponse(
            res,
            apiData.data,
            apiData.error,
            apiData.status,
            apiData.message,
            apiData.recordTotal
          );
        } else {
          statusCode = constnt.statusRespnse.SERVER_ERR
          return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
        }
      }
    }
  }
  catch (err) {
    console.log(err);
    statusCode = constnt.statusRespnse.SERVER_ERR
    return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
  }
}

async function getDepositTxnList(req, res) {
  try {
    console.log(req.query)
    const security_key = req.query['security_key'];
    console.log(`Security Key : ${security_key}`);
    console.log(`Process Env Security Key : ${process.env.WEBPANEL_SECURITY_KEY}`)

    let page = +req.query.page || 0;
    let page_size = +req.query.page_size || 20
    console.log("page no :", page)
    console.log("request for page size:", page_size)

    let statusCode;

    if (!security_key) {
      console.log("...UNAUTHORISED Access ! security key not coming from admin panel...")
      statusCode = constnt.statusRespnse.UNAUTHORISED
      return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
    }
    else {
      if (security_key != process.env.WEBPANEL_SECURITY_KEY && security_key != process.env.MASTER_SECURITY_KEY) {
        console.log("...UNAUTHORISED Access ! wrong security key entered from admin panel...")
        statusCode = constnt.statusRespnse.UNAUTHORISED
        return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
      }
      else {
        console.log("...Authorisation Check done Sucessfully...")
        let isAllPendingDepositTxn = req.query["isAllPendingDepositTxn"]

        let paginateOption = ""
        if (isAllPendingDepositTxn == "true") {
          paginateOption += "&page=" + page + "&page_size" + 100
          //page_size
        }


        const token = process.env.BACKEND_TOKEN;
        console.log("token : ", token)
        let server_endPoint = process.env.Api_Host +
          process.env.endpoint_depositTrxnList +
          "?isAllPendingDepositTxn=" + isAllPendingDepositTxn + paginateOption

        console.log("node backend Api with query : ", server_endPoint)
        let apiData = await apiCallGet(server_endPoint, token)
        if (apiData) {
          console.log("...request for deposit TXN List sucessfully executed...")
          return sendResponse(
            res,
            apiData.data,
            apiData.error,
            apiData.status,
            apiData.message,
            apiData.recordTotal
          );
        }
        else {
          console.log("...failed to retrieve data for deposit Txn List...")
          statusCode = constnt.statusRespnse.SERVER_ERR
          return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
        }

      }
    }
  } catch (error) {
    console.log("Err in (getDepositTxnList)", error)
    statusCode = constnt.statusRespnse.SERVER_ERR
    return sendResponse(res, [], true, statusCode, constnt.msgRespnseApiCall[statusCode], 0);
  }
}

module.exports = payment;