var results = { chance: 3, dices: []}
const baseURL = "https://raw.githubusercontent.com/Ventrosky/web-projects/master/coderdojo29_pi_ap/img/dadi/";

function loadResults(){
    let placeHolder = [3,"dado-0.png","dado-0.png","dado-0.png","dado-0.png","dado-0.png","dado-0.png"];
    let itemsArray = localStorage.getItem('_BuccaneerDev_dices') ? JSON.parse(localStorage.getItem('_BuccaneerDev_dices')) : placeHolder;
    results = {dices: itemsArray.splice(-1,1), chance: parseInt(itemsArray[0])};
    console.log(itemsArray);
    let i =1;
    $('td:first-child').each(function() {
        $(this).children(":first").attr('src',baseURL+itemsArray[i]);
        i++;
    });
    $('#chance').text(results.chance);
}

function saveResults(){
  let itemsArray = [  results.chance, ...results.dices];
  console.log(itemsArray);
  localStorage.setItem('_BuccaneerDev_dices', JSON.stringify(itemsArray));
  //results = { chance: results.chance, dices: itemsArray};
}

function rngDice(){
    return Math.floor(Math.random() * 6) + 1  ;
}

$(function() {
 loadResults();
 $('.random').on("click",function(){
   if (results.chance <= 0) return null;
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
 });
});