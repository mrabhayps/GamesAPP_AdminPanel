//to render response in form of html
function response(text) {
    let para = document.createElement("p");
    para.innerText = text;
    document.body.appendChild(para);
    return;
}

  