const MAX = 3;
var results = { chance: MAX, dices: []}
const baseURL = "https://raw.githubusercontent.com/PisaCoderDojo/Scratch-lessons/master/scratch-dices/img/dadiv2/";

function loadResults(){
    let placeHolder = [MAX,"dado-0.png","dado-0.png","dado-0.png","dado-0.png","dado-0.png","dado-0.png"];
    let itemsArray = localStorage.getItem('_BuccaneerDev_dices') ? JSON.parse(localStorage.getItem('_BuccaneerDev_dices')) : placeHolder;
    results = {dices: itemsArray.slice(-1,1), chance: parseInt(itemsArray[0])};
    let i =1;
    $('td:first-child').each(function() {
        $(this).children(":first").attr('src',baseURL+itemsArray[i]);
        i++;
    });
    $('#chance').text(results.chance);
}

function saveResults(){
  let itemsArray = [  results.chance, ...results.dices];
  localStorage.setItem('_BuccaneerDev_dices', JSON.stringify(itemsArray));
}

function rngDice(){
    return Math.floor(Math.random() * 6) + 1  ;
}

$(function() {
 loadResults();
 $('.random').on("click",function(){
   if (results.chance <= 0) return null;
   let r = true;
   if(results.chance < MAX){
     let txt = "Sicuro di voler rilanciare i dadi? Hai solo "+(results.chance == 1 ? "un altro tentativo!" : "altri "+results.chance+" tentativi!" );
     r = confirm(txt);
   }
   if (r == true) {
    var die = 1;
    results.chance = results.chance -1;
    $( "#chance" ).text(results.chance);
    results.dices = [];
    $('td:first-child').each(function() {
        let rndX = rngDice();
        let dieName = "dado-"+die+"-"+rndX+".png";
        results.dices.push(dieName);
        $(this).children(":first").attr('src',baseURL+dieName);
        die += 1;
      });
      saveResults();
    }
 });
});