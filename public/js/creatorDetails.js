
const btn = document.getElementById("button_creator");
const tBody = document.getElementById('table_data');
const security_key = document.getElementById('security-key');
const pagingBtns = document.getElementById('nav-button');
let page = 1;
const navBtn = document.getElementsByClassName('dropbtn');
const active = document.getElementById('creator');


for(let i=0; i<navBtn.length; i++){    
    navBtn[i].style.background = '#ecf4fd';
}
active.style.background = '#a7a0a0';

btn.addEventListener('click' , async () => {
    tBody.innerHTML = "";
    pagingBtns.innerHTML = "";

    tBody.innerHTML = "<img style='margin:10vw' src='https://cdn.pixabay.com/animation/2023/04/16/16/41/16-41-15-249_512.gif'>";
    
    const response = await fetch(public_API.Api_host + public_API.endpoint_creatorDetails
        + '?securityKey=' + security_key.value + '&page=' + page)
                .then(res => res.json())
    console.log('clicked')
    const count = response.count;
    const data = response.data;
    console.log(data);
    console.log(count);
    console.log(page);

    if(data == 'Not Authorized'){
        tBody.innerHTML = '<h1> Unauthorized Security Key </h1>';
        return;
    }
    
    tBody.innerHTML = "";


    for(let i=0; i<data.length; i++){
        showData(data[i].firstName , data[i].lastName , data[i].mobile , data[i].fkUserId , data[i].socialMediaLink,
             data[i].status , data[i].createdAt , data[i].updatedAt , i);
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
            const response = await fetch(public_API.Api_host + public_API.endpoint_creatorDetails
                + '?securityKey=' + security_key.value + '&page=' + page)
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
        
        
            for(let i=0; i<data.length; i++){
                showData(data[i].firstName , data[i].lastName , data[i].mobile , data[i].fkUserId , data[i].socialMediaLink,
                    data[i].status , data[i].createdAt , data[i].updatedAt , i+((page-1)*10));
            }
        })
    }

})






function showData(firstName , lastName , mobile , fkUserId , socialMediaLink, status , createdAt, updatedAt,  i) {

    const parentElem = document.createElement('tr');
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.innerText = i + 1
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const td6 = document.createElement('td');
    const td7 = document.createElement('td');
    const td8 = document.createElement('td');
    
    td1.innerText = firstName;
    td2.innerText = lastName;
    td3.innerText = mobile;
    td4.innerText = fkUserId;
    td5.innerHTML = `<a href="${socialMediaLink}"> ${socialMediaLink} </a>`;
    td6.innerText = status;
    td7.innerHTML = new Date(createdAt).toUTCString().split(' ').slice(0,5).join(' ')
    td8.innerHTML = new Date(updatedAt).toUTCString().split(' ').slice(0,5).join(' ')
    parentElem.appendChild(th)
    parentElem.appendChild(td1)
    parentElem.appendChild(td2)
    parentElem.appendChild(td3)
    parentElem.appendChild(td4)
    parentElem.appendChild(td5)
    parentElem.appendChild(td6)
    parentElem.appendChild(td7)
    parentElem.appendChild(td8)
    tBody.appendChild(parentElem)
}