



async function txnHistoryDetails(buttonInnerText = 0, trueOrFalse = true, isCallforUpdateList = false) {
    try {

        let security_key = document.getElementById("security_key").value;
        console.log("secutiry key", security_key);
        let responseMessage = document.getElementById("security_key_message");
        responseMessage.innerText = "";
        // let checkButtonText = buttonInnerText ? buttonInnerText : 1;
        let selectData = document.getElementById('select').value;
        let userIdValue = document.getElementById('userId1').value;
        let txnHistoryTypeValue = document.getElementById('historyType').value;
        console.log(selectData, userIdValue, txnHistoryTypeValue, security_key, "input details");
        let paraElement = document.getElementById("errorMessage");
        paraElement.innerText = "";
        let appendElement = document.getElementById("buttonId");
        appendElement.innerHTML = "";
        let totalRecordData = document.getElementById("totalRecordData");
        totalRecordData.innerText = "";
        let goToPage = document.getElementById("goToPage");
        goToPage.innerHTML = "";
        let public_endPoint = public_API.Api_host +
            public_API.endpoint_getTransactionHistoryDetails + "?security_key=" + security_key + "&trueOrFalse=" + selectData + "&userID=" + userIdValue + "&txnHistoryTypeValue=" + txnHistoryTypeValue + "&page=" + buttonInnerText + "&pageSize=100";
        console.log(public_endPoint, "public_endpoint");
        let totalCount;
        await fetch(public_endPoint, {
            method: "GET",
        })
            .then((result) => {
                if (result) {
                    if (result.status == 403) {
                        responseMessage.innerText = "Unauthorized security_key";
                        let text = result.statusText;
                        response(text);
                    } else {
                        result.json().then((result) => {
                            console.log(result.data);
                            let data;
                            if (result.data) {
                                data = result.data;
                            }
                            let tabledata = "";
                            if (data && data.length > 0) {
                                totalCount = result.meta.recordTotal;
                                if (trueOrFalse) {
                                    jqueryPagination(totalCount);
                                }
                                // console.log(result.meta.recordTotal, "rocord total");
                                // let pageData = result.meta.recordTotal > 10 ? (result.meta.recordTotal / 10) : 0;
                                // let headingElement = document.createElement("h2");
                                // headingElement.classList.add("text-info");
                                // headingElement.innerText = `Total No of pages left ${Math.ceil(pageData)}`;
                                // let buttonElement = document.createElement('button');
                                // buttonElement.classList.add("btn");
                                // buttonElement.classList.add("btn-primary");
                                // buttonElement.classList.add("m-3");
                                // buttonElement.setAttribute("id", "insideButton");
                                // buttonElement.innerText = "submit";
                                // let inputElement = document.createElement("input");
                                // inputElement.classList.add("border");
                                // inputElement.classList.add("border-warning");
                                // inputElement.setAttribute("id", "inputPageData");
                                // inputElement.setAttribute("type", "text");
                                // inputElement.setAttribute("placeholder", "page number");
                                // totalRecordData.appendChild(headingElement);
                                // goToPage.appendChild(inputElement);
                                // goToPage.appendChild(buttonElement);
                                // let buttonAddEvenlistener = document.getElementById("insideButton");
                                // buttonAddEvenlistener.addEventListener("click", () => {
                                //     let inputPageValue = document.getElementById("inputPageData").value;
                                //     txnHistoryDetails(inputPageValue);
                                //     console.log("inside the add eventlistener", inputPageValue);
                                // })
                                data.forEach((value) => {
                                    console.log("entering into the foreach");

                                    let [fkSenderId, fkReceiverId, amount, payStatus, requestType, createdAt, fkGameId, gameEngine, engineId, pgRefNo, wallet, description, utrNo, trxType, trxTypeMsg, requestTypeMsg, payResult, trxDetails] = [
                                        value.fkSenderId ? value.fkSenderId : "NA",
                                        value.fkReceiverId ? value.fkReceiverId : "NA",
                                        value.amount ? value.amount : "NA",
                                        value.payStatus ? value.payStatus : "NA",
                                        value.requestType ? value.requestType : "NA",
                                        value.createdAt ? value.createdAt : "NA",
                                        value.fkGameId ? value.fkGameId : "NA",
                                        value.gameEngine ? value.gameEngine : "NA",
                                        value.engineId ? value.engineId : "NA",
                                        value.pgRefNo ? value.pgRefNo : "NA",
                                        value.wallet ? value.wallet : "NA",
                                        value.description ? value.description : "NA",
                                        value.utrNo ? value.utrNo : "NA",
                                        value.trxType ? value.trxType : "NA",
                                        value.trxTypeMsg ? value.trxTypeMsg : "NA",
                                        value.requestTypeMsg ? value.requestTypeMsg : "NA",
                                        value.payResult ? value.payResult : "NA",
                                        value.trxDetails ? JSON.stringify(value.trxDetails) : "NA",

                                    ];

                                    tabledata += `<tr class="item">
                   <td>${fkSenderId}</td>
                   <td>${fkReceiverId}</td>
                   <td>${amount}</td>
                   <td>${payStatus}</td>
                   <td>${requestType}</td>
                   <td>${createdAt}</td>
                   <td>${fkGameId}</td>
                   <td>${gameEngine}</td>
                   <td>${engineId}</td>
                   <td>${pgRefNo}</td>
                   <td>${wallet}</td>
                   <td>${description}</td>
                   <td>${utrNo}</td>
                   <td>${trxType}</td>
                   <td>${trxTypeMsg}</td>
                   <td>${requestTypeMsg}</td>
                   <td>${payResult}</td>
                   <td>${trxDetails}</td>

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
            txnHistoryDetails(currentPage, false);
            $(".table_data .item").hide()
                .slice(100 * (noofele - 1), 100 + 100 * (noofele - 1)).show();
        },

    });
}