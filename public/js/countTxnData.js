const withdrawal = document.getElementById('withdrawalData')
const deposit = document.getElementById('depositData')
const securityKey = document.getElementById('security-key')
const button = document.getElementById('button_count')
const navBtn = document.getElementsByClassName('dropbtn');
const active = document.getElementById('payment-services');


for(let i=0; i<navBtn.length; i++){ 
    navBtn[i].style.background = '#ecf4fd';
}
active.style.background = '#a7a0a0';

button.addEventListener('click' , getCountData);

async function getCountData()  {

    withdrawal.innerHTML = '<h4>Loading..</h4>';
    deposit.innerHTML = '<h4>Loading..</h4>';

    const data = await fetch(public_API.Api_host + public_API.endpoint_countTxnDetails + "?securityKey=" 
    + securityKey.value + '&page=').then( res => res.json()).then(data => data.data);

    console.log(data)

    if(data == "Not Authorized"){
        
        deposit.innerHTML = `<h4>Unauthorized Security Key</h4>`

        withdrawal.innerHTML = `<h4>Unauthorized Security Key</h4>`

        return;
    }

    deposit.innerHTML = `<h4>Success :- ${data.depositSuccess[0].count}</h4>  
                         <h4>Fails :- ${data.depositFail[0].count}</h4>`

    withdrawal.innerHTML = `<h4>Success :- ${data.withdrawalSuccess[0].count}</h4> 
                            <h4>Fails :- ${data.withdrawalFail[0].count}</h4>`
}