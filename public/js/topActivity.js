//function for topactivity
async function topActivity() {
    try {
        let security_key = document.getElementById("security_key").value;
        let responseMessage = document.getElementById("security_key_message");
        let public_endPoint = public_API.Api_host + public_API.endpoint_getTopActivities + "?security_key=" + security_key;
        console.log(public_endPoint, "url");
        await fetch(public_endPoint, {
            method: "GET"
        })
            .then((result) => {
                if (result) {
                    if (result.status == 403) {
                        responseMessage.innerText = "Unauthorized security_key";
                        let text = result.statusText;
                        response(text);
                    } else {
                        result.json().then((result) => {

                            if (result) {

                                data = result.data;

                                if (data && data.length > 0) {
                                    let tabledata = "";

                                    data.forEach((value) => {
                                        tabledata += `<tr>
                   <td>${value.ActivityType}</td>
                   <td>${value.ActivityDetails}</td>
                   <td>${value.createdAt}</td>
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

//function for top leaderBoard
async function leaderBoard() {
    try {
        let security_key = document.getElementById("security_key").value;
        let responseMessage = document.getElementById("security_key_message");
        let leaderBoardWeek = document.getElementById("leaderBoard");
        let noDataFound = document.getElementById("leaderboardNodata");
        noDataFound.innerText = "";
        let public_endPoint = public_API.Api_host + public_API.endpoint_getLeaderboardData + "?security_key=" + security_key;
        console.log(public_endPoint, "url");
        await fetch(public_endPoint, {
            method: "GET"
        })
            .then((result) => {
                if (result) {
                    if (result.status == 403) {
                        responseMessage.innerText = "Unauthorized security_key";
                        let text = result.statusText;
                        response(text);
                    } else {
                        result.json().then((result) => {

                            if (result) {
                                leaderBoardWeek.innerText = "";
                                leaderBoardWeek.innerText = `-Week-${result.data.data.weekName}`
                                let data = result.data.data.players;
                                if (data && data.length > 0) {
                                    let tabledata = "";
                                    data.forEach((value) => {
                                        tabledata += `<tr>
                   <td>${value.firstName}</td>
                   <td>${value.winnings}</td>
                   <td>${value.rewardAmount.replace(/[()]/g, '')}</td>
                   <td>${value.totalWinAmount}</td>

                   </tr>`;
                                    });
                                    document.getElementById("table_data2").innerHTML = tabledata;
                                } else {
                                    noDataFound.innerText = "No Data Found";

                                }
                            } else {
                                noDataFound.innerText = "No Data Found";
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

