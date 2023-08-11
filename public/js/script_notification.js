/*functionality = to generate a push notification from the ga backend
*/

async function sendPushNotification() {
  try {
    /*
    preparing the data for query  
    */
    let query = "?";
    /*getting notificationType option from html
    */
    let notificationType = document.getElementById("form_notification").value;
    
    if (notificationType=="Choose your option") {
        /*if  any option is not chosen 
        */
      let text = "please choose an option";
      response(text);
    } else {
        /*adding notificationtype in query
        */
      query+= "notificationType=" + notificationType;
        /*getting version from html
        */
      let version = document.getElementById("version_type").value;
        
      if (!version || version.trim().length == 0) {
        /*if any input is not given in version
        */
        let text = "please give input ALL or specific version ";
        response(text);
      } else {
        query += "&version=" + version;
        /*getting notification text from html
        */
        let msg = document.getElementById("notification_text").value;

        if (!msg || msg.trim().length == 0) {
            /*if any input is not given in masg
            */
          let text = "please give a msg";
          response(text);
        } else {
          query += "&msg=" + msg;
          /*getting url link from  html(this is optional)
          */
          let url = document.getElementById("url_link").value;
          if (url && url.trim().length > 0) {
            query +="&url=" + url;
          }
          /*security_key taking from frontend
          */
          let security_key = document.getElementById("security_key").value;
          query += "&security_key=" + security_key;
          
          /*preparing the public_endpoint for api call
          */
          let public_endPoint =
            public_API.Api_host +
            public_API.endpoint_sendPushNotification +
            query;
           console.log(public_endPoint)
           /* api call to adminpanel backend
           */
          await fetch(public_endPoint, {
            method: "GET",
          })
            .then((result)=>{
              /*from sucessfully getting response from the web backend
              */  
              result
                .text()
                .then((result) => {
                  result=JSON.parse(result)
                  /*showing response to the page
                  */
                  let text = result.meta.message;
                  response(text);
                })
                .catch((err) => {
                  let text = "Internal server error";
                  response(text);
                })
            }
            )
            .catch((err) => {
              let text = "Internal server Error";
              response(text);
            });
        }
      }
    }
  } catch (error) {
    let text = "Internal server error";
    response(text);
  }
}
