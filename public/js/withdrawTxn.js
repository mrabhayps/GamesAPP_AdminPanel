async function withdrawTransactionTxn(buttonInnerText, trueOrFalse = true, isCallforUpdateList = false) {
    try {
        let totalCount;
        let security_key = document.getElementById("security_key").value;
        let responseMessage = document.getElementById("security_key_message");
        responseMessage.innerText = "";
        let checkButtonText = buttonInnerText ? buttonInnerText : 1;
        let public_endPoint = '';
        let selectData = document.getElementById('select').value;
        let paraElement = document.getElementById("errorMessage");
        paraElement.innerText = "";
        let fromDateId = document.getElementById("fromDate").value;
        let toDateId = document.getElementById("toDate").value;
        if (selectData == 'IdAndStatus') {
            let playerStatusValue = document.getElementById("payStatus1").value;
            let playerIdValue = document.getElementById("userId1").value;
            public_endPoint = public_API.Api_host +
                public_API.endPoint_getWithdrawTransactions + "?selectedOption=" + 'IdAndStatus' + "&playerStatusValue=" + playerStatusValue + "&playerIdValue=" + playerIdValue + "&pageNo=" + checkButtonText + "&security_key=" + security_key + "&startDate=" + fromDateId + "&endDate=" + toDateId;
        }
        else if (selectData == "requestType") {
            let requestTypeValue = document.getElementById("requestType").value;
            public_endPoint = public_API.Api_host +
                public_API.endPoint_getWithdrawTransactions + "?selectedOption=" + 'requestType' + "&requestTypeValue=" + requestTypeValue + "&pageNo=" + checkButtonText + "&security_key=" + security_key + "&startDate=" + fromDateId + "&endDate=" + toDateId;
        }
        else if (selectData == "payStatus") {
            let playerStatusValue = document.getElementById("payStatus").value;
            public_endPoint = public_API.Api_host +
                public_API.endPoint_getWithdrawTransactions + "?selectedOption=" + 'payStatus' + "&playerStatusValue=" + playerStatusValue + "&pageNo=" + checkButtonText + "&security_key=" + security_key + "&startDate=" + fromDateId + "&endDate=" + toDateId;
        } else if (selectData == "userId") {
            let userIdValue = document.getElementById("security_key_userId").value;
            public_endPoint = public_API.Api_host +
                public_API.endPoint_getWithdrawTransactions + "?selectedOption=" + 'userId' + "&userIdValue=" + userIdValue + "&pageNo=" + checkButtonText + "&security_key=" + security_key + "&startDate=" + fromDateId + "&endDate=" + toDateId;
        }
        else if (selectData == 'All') {
            public_endPoint = public_API.Api_host +
                public_API.endPoint_getWithdrawTransactions + "?selectedOption=" + 'All' + "&pageNo=" + checkButtonText + "&security_key=" + security_key + "&startDate=" + fromDateId + "&endDate=" + toDateId;
        }
        // let appendElement = document.getElementById("buttonId");
        // appendElement.innerHTML = "";
        let totalRecordData = document.getElementById("totalRecordData");
        totalRecordData.innerText = "";
        let goToPage = document.getElementById("goToPage");
        goToPage.innerHTML = "";
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
                            }
                            let tabledata = "";
                            if (data[0] && data[0].length > 0 && data) {
                                totalCount = result.meta.recordTotal;
                                if (trueOrFalse) {
                                    jqueryPagination(totalCount);
                                }
                                data[0].forEach((value) => {
                                    console.log(value)
                                    console.log("entering into the foreach");
                                    let txnType = `${value.fkSenderId}`.length > `${value.fkReceiverId}`.length ? "Debit" : "Credit";
                                    let apiMsgValue = value.apiMsg;
                                    let globArr = [];
                                    if (apiMsgValue) {
                                        console.log(apiMsgValue, "apiMsgValue");
                                        apiMsgValue = `${value.apiMsg}`;
                                        let splitMessage = apiMsgValue.split('}');
                                        splitMessage.forEach(function (obj) {
                                            globArr.push(obj + "}");
                                        });
                                    }
                                    let apiMessageData = value.apiMsg ? globArr[globArr.length - 2] : null;
                                    let [userId, userName, txnTypes, amount, requestType, payStatus, date, pgRefNo, iblRefNo, customerRefNum, battleRoomId, apiMsg, fkGameId, gameEngine, engineId] = [
                                        value.fkSenderId > value.fkReceiverId ? value.fkSenderId: value.fkReceiverId,
                                        value.fkSenderId > value.fkReceiverId ? value.SenderName: value.ReceiverName,
                                        txnType,
                                        value.amount + "Rs",
                                        data[1][value.requestType] ? data[1][value.requestType] : "NA",
                                        data[2][value.payStatus] ? data[2][value.payStatus] : "NA",
                                        [value.createdAt + "/" + value.updatedAt],
                                        value.pgRefNo,
                                        value.iblRefNo ? value.iblRefNo : "NA",
                                        value.customerRefNum ? value.customerRefNum : "NA",
                                        value.battleRoomId ? value.battleRoomId : "NA",
                                        apiMessageData ? apiMessageData : "NA",
                                        value.title ? value.title : "NA",
                                        data[3][value.gameEngine] ? data[3][value.gameEngine] : "NA",
                                        value.engineId ? value.engineId : "NA"
                                    ];

                                    tabledata += `<tr class="item">
                   <td>${userId}</td>
                   <td>${userName}</td>
                   <td>${txnTypes}</td>
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

                                });
                            } else {
                                if (!isCallforUpdateList) {
                                    document.getElementById("table_data").innerHTML = "";
                                    paraElement.innerText = "No Data Found";
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

