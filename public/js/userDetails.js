
const btn = document.getElementById("button_user");
const tBody = document.getElementById('table_data');
const idFilter = document.getElementById('idFilter');
const filterBtn = document.getElementById('filterBtn');
const security_key = document.getElementById('security-key');
const pagingBtns = document.getElementById('nav-button');
const dateFilterBtn = document.getElementById('dateFilterBtn');
let page = 1;
const navBtn = document.getElementsByClassName('dropbtn');
const active = document.getElementById('user-detail');


for(let i=0; i<navBtn.length; i++){    
    console.log('aaaaaa');
    navBtn[i].style.background = '#ecf4fd';
}
active.style.background = '#a7a0a0';



btn.addEventListener('click' , async () => {
    tBody.innerHTML = "";
    pagingBtns.innerHTML = "";

    
    tBody.innerHTML = "<img style='margin:10vw' src='https://cdn.pixabay.com/animation/2023/04/16/16/41/16-41-15-249_512.gif'>";

    const response = await fetch(public_API.Api_host + public_API.endpoint_userDetails 
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
        showData(data[i]);
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
            const response = await fetch(public_API.Api_host + public_API.endpoint_userDetails
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
            
            if(data.length === 0){
                tBody.innerHTML = '<h1> No Data Available </h1>';
                return;
            }
        
        
            for(let i=0; i<data.length; i++){
                showData(data[i]);
            }
        })
    }

})


filterBtn.addEventListener('click' , async () => {
    tBody.innerHTML = "";
    const response = await fetch(public_API.Api_host + public_API.endpoint_userDetails+ '?securityKey=' + security_key.value +'&page=filter')
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


    let countFilterRes = 0;
    for(let i=0; i<data.length; i++){
        if(data[i].id == idFilter.value){
            showData(data[i]);
            countFilterRes+=1;
        }
    }
    if(countFilterRes==0){
            tBody.innerHTML = '<h1> No Data Available </h1>';
            return;
    }
})

dateFilterBtn.addEventListener('click', async () => {
    const dateFilter = document.getElementById('dateFilter').value;
    console.log(dateFilter);

  const currentDate = new Date().toISOString().split('T')[0];

  if (dateFilter >= currentDate) {
    tBody.innerHTML = '<tr><td colspan="18" class="text-center">Please select a date before the current date.</td></tr>';
    return;
  }

    const response = await fetch(public_API.Api_host + public_API.endpoint_userDetails 
      + '?securityKey=' + security_key.value + '&page=filter&date=' + dateFilter)
      .then(res => res.json());
  
    const data = response.data;
  
    tBody.innerHTML = "";
    pagingBtns.innerHTML = "";
  
    if (data == 'Not Authorized') {
      tBody.innerHTML = '<h1> Unauthorized Security Key </h1>';
      return;
    }
  
    const filteredData = data.filter(item => item.createdAt.startsWith(dateFilter));

    if (filteredData.length === 0) {
        tBody.innerHTML = '<tr><td colspan="18" class="text-center">No data available for the selected date.</td></tr>';
        return;
      }
    
    for (let i = 0; i < filteredData.length; i++) {
      showData(filteredData[i]);
    }
  });
  


function showData(data) {
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
        else{
            td.innerHTML = data[keys[i]];
        }
        parent.appendChild(td);
    }

    tBody.appendChild(parent);
}
