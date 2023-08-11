
const btn = document.getElementById("button_error");
const tBody = document.getElementById('table_data');
const idFilter = document.getElementById('idFilter');
const filterBtn = document.getElementById('filterBtn');
const security_key = document.getElementById('security-key');
const pagingBtns = document.getElementById('nav-button');
let page = 1;
const navBtn = document.getElementsByClassName('dropbtn');
const active = document.getElementById('error-detail');
const calendar = document.getElementById('days');

calendar.addEventListener('change' , async () => {
    console.log(new Date(calendar.value));
    let timePeriod = new Date() - new Date(calendar.value);
    let daysCount = parseInt((timePeriod/1000)/(60*60*24));
    console.log(daysCount);

    tBody.innerHTML = "";
    pagingBtns.innerHTML = "";

    tBody.innerHTML = "<img style='margin:10vw' src='https://cdn.pixabay.com/animation/2023/04/16/16/41/16-41-15-249_512.gif'>";
    
    const response = await fetch(public_API.Api_host + public_API.endpoint_errorDetails 
        + '?securityKey=' + security_key.value + '&page=' + page + '&days=' + `${daysCount}`)
                .then(res => res.json())
    console.log('clicked')
    const count = response.count;
    const data = response.data;
    console.log(data);
    console.log(count);
    console.log(page);
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
        showData(data[i].module , data[i].error_name , data[i].createdAt , data[i].updatedAt , i);
    }

    for(let i=0; i<count/100; i++){
        const Btn = document.createElement('button');
        Btn.classList.add("btn")
        Btn.classList.add("btn-primary")
        Btn.classList.add('Paging')
        Btn.innerHTML = i+1;
        Btn.style.marginTop = '1px';
        Btn.style.marginLeft = '3px';
        pagingBtns.appendChild(Btn);
    }

    const btnList = document.getElementsByClassName('Paging');

    for(let i=0; i<btnList.length; i++){
        btnList[i].addEventListener('click' , async () => {
            page = btnList[i].innerHTML ;
            tBody.innerHTML = "";
            const response = await fetch(public_API.Api_host + public_API.endpoint_errorDetails
                + '?securityKey=' + security_key.value + '&page=' + page + '&days=' + `${daysCount}`)
                        .then(res => res.json())
            console.log('clicked')
            const count = response.count;
            const data = response.data;
            console.log(data);
            console.log(count);
        
            if(data == 'Not Authorized'){
                tBody.innerHTML = '<h1> Unauthorized Security Key </h1>';
                return;
            }
            if(data.length === 0){
                tBody.innerHTML = '<h1> No Data Available </h1>';
                return;
            }
        
        
            for(let i=0; i<data.length; i++){
                showData(data[i].module , data[i].error_name , data[i].createdAt , data[i].updatedAt , i+((page-1)*10));
            }
        })
    }
})


for(let i=0; i<navBtn.length; i++){    
    navBtn[i].style.background = '#ecf4fd';
}
active.style.background = '#a7a0a0';

btn.addEventListener('click' , async () => {
    tBody.innerHTML = "";
    pagingBtns.innerHTML = "";
    calendar.value = "";

    tBody.innerHTML = "<img style='margin:10vw' src='https://cdn.pixabay.com/animation/2023/04/16/16/41/16-41-15-249_512.gif'>";
    
    const response = await fetch(public_API.Api_host + public_API.endpoint_errorDetails 
        + '?securityKey=' + security_key.value + '&page=' + page + '&days=1')
                .then(res => res.json())
    console.log('clicked')
    const count = response.count;
    const data = response.data;
    console.log(data);
    console.log(count);
    console.log(page);
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
        showData(data[i].module , data[i].error_name , data[i].createdAt , data[i].updatedAt , i);
    }

    for(let i=0; i<count/100; i++){
        const Btn = document.createElement('button');
        Btn.classList.add("btn")
        Btn.classList.add("btn-primary")
        Btn.classList.add('Paging')
        Btn.innerHTML = i+1;
        Btn.style.marginTop = '1px';
        Btn.style.marginLeft = '3px';
        pagingBtns.appendChild(Btn);
    }

    const btnList = document.getElementsByClassName('Paging');

    for(let i=0; i<btnList.length; i++){
        btnList[i].addEventListener('click' , async () => {
            page = btnList[i].innerHTML ;
            tBody.innerHTML = "";
            calendar.value = "";
            const response = await fetch(public_API.Api_host + public_API.endpoint_errorDetails
                + '?securityKey=' + security_key.value + '&page=' + page + '&days=1')
                        .then(res => res.json())
            console.log('clicked')
            const count = response.count;
            const data = response.data;
            console.log(data);
            console.log(count);
        
            if(data == 'Not Authorized'){
                tBody.innerHTML = '<h1> Unauthorized Security Key</h1>';
                return;
            }
            if(data.length === 0){
                tBody.innerHTML = '<h1> No Data Available </h1>';
                return;
            }
        
        
            for(let i=0; i<data.length; i++){
                showData(data[i].module , data[i].error_name , data[i].createdAt , data[i].updatedAt , i+((page-1)*10));
            }
        })
    }

})






function showData(module, error_name, createdAt, updatedAt,  i) {

    const parentElem = document.createElement('tr');
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.innerText = i + 1
    const td1 = document.createElement('td');
    const td2 = document.createElement('th');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    
    td1.innerText = module;
    td2.innerText = error_name;
    td3.innerHTML = new Date(createdAt).toUTCString().split(' ').slice(0,5).join(' ')
    td4.innerHTML = new Date(updatedAt).toUTCString().split(' ').slice(0,5).join(' ')
    parentElem.appendChild(th)
    parentElem.appendChild(td1)
    parentElem.appendChild(td2)
    parentElem.appendChild(td3)
    parentElem.appendChild(td4)
    tBody.appendChild(parentElem)
}