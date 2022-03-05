function getBookId(obj) {

  var bookType =obj.id;
  alert(bookType);
  console.log(bookType);
  document.getElementById("titlename").innerHTML=bookType;
  location.href="./searchPage.html";
}
function getBooks() {
  var q = document.getElementById("titlename").textContent;
console.log(q);
  fetch("https://gutendex.com/books?topic="+q+"").then(data=>{ // fetching Books by book Catogory
    return data.json();
  }).then((completedata)=>{
    console.log(completedata.results);
    let dataset ="";
    let dataset2 ="";
    completedata.results.map((values)=>{
    var imagelink = values.formats["text/html"];

      dataset+=`<div class="imgDiv col-md-2"  ><a href="${values.formats["text/html"]}" target="blank"><img src="${values.formats["image/jpeg"] }" id="coverImg" alt=""></a>`;
      dataset+=`<div class="title">${ values.title }</div>`;
      dataset+=`<div class="name">${ values.authors[0].name}</div></div>`;

  });
  window.addEventListener('scroll', ()=>{ // added for infinite loop
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    console.log({scrollTop, scrollHeight, clientHeight});
    if (clientHeight + scrollTop >=  scrollHeight - 5) {

      completedata.results.map((value)=>{
          dataset2+=`<div class="imgDiv col-md-2"  ><a href="${value.formats["text/html"]}" target="blank"><img src="${value.formats["image/jpeg"] }" id="coverImg" alt=""></a>`;
          dataset2+=`<div class="title">${ value.title }</div>`;
          dataset2+=`<div class="name">${ value.authors[0].name}</div></div>`;

      });
      document.getElementById("card").innerHTML=dataset2;
    }
  });
  document.getElementById("card").innerHTML=dataset;
  });


  const searchFieldElement= document.getElementById("searchhere");
  searchFieldElement.onkeyup = (event) => {
  clearTimeout(searchTimeoutToken);
  searchTimeoutToken = setTimeout(() =>{
    searchShow(searchFieldElement.value);
  },250);
  };

}

function searchShow(searchquery) {
  var currentquery =document.getElementById("titlename").textContent;
console.log(currentquery);
  fetch("https://gutendex.com/books?topic="+currentquery+"&search="+searchquery+"")
  .then(response=>response.json())
  .then((jsondata)=>{
    console.log(jsondata)

let dataset ="";
var hotText = 'MDN';

    jsondata.results.map((searchvalues)=>{
      dataset+=`<div class="imgDiv col-md-2"  ><a href="${searchvalues.formats["text/html"]}" target="blank"><img src="${searchvalues.formats["image/jpeg"] }" id="coverImg" alt=""></a>`;
      dataset+=`<div class="title">${ searchvalues.title }</div>`;
      dataset+=`<div class="name">${ searchvalues.authors[0].name}</div></div>`;

  });
  document.getElementById("card").innerHTML=dataset;
})
}

let searchTimeoutToken = 0;

function searchfunction(){
  const searchFieldElement= document.getElementById("searchhere");

  clearTimeout(searchTimeoutToken);
  searchTimeoutToken = setTimeout(() =>{
    searchShow(searchFieldElement.value);
  },250);

}
