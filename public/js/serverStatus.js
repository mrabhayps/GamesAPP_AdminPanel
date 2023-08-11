const state = document.getElementById('serverStatus');

document.addEventListener('DOMContentLoaded', getStatus);

async function getStatus(){
   
   const data =await fetchData();


    if(data=='UP'){
       state.innerHTML = `<h1 id='home-heading' style="margin-left: 5vw">✅</h1><span> Gamesapp is up and running </span>`;
    }else{
       state.innerHTML = '<h1 id="home-heading" style="color:red; margin-left: 7vw">⇩</h1><span>Gamesapp Backend server is down</span>'
    }

  }

  async function fetchData(){
   const data = await fetch(public_API.Api_host + public_API.endpoint_serverStatus).then(res => res.json())
   .then(data => data.data);

   console.log(data);
   return data;
  }

  setInterval(getStatus , 5000);
  