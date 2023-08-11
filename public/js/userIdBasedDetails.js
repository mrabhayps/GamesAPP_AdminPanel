async function userIdBasedDetails(buttonInnerText, trueOrFalse = true, isCallforUpdateList = false) {

    try {
        let totalCount;
        let security_key = document.getElementById("security_key").value;
        let responseMessage = document.getElementById("security_key_message");
        responseMessage.innerText = "";
        let checkButtonText = buttonInnerText ? buttonInnerText : 1;
        let public_endPoint = '';
        let paraElement = document.getElementById("errorMessage");
        paraElement.innerText = "";
        let otpMobileNumber = document.getElementById("mobile").value;
        let playerIdValue = document.getElementById("userId1").value;
        console.log(security_key, otpMobileNumber, playerIdValue);
        public_endPoint = public_API.Api_host + public_API.endpoint_userIdBasedData + '?userID=' + playerIdValue + '&security_key=' + security_key + '&mobile=' + otpMobileNumber;

        // let appendElement = document.getElementById("buttonId");
        // appendElement.innerHTML = "";
        let buttonNum = 0;
        await fetch(public_endPoint, {
            method: "GET",
        })
            .then((result) => {
                console.log(result, "result");
                if (result) {
                    if (result.status == 403) {
                        responseMessage.innerText = "Unauthorized security_key";
                        let text = result.statusText;
                        response(text);
                    } else {
                        result.json().then((result) => {
                            if (result.data) {
                                data = result.data;
                                console.log(data, "data from the server");
                            }
                            let tabledata = "";
                            if (data && data.length > 0 && data) {
                                //totalCount = result.meta.recordTotal;
                                // if (trueOrFalse) {
                                //     jqueryPagination(totalCount);
                                // }
                                for (let i = 0; i < 5; i++) {
                                    let tableIds = ["otp_table", "user_table", "bank_table", "deposit_table", "withdraw_table"]
                                    tabledata = '';
                                    data[i].forEach((value) => {
                                        console.log("entering into the foreach");
                                        if (i == 0) {
                                            let [id, mobile, otp, createdAt, updatedAt, status] = [
                                                value.id,
                                                value.mobile,
                                                value.otp,
                                                value.createdAt,
                                                value.updatedAt,
                                                value.status
                                            ]
                                            tabledata += `<tr>
<td>${id}</td>
<td>${mobile}</td>
<td>${otp}</td>
<td>${createdAt}</td>
<td>${updatedAt}</td>
<td>${status}</td>
</tr>`;
                                        } else if (i == 1) {

                                            let [id, firstname, middlename, lastname, email, mobile, dob, gender, image, default_image, city, state, country, continent, createdAt, updatedAt, updatedBy, WinningPrize, WinningPrizeT, rank, rankT, status, longtitude, latitude, canUpdateUserName, totalWins, totalWinningAmount, gameMatrix, userName, facebookId, referralCode, lastSeen, restoreId, isCreatorStatus, kycStatus, kycResponse, reportedCount] = [
                                                value.id,
                                                value.firstName,
                                                value.middleName,
                                                value.lastName,
                                                value.email,
                                                value.mobile,
                                                value.dob,
                                                value.gender,
                                                value.image,
                                                value.defaultImage,
                                                value.city,
                                                value.state,
                                                value.country,
                                                value.continent,
                                                value.createdAt,
                                                value.updatedAt,
                                                value.updatedBy,
                                                value.winPrize,
                                                value.winPrizeT,
                                                value.rank,
                                                value.rankT,
                                                value.status,
                                                value.longitude,
                                                value.latitude,
                                                value.canUpdateUserName,
                                                value.totalWins,
                                                value.totalWinningAmount,
                                                value.gameMatrix,
                                                value.userName,
                                                value.facebookId,
                                                value.referralCode,
                                                value.lastSeen,
                                                value.restoreId,
                                                value.isCreatorStatus,
                                                value.kycStatus,
                                                value.kycResponse,
                                                value.reportedCount
                                            ]
                                            tabledata += `<tr>
<td>${id}</td>
<td>${firstname}</td>
<td>${middlename}</td>
<td>${lastname}</td>
<td>${email}</td>
<td>${mobile}</td>
<td>${dob}</td>
<td>${gender}</td>
<td>${image}</td>
<td>${default_image}</td>
<td>${city}</td>
<td>${state}</td>
<td>${country}</td>
<td>${continent}</td>
<td>${createdAt}</td>
<td>${updatedAt}</td>
<td>${updatedBy}</td>
<td>${WinningPrize}</td>
<td>${WinningPrizeT}</td>
<td>${rank}</td>
<td>${rankT}</td>
<td>${status}</td>
<td>${longtitude}</td>
<td>${latitude}</td>
<td>${canUpdateUserName}</td>
<td>${totalWins}</td>
<td>${totalWinningAmount}</td>
<td>${gameMatrix}</td>
<td>${userName}</td>
<td>${facebookId}</td>
<td>${referralCode}</td>
<td>${lastSeen}</td>
<td>${restoreId}</td>
<td>${isCreatorStatus}</td>
<td>${kycStatus}</td>
<td>${kycResponse}</td>
<td>${reportedCount}</td>
</tr>`;
                                        }
                                        else if (i == 2) {
                                            let [id, fkUserId, nameInBank, accountNumber, bankName, ifsc, upiId, state, isKYC, paytmMobile, createdAt, updatedAt, isActive, isAccountVerified] = [
                                                value.id,
                                                value.fkUserId,
                                                value.nameInBank,
                                                value.accountNumber,
                                                value.bankName,
                                                value.ifsc,
                                                value.upiId,
                                                value.state,
                                                value.isKYC,
                                                value.paytmMobile,
                                                value.createdAt,
                                                value.updatedAt,
                                                value.isActive,
                                                value.isAccountVerified
                                            ]
                                            tabledata += `<tr>
    <td>${id}</td>
    <td>${fkUserId}</td>
    <td>${nameInBank}</td>
    <td>${accountNumber}</td>
    <td>${bankName}</td>
    <td>${ifsc}</td>
    <td>${upiId}</td>
    <td>${state}</td>
    <td>${isKYC}</td>
    <td>${paytmMobile}</td>
    <td>${createdAt}</td>
    <td>${updatedAt}</td>
    <td>${isActive}</td>
    <td>${isAccountVerified}</td>
    </tr>`;
                                        }
                                        else if (i == 3) {
                                            let [fkSenderId, senderAcNum, fkReceiverId, receiverAcNum, Amount, senderClosingBalance, receiverClosingBalance, requestType, payStatus, createdAt, updatedAt, pgRefNo, bankRefNo, apiMsg, description, utrNo, fkGameId, gameEngine, engineId] = [
                                                value.fkSenderId,
                                                value.senderAcNum,
                                                value.fkReceiverId,
                                                value.receiverAcNum,
                                                value.amount,
                                                value.senderClosingBalance,
                                                value.receiverClosingBalance,
                                                value.requestType,
                                                value.payStatus,
                                                value.createdAt,
                                                value.updatedAt,
                                                value.pgRefNo,
                                                value.bankRefNo,
                                                value.apiMsg,
                                                value.description,
                                                value.utrNo,
                                                value.fkGameId,
                                                value.gameEngine,
                                                value.engineId
                                            ];
                                            tabledata += `<tr>
                                            <td>${fkSenderId}</td>
                                            <td>${senderAcNum}</td>
                                            <td>${fkReceiverId}</td>
                                            <td>${receiverAcNum}</td>
                                            <td>${Amount}</td>
                                            <td>${senderClosingBalance}</td>
                                            <td>${receiverClosingBalance}</td>
                                            <td>${requestType}</td>
                                            <td>${payStatus}</td>
                                            <td>${createdAt}</td>
                                            <td>${updatedAt}</td>
                                            <td>${pgRefNo}</td>
                                            <td>${bankRefNo}</td>
                                            <td>${apiMsg}</td>
                                            <td>${description}</td>
                                            <td>${utrNo}</td>
                                            <td>${fkGameId}</td>
                                            <td>${gameEngine}</td>
                                            <td>${engineId}</td>
                                            

                                           </tr>`;
                                        }
                                        else if (i == 4) {
                                            let txnType = `${value.fkSenderId}`.length > `${value.fkReceiverId}`.length ? "Debit" : "Credit";

                                            let [userId, amount, requestType, payStatus, date, pgRefNo, iblRefNo, customerRefNum, battleRoomId, apiMsg, fkGameId, gameEngine, engineId] = [
                                                value.fkSenderId ? value.fkSenderId : "NA",
                                                value.amount + "Rs",
                                                value.requestType,
                                                value.payStatus,
                                                [value.createdAt + "/" + value.updatedAt],
                                                value.pgRefNo,
                                                value.iblRefNo ? value.iblRefNo : "NA",
                                                value.customerRefNum ? value.customerRefNum : "NA",
                                                value.battleRoomId ? value.battleRoomId : "NA",
                                                value.apiMsg,
                                                value.fkGameId,
                                                value.gameEngine ? value.gameEngine : "NA",
                                                value.engineId ? value.engineId : "NA"
                                            ];

                                            tabledata += `<tr>
<td>${userId}</td>
<td>${txnType}</td>
<td>${amount}</td>
<td>${requestType}</td>
<td>${payStatus}</td>
<td>${date}</td>
<td>${pgRefNo}</td>
<td>${iblRefNo}</td>
<td>${customerRefNum}</td>
<td>${battleRoomId}</td>
<td>${apiMsg}</td>
<td>${fkGameId}</td>
<td>${gameEngine}</td>
<td>${engineId}</td>
</tr>`;
                                        }


                                    }
                                    ),
                                        data[i].length > 0 ? document.getElementById(`${tableIds[i]}`).innerHTML = tabledata : document.getElementById(`${tableIds[i]}`).innerHTML = `<td colspan="16"><h3>NO DATA FOUND</h3></td>
                                        `;

                                }
                            } else {
                                if (!isCallforUpdateList) {
                                    document.getElementById("table_data").innerHTML = "";
                                    // paraElement.innerText = "No Data Found";
                                    let text = result.meta.message;
                                    response(text);
                                }
                            }
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


function jqueryPagination(totalCount) {
    $(".table_data .item").slice(100).hide();
    $('#pagination').pagination({
        items: totalCount,
        itemsOnPage: 100,
        onPageClick: function (noofele) {
            let currentPage = this.currentPage + 1;
            withdrawTransactionTxn(currentPage, false);
            $(".table_data .item").hide()
                .slice(100 * (noofele - 1), 100 + 100 * (noofele - 1)).show();
        },

    });
}


