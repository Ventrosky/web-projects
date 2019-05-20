let utenti = [{value:"già presente 1",state:"fetched"},{value:"già presente 2",state:"fetched"},{value:"già presente 3",state:"fetched"}]


function loadItem(value, opt){
    var opt = opt || "insert";
    var ul = document.getElementById("dynamic-list");
    var li = document.createElement("li");
    li.setAttribute('id',value);
    li.appendChild(document.createTextNode(value));
    ul.appendChild(li);
    li.addEventListener("click", editabile);
    utenti.push({value,state:opt});
}
function addItem(){
    var ul = document.getElementById("dynamic-list");
    var myuser = document.getElementById("myuser");
    var li = document.createElement("li");
    li.setAttribute('id',myuser.value);
    li.appendChild(document.createTextNode(myuser.value));
    ul.appendChild(li);
    li.addEventListener("click", editabile);
    utenti.push({value: myuser.value,state:"insert"});
}

function removeItem(){
    var ul = document.getElementById("dynamic-list");
    var myuser = document.getElementById("myuser");
    var item = document.getElementById(myuser.value);
    var idx = utenti.findIndex((e)=> e.value == myuser.value );
    ul.removeChild(item);
    if(idx>-1 ){
        utenti[idx].state = "delete";
    }
}

function readCSVtoJSON(evt) {
  var f = evt.target.files[0]; 
  console.log("output");
  if (f) {
    var r = new FileReader();
    r.onload = function(e) { 
        var contents = e.target.result;
        var lines = contents.split("\n");
        var output = [];
        var keys = lines[0].split(";");
        for (var i=1; i<lines.length; i++){
          var fields = lines[i].split(";");
          var obj = {}
          for (var j=0; j<fields.length; j++){
              obj[keys[j]]=fields[j];
          }
          output.push( obj);
          loadItem(fields.join(" "))
        }
        console.log(output);
   }
    r.readAsText(f);
  } else { 
    alert("Failed to load file");
  }
}

function saveChanges(){
    var outJSON = {
        "update": utenti.filter(user => user.state == "update").map(user => user.value),
        "insert": utenti.filter(user => user.state == "insert").map(user => user.value),
        "delete": utenti.filter(user => user.state == "delete").map(user => user.value)
    }
    console.log(outJSON)
}

const editabile = function() {
    $(this).attr('contenteditable', 'true');
    var idx = utenti.findIndex((e)=> e.value == $(this).html() );

    if (idx>-1 && utenti[idx].state == "fetched"){
        utenti[idx].state = "update";
    }
};
$( document ).ready(function() {
    document.getElementById('fileinput').addEventListener('change', readCSVtoJSON);
    utenti.forEach(function(item){
        loadItem(item.value, item.state);
      });
  });