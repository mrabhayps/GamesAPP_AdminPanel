/*functionality = to generate a push notification from the ga backend
*/


const btn = document.getElementById("button_otp");
const tBody = document.getElementById('table_data');
const idFilter = document.getElementById('idFilter');
const filterBtn = document.getElementById('filterBtn');
const security_key = document.getElementById('security-key');
const navBtn = document.getElementsByClassName('dropbtn');
const active = document.getElementById('otp-detail');


for(let i=0; i<navBtn.length; i++){    
    navBtn[i].style.background = '#ecf4fd';
}
active.style.background = '#a7a0a0';

btn.addEventListener('click' , async () => {
    tBody.innerHTML = "";
    tBody.innerHTML = "<img style='margin:10vw' src='https://cdn.pixabay.com/animation/2023/04/16/16/41/16-41-15-249_512.gif'>";
    const data = await fetch(public_API.Api_host + public_API.endpoint_otp + '?securityKey=' + security_key.value ).then(res => res.json())
                 .then(data => data.data);
    console.log('clicked')
    console.log(data);
    tBody.innerHTML = "";

    if(data == 'Not Authorized'){
        tBody.innerHTML = '<h1> Unauthorized Security Key </h1>';
        return;
    }

    if(data.length === 0){
        tBody.innerHTML = '<h1> No Data Available </h1>';
        return;
    }


    let j=0;
    for(let i=0; i<data.length; i++){
        if(data[i].status == 0){
            continue;
        }
        showData(data[i].id , data[i].mobile , data[i].otp , data[i].createdAt , data[i].updatedAt , data[i].status , j)
        j++;
    }
})

filterBtn.addEventListener('click' , async () => {
    tBody.innerHTML = "";
    const data = await fetch(public_API.Api_host + public_API.endpoint_otp + '?securityKey=' + security_key.value ).then(res => res.json())
                 .then(data => data.data);
    console.log('clicked')
    console.log(data);

    let j=0;
    for(let i=0; i<data.length; i++){
        if(data[i].mobile == idFilter.value){
            if(data[i].status == 0){
                continue;
            }
            showData(data[i].id , data[i].mobile , data[i].otp , data[i].createdAt , data[i].updatedAt , data[i].status , j)
            j++;
        }
    }
    if(j==0){
        tBody.innerHTML = '<h1> No Data Available </h1>';
        return;
    }
})

function showData(Id, mobile, otp, createdAt, updatedAt, status, i) {

    const parentElem = document.createElement('tr');
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.innerText = i + 1
    const td1 = document.createElement('td');
    const td2 = document.createElement('th');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const td6 = document.createElement('td');
    
    td1.innerText = Id;
    td2.innerText = mobile;
    td3.innerText = otp;
    td4.innerHTML = new Date(createdAt).toUTCString().split(' ').slice(0,5).join(' ')
    // + "<br> "  +new Date(createdAt).toLocaleTimeString();
    td5.innerHTML = new Date(updatedAt).toUTCString().split(' ').slice(0,5).join(' ')
    // + "<br> " + new Date(createdAt).toLocaleTimeString() ;
    td6.innerText = status;
    parentElem.appendChild(th)
    parentElem.appendChild(td1)
    parentElem.appendChild(td2)
    parentElem.appendChild(td3)
    parentElem.appendChild(td4)
    parentElem.appendChild(td5)
    parentElem.appendChild(td6)
    tBody.appendChild(parentElem)
}

// export async function sendPushNotification() {
//     try {
//         console.log('clicked')
//     } catch (error) {
//       let text = "Internal server error";
//       response(text);
//     }
//   }
  