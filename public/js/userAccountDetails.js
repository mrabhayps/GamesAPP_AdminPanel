
const btn = document.getElementById("button_userAccount");
const tBody = document.getElementById('table_data');
const idFilter = document.getElementById('idFilter');
const filterBtn = document.getElementById('filterBtn');
const filterType = document.getElementById('filterType');
const security_key = document.getElementById('security-key');
const pagingBtns = document.getElementById('nav-btns');
const Btn1 = document.getElementById('btn1');
const Btn2 = document.getElementById('btn2');
const Btn3 = document.getElementById('btn3');
const Btn4 = document.getElementById('btn4');
const Btn5 = document.getElementById('btn5');
const jump = document.getElementById('jump');
const goTo = document.getElementById('goto');
let page = 1;
const navBtn = document.getElementsByClassName('dropbtn');
const active = document.getElementById('bank-detail');


for(let i=0; i<navBtn.length; i++){    
    console.log('aaaaaa');
    navBtn[i].style.background = '#ecf4fd';
}
active.style.background = '#a7a0a0';



//To Fetch and Load table first Page User Bank Account Data

btn.addEventListener('click' , async () => {
    tBody.innerHTML = "";
    filterType.value = "Choose Filter";
    Btn1.disabled = false;
    Btn2.disabled = false;
    Btn3.disabled = false;
    Btn4.disabled = false;
    Btn5.disabled = false;
    if(page==1){
        Btn2.innerHTML = '2';
        Btn3.innerHTML = '3';
        Btn4.innerHTML = '4';
    }
    
    tBody.innerHTML = "<img style='margin:10vw' src='https://cdn.pixabay.com/animation/2023/04/16/16/41/16-41-15-249_512.gif'>";
    const response = await fetch(public_API.Api_host + public_API.endpoint_userAccountDetails 
        + '?securityKey=' + security_key.value + '&page=' + page)
                .then(res => res.json())
    console.log('clicked')
    const count = response.count;
    const data = response.data;
    console.log(data);
    console.log(count);

    tBody.innerHTML = "";

    if(data == 'Not Authorized'){
        tBody.innerHTML = '<h1> Unauthorized Security Key </h1>';
        return;
    }
    if(data.length === 0){
        tBody.innerHTML = '<h1> No Data Available </h1>';
        return;
    }


    for(let i=0; i<data.length; i++){
        showData(data[i] , i+1 , page);
    }

    Btn5.innerHTML = `${parseInt(count/100) + 1}`;

    if(count<=100){
        Btn2.disabled = true;
        Btn3.disabled = true;
        Btn5.disabled = true;
        Btn4.disabled = true;
    }
    else if(count<=200){
        Btn3.disabled = true;
        Btn5.disabled = true;
        Btn4.disabled = true;
    }
    else if(count<=300){
        Btn5.disabled = true;
        Btn4.disabled = true;
    }
    else if(count<=400){
        Btn5.disabled = true;
    }

    
    // for(let i=0; i<count/100; i++){
    //     const Btn = document.createElement('button');
    //     Btn.classList.add("btn")
    //     Btn.classList.add("btn-primary")
    //     Btn.classList.add('Paging')
    //     Btn.innerHTML = i+1;
    //     Btn.style.marginTop = '1px';
    //     Btn.style.marginLeft = '3px';
    //     pagingBtns.appendChild(Btn);
    // }

    const btnList = document.getElementsByClassName('Paging');

    for(let i=0; i<btnList.length; i++){
        btnList[i].addEventListener('click' , async () => {
            page = btnList[i].innerHTML ;
            tBody.innerHTML = "";
            filterType.value = "Choose Filter";
            tBody.innerHTML = "<img style='margin:10vw' src='https://cdn.pixabay.com/animation/2023/04/16/16/41/16-41-15-249_512.gif'>";
        
            const response = await fetch(public_API.Api_host + public_API.endpoint_userAccountDetails 
                + '?securityKey=' + security_key.value + '&page=' + page)
                        .then(res => res.json())
            console.log('clicked')
            const count = response.count;
            const data = response.data;
            console.log(data);
            console.log(count);
            Btn2.innerHTML = `${parseInt(page) - 1}`;
            Btn3.innerHTML = `${parseInt(page)}`;
            Btn4.innerHTML = `${parseInt(page) + 1}`;

            if(page ==1){
                Btn2.disabled = true;
                Btn3.disabled = true;
                Btn4.disabled = false;
            }
            else if(page ==2){
                Btn2.disabled = true;
                Btn3.disabled = false;
                Btn4.disabled = false;
            }
            else if(page == (parseInt(count/100)+1)){
                Btn4.disabled = true;
                Btn2.disabled = false;
                Btn3.disabled = false;
            }
            else{
                Btn2.disabled = false;
                Btn3.disabled = false;
                Btn4.disabled = false;
            }
            tBody.innerHTML = "";
        
            if(data == 'Not Authorized'){
                tBody.innerHTML = '<h1> Unauthorized Security Key </h1>';
                return;
            }
            if(data.length === 0){
                tBody.innerHTML = '<h1> No Data Available </h1>';
                return;
            }
        
        
            for(let i=0; i<data.length; i++){
                showData(data[i] , i+1 , page);
            }
        })
    }


//To Jump on any page in table

jump.addEventListener('click' , async () => {
    page = goTo.value ;
    console.log(page);
    tBody.innerHTML = "";
    filterType.value = "Choose Filter";
    
    tBody.innerHTML = "<img style='margin:10vw' src='https://cdn.pixabay.com/animation/2023/04/16/16/41/16-41-15-249_512.gif'>";
        
    // pagingBtns.innerHTML = "";
    const response = await fetch(public_API.Api_host + public_API.endpoint_userAccountDetails 
        + '?securityKey=' + security_key.value + '&page=' + `${page}`)
                .then(res => res.json())
    console.log('clicked')
    const count = response.count;
    const data = response.data;
    console.log(data);
    console.log(count);

    
    Btn2.innerHTML = `${parseInt(page) - 1}`;
    Btn3.innerHTML = `${parseInt(page)}`;
    Btn4.innerHTML = `${parseInt(page) + 1}`;

    tBody.innerHTML = "";

    if(data == 'Not Authorized'){
        tBody.innerHTML = '<h1> Unauthorized Security Key </h1>';
        return;
    }
    if(data.length === 0){
        tBody.innerHTML = '<h1> No Data Available </h1>';
        return;
    }
    else if(data){
        for(let i=0; i<data.length; i++){
            showData(data[i] , i+1 , page);
        }
    }


})

})

//To Load Table by applying Filters

filterBtn.addEventListener('click' , async () => {
    tBody.innerHTML = "";
    const response = await fetch(public_API.Api_host + public_API.endpoint_userAccountDetails + 
                    '?securityKey=' + security_key.value + '&page=filter')
                .then(res => res.json())
    console.log('clicked')
    const count = response.count;
    const data = response.data;
    console.log(data);
    console.log(count);
    let countRes = 0;

    for(let i=0; i<data.length; i++){
        if(data[i].fkUserId == idFilter.value){
            showData(data[i] , i+1 , page);
            countRes+=1;
        }
    }
    if(countRes==0){
        tBody.innerHTML = '<h1> No Data For Last 1 Day </h1>';
    }
})



function showData(data , sNo , page) {
    let keys = Object.keys(data);
    const parent = document.createElement('tr');

    for(let i=0; i<keys.length; i++){
        const td = document.createElement('td')
        if(typeof data[keys[i]] == 'object'){
            td.innerHTML = JSON.stringify(data[keys[i]]);
        }
        else if(keys[i] == 'image' || keys[i] == 'defaultImage'){
            td.innerHTML = `<a href='${data[keys[i]]}'> ${data[keys[i]]} </a>`
        }
        else if(keys[i] == 'isAccountVerified'){
            if(data[keys[i]]==20){
                td.style.color = 'green';
                td.innerHTML = '<b>Verified</b>' ;
            }
            else if(data[keys[i]]==30){
                td.style.color = 'red';
                td.innerHTML = '<b>Failed</b>' ;
            }
            else if(data[keys[i]]==10){
                td.innerHTML = '<b>InProgress</b>' ;
            }
            else if(data[keys[i]]==0){
                td.innerHTML = '<b>Not-Verified</b>' ;
            }
            else{
                td.innerHTML = data[keys[i]] ;
            }
        }
        else if(keys[i] == 'isActive' || keys[i] =='isKYC'){
            if(data[keys[i]]==1){
                td.style.color = 'green';
                td.innerHTML = '<b>Active</b>' ;
            }
            else if(data[keys[i]]==0){
                td.style.color = 'red';
                td.innerHTML = '<b>Not Active</b>' ;
            }
            else{
                td.innerHTML = data[keys[i]] ;
            }
        }
        else if(keys[i] == 'createdAt' || keys[i] =='updatedAt'){
            td.innerHTML = new Date(data[keys[i]]).toUTCString() + '<br>'
            // + new Date(data[keys[i]]).toLocaleTimeString();
        }
        else if(keys[i] == 'id'){
            td.innerHTML = '<b>' + ((parseInt(page)-1)*100 + sNo) + '</b>'
        }
        else{
            td.innerHTML = data[keys[i]];
        }
        parent.appendChild(td);
    }

    tBody.appendChild(parent);
}

filterType.addEventListener('change' , async () => {
    console.log(filterType.value);
    if(filterType.value == 'Is Active'){
        Btn1.disabled = true;
        Btn2.disabled = true;
        Btn3.disabled = true;
        Btn4.disabled = true;
        Btn5.disabled = true;
        tBody.innerHTML = "";
        const response = await fetch(public_API.Api_host + public_API.endpoint_userAccountDetails + 
                        '?securityKey=' + security_key.value + '&page=filter')
                    .then(res => res.json())
        console.log('clicked')
        const count = response.count;
        const data = response.data;
        console.log(data);
        console.log(count);
        let isActiveCount=0
        for(let i=0; i<data.length; i++){
            if(data[i].isActive == 1){
                showData(data[i] , i+1 , page);
                isActiveCount+=1;
            }
        }
        if(isActiveCount==0){
            tBody.innerHTML = '<h1> No Data For Last 1 Day </h1>';
        }
    }
    else if(filterType.value == 'Is Account Verified'){
        Btn1.disabled = true;
        Btn2.disabled = true;
        Btn3.disabled = true;
        Btn4.disabled = true;
        Btn5.disabled = true;
        tBody.innerHTML = "";
        const response = await fetch(public_API.Api_host + public_API.endpoint_userAccountDetails + 
                        '?securityKey=' + security_key.value + '&page=filter')
                    .then(res => res.json())
        console.log('clicked')
        const count = response.count;
        const data = response.data;
        console.log(data);
        console.log(count);
    
        let isVerifiedCount = 0 ;
        for(let i=0; i<data.length; i++){
            if(data[i].isAccountVerified == 20){
                showData(data[i] , i+1 , page);
                isVerifiedCount+=1;
            }
        }
        if(isVerifiedCount==0){
            tBody.innerHTML = '<h1> No Data For Last 1 Day </h1>';
        }
    }
})


