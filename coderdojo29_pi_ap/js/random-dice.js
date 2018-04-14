var $table = $('#table');
$(function () {
    $table.bootstrapTable({
        data: [{
            name: 'Dado 1 - Fantasia'
        }, {
            name: 'Dado 2 - Animali'
        }, {
            name: 'Dado 3 - Ambientazione'
        }, {
            name: 'Dado 4 - Animazione'
        }, {
            name: 'Dado 5 - Musicale'
        }, {
            name: 'Dado 6 - Scenico'
        }]
    });
});

function imageFormatter() {
    return '<img src="img/dadi/dado-0.png">';
}

function rngDice(){
    return Math.floor(Math.random() * 6) + 1  ;
}

$(function() {
 $('.random').on("click",function(){
   var die = 1;
   $('td:first-child').each(function() {
        $(this).children(":first").attr('src',"img/dadi/dado-"+die+"-"+rngDice()+".png");
        die += 1;
    });

 });
});