

var widthOriginale= 477
var ultimaDimensione = 477
var simboliNascosti = [   "Sea Img",   "Shark",   "StarFish"];
var nodiArea;
var coordinate;

function gestoreClickArea () {   
    try {      
        alert (simboliNascosti[this.id]);   
    } catch ( e ) {      
        alert ("gestoreClickArea " + e);   
    } 
}


function gestoreResize (){
    console.log("resize");
    var ratio = document.body.clientWidth / ultimaDimensione;
    for (var i = 0; i < nodiArea.length; i++) {
        for (var j = 0; j < coordinate[i].length; j++) {
            coordinate[i][j] *= ratio;
        }
        nodiArea[i].coords = coordinate[i].join(',');
    }
    //ultimaDimensione = document.body.clientWidth;
    ultimaDimensione = document.getElementById('tuttomondo').width;
    return true;
}

function gestoreLoad () {   
    try {      
        nodiArea = document.getElementsByTagName("area"); 
        coordinate = [];      
        for (var i = 0; i < nodiArea.length; i++){         
            nodiArea[i].onclick = gestoreClickArea;  
            coordinate[i] = nodiArea[i].coords.split(',');
        }      

        gestoreResize();

    } catch ( e ) {
      alert ("gestoreLoad " + e);   
    } 
} 
window.onload = gestoreLoad; // contenuti 
window.onresize = gestoreResize;

