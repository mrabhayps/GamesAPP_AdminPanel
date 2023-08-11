async function externalApiLogWithdrawal(buttonInnerText, trueOrFalse = true, isCallforUpdateList = false) {
    try {
        let security_key = document.getElementById("security_key").value;
        console.log("secutiry key", security_key);
        let responseMessage = document.getElementById("security_key_message");
        responseMessage.innerText = "";
        let checkButtonText = buttonInnerText ? buttonInnerText : 1;
        let public_endPoint = '';
        let selectData = document.getElementById('select').value;
        let paraElement = document.getElementById("errorMessage");
        paraElement.innerText = "";

        if (selectData == 'type') {
            let typeValue = document.getElementById("type").value;
            public_endPoint = public_API.Api_host +
                public_API.endpoint_getExternalApiLogWithdraws + "?selectedOption=" + 'type' + "&incOrDec=" + typeValue + "&pageNo=" + checkButtonText + "&security_key=" + security_key;
        }
        else if (selectData == "userId") {
            let userIdValue = document.getElementById("security_key_userId").value;
            public_endPoint = public_API.Api_host +
                public_API.endpoint_getExternalApiLogWithdraws + "?selectedOption=" + 'userId' + "&userIdValue=" + userIdValue + "&pageNo=" + checkButtonText + "&security_key=" + security_key;
        }
        else if (selectData == 'Default') {
            public_endPoint = public_API.Api_host +
                public_API.endpoint_getExternalApiLogWithdraws + "?selectedOption=" + 'All' + "&pageNo=" + checkButtonText + "&security_key=" + security_key;
        }
        // let appendElement = document.getElementById("buttonId");
        // appendElement.innerHTML = "";
        let totalRecordData = document.getElementById("totalRecordData");
        totalRecordData.innerText = "";
        let goToPage = document.getElementById("goToPage");
        goToPage.innerHTML = "";
        let totalCount;
        console.log(public_endPoint, "public_endpoint");
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
                                console.log(data[0], "data from the server");
                            }
                            let tabledata = "";
                            if (data[0] && data[0].length > 0 && data) {
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
                                //     externalApiLogWithdrawal(inputPageValue);
                                //     console.log("inside the add eventlistener", inputPageValue);
                                // })
                                data[0].forEach((value) => {
                                    console.log("entering into the foreach");
                                    console.log(JSON.stringify(value.request), "request value")
                                    let [userId, title, api, request, requestTime, response, responseTime, httpStatusCode] = [
                                        value.fkUserId ? value.fkUserId : "NA",
                                        value.title ? value.title : "NA",
                                        value.api ? value.api : "NA",
                                        value.request ? JSON.stringify(value.request) : "NA",
                                        value.requestTime ? value.requestTime : "NA",
                                        value.response ? value.response.data : "NA",
                                        value.responseTime ? value.responseTime : "NA",
                                        value.httpStatusCode ? value.httpStatusCode : "NA",
                                    ];

                                    tabledata += `<tr class="item">
                   <td>${userId}</td>
                   <td>${title}</td>
                   <td>${api}</td>
                   <td>${request}</td>
                   <td>${requestTime}</td>
                   <td>${response}</td>
                   <td>${responseTime}</td>
                   <td>${httpStatusCode}</td>
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
            externalApiLogWithdrawal(currentPage, false);
            $(".table_data .item").hide()
                .slice(100 * (noofele - 1), 100 + 100 * (noofele - 1)).show();
        },

    });
}