
var map;


var attacks = {};


function clearAttacks() {
    
    delete attacks;
    attacks = {};
}

var regionStatus = {
        "F" : 0,
        "PF" : 1,
        "NF" : 2,
        "T" : 3 
    }

$( document ).ready(function() {

    map = new jvm.Map({
        map: 'world_mill',
        backgroundColor: '#000000',
        container: $('#world-map'),
        regionStyle:{
              initial: {
                fill: 'black',
                "fill-opacity": 1,
                stroke: '#03BB03', //'#31A49C',
                "stroke-width": 1,
                "stroke-opacity": 1
              },
              hover: {
                "fill-opacity": 0.8,
                cursor: 'pointer'
              },
              selected: {
                fill: 'yellow'
              },
              selectedHover: {
              }
            },
        series: {
          regions: [{
            values: attacks,
            scale: ['#91C8FF', '#010A74'],
            normalizeFunction: 'polynomial',
            min: 1,
            max: 58778
          },{
            scale: ['#FEB79A', '#FF530D'],
            normalizeFunction: 'polynomial',
            min: 1,
            max: 5000
          },{
            scale: ['#FFB8DC', '#E80C7A'],
            normalizeFunction: 'polynomial',
            min: 1,
            max: 15000
          },{
            values: attacks,
            scale: ['#A3FEC8', '#045C01'],
            normalizeFunction: 'polynomial',
            min: 1,
            max: 58778
          }]
        },
      onRegionTipShow: function(e, el, code){
        el.html(el.html()+' (Attacks - '+attacks[code]+')');
      }
      });

    $("#pulsanti").click( function(e) {
        var status = $("#pulsanti input:checked").val();
        clearAttacks();

        var url = "api/rating.php";
 
        var color = regionStatus[status];
        if(status!="T"){
            getJSONstatus(url, {"status" : status}, map, color);
        } else {
            getJSONstatus(url, {"status" : "F"}, map, color);
            getJSONstatus(url, {"status" : "PF"}, map, color);
            getJSONstatus(url, {"status" : "NF"}, map, color);
        }
        
    });

    getJSONpie();

    getJSONmedia();

    //smooth scroll
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
    });

    / MENU + SCROLL BUTTON /
    
    jQuery( '.menu-btn' ).click(function(){
      jQuery('.responsive-menu').fadeToggle();
      jQuery('header').toggleClass('shadow-2');
    });
    

});

function getJSONstatus(url, data, map, color){

        $.getJSON(url, data, function(result){
                    // Gestione chiamata Ajax
                    // inserisco i dati nella mappa: creo un marker per ogni elemento
                    $.each(result, function(index, item){
                        // Gestione dei dati
                        
                        attacks[item["code"]] = parseInt(item["tot"]);
                        
                    });
                    //e.preventDefault();
                    map.reset();
                    map.series.regions[color].setValues(attacks);
                });
        
    };


function buildPie() {
// Make monochrome 
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [],
            base = '#03BB03',
            i;

        for (i = 0; i < 10; i += 1) {
            // Start darkened, and brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());


 // Build the chart
        $('#container').highcharts({
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Attacchi - Libertà'
            },
            subtitle: {
            text: 'Click the slices to view types.'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                       enabled: true,
                        format: '{point.name}: {point.y:.1f}%'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },
            series: [{
                name: 'Indice Libertà',
                colorByPoint: true,
                data: [{
                    name: 'Libero',
                    y: parseFloat(percentualePaese("F")),
                    drilldown: 'Libero'
                }, {
                    name: 'Parz. Libero',
                    y: parseFloat(percentualePaese("PF")),
                    drilldown: 'Parzialmente Libero'
                }, {
                    name: 'Non Libero',
                    y: parseFloat(percentualePaese("NF")),
                    drilldown: 'Non Libero'
                }]
            }],
            drilldown: {
                series: [{
                    name: 'Libero',
                    id: 'Libero',
                    data: [
                        ['TCP Connection', parseFloat(percentualeTipo("TCP Connection", "F"))],
                        ['Volumetric', parseFloat(percentualeTipo("Volumetric", "F"))],
                        ['Fragmentation', parseFloat(percentualeTipo("Fragmentation", "F"))],
                        ['Application', parseFloat(percentualeTipo("Application", "F"))]
                    ]
                }, {
                    name: 'Parzialmente Libero',
                    id: 'Parzialmente Libero',
                    data: [
                        ['TCP Connection', parseFloat(percentualeTipo("TCP Connection", "PF"))],
                        ['Volumetric', parseFloat(percentualeTipo("Volumetric", "PF"))],
                        ['Fragmentation', parseFloat(percentualeTipo("Fragmentation", "PF"))],
                        ['Application', parseFloat(percentualeTipo("Application", "PF"))]
                    ]
                }, {
                    name: 'Non Libero',
                    id: 'Non Libero',
                    data: [
                        ['TCP Connection', parseFloat(percentualeTipo("TCP Connection", "NF"))],
                        ['Volumetric', parseFloat(percentualeTipo("Volumetric", "NF"))],
                        ['Fragmentation', parseFloat(percentualeTipo("Fragmentation", "NF"))],
                        ['Application', parseFloat(percentualeTipo("Application", "NF"))]
                    ]
                }]
            }
        });

    
};

function getJSONpie(){
        var url = "api/torta.php";
        $.getJSON(url, function(result){
                    // Gestione chiamata Ajax
                    // creo ogni elemento
                    $.each(result, function(index, item){
                        // Gestione dei dati
                        
                        summary[item["status"]][item["type"]] = parseInt(item["tot"]);
                        
                    });
                    buildPie();
                });
        
    };


  var summary = { "F" : {}, "PF" : {}, "NF" : {}};  

  function percentualeTipo(tipo, key){
    var v1 = sommaAttacchi(key);
    var v2 = summary[key][tipo];
    var diffPercent = ((v2 / v1) * 100).toFixed(2);
    return diffPercent;
  };

function percentualePaese(key) {
    var v1 = sommaAttacchi("F") + sommaAttacchi("PF") + sommaAttacchi("NF");
    var v2 = sommaAttacchi(key);
    var diffPercent = ((v2 / v1) * 100).toFixed(2);
    return diffPercent;
};
  function sommaAttacchi(key){
    var somma = summary[key]["TCP Connection"] + summary[key]["Volumetric"] + summary[key]["Fragmentation"] + summary[key]["Application"];;
    
    return somma;
  };

  function buildLine(){
     $('#container2').highcharts({
        title: {
            text: 'Attacchi per libertà'
        },
        subtitle: {
            text: 'media attacchi / indici'
        },
        xAxis: {
            title: {
                text: 'Index Freedom'
            },
            
            categories: ['1', '2', '3', '4', '5', '6', '7']
        },
        yAxis: {
            title: {
                text: 'Total Attacks'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
            
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Civil Liberties',
            data: [parseInt(medie["1"]["mediacl"]), parseInt(medie["2"]["mediacl"]), parseInt(medie["3"]["mediacl"]), parseInt(medie["4"]["mediacl"]), parseInt(medie["5"]["mediacl"]), parseInt(medie["6"]["mediacl"]), parseInt(medie["7"]["mediacl"])]
        }, {
            name: 'Political rights',
            data: [parseInt(medie["1"]["mediapr"]), parseInt(medie["2"]["mediapr"]), parseInt(medie["3"]["mediapr"]), parseInt(medie["4"]["mediapr"]), parseInt(medie["5"]["mediapr"]), parseInt(medie["6"]["mediapr"]), parseInt(medie["7"]["mediapr"])]
        }],
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}: {point.x}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span><b>{point.y}</b> avg attacks<br/>'
            }
    });
  };

  var medie = {"1":{},"2":{},"3":{},"4":{},"5":{},"6":{},"7":{}};

  function getJSONmedia(){
        var url = "api/mediacl.php";
        $.getJSON(url, function(result){
                    // Gestione chiamata Ajax
                    // creo ogni elemento
                    $.each(result, function(index, item){
                        // Gestione dei dati
                        
                        medie[item["id"]]["mediacl"]  = parseInt(item["mediacl"]);
                        medie[item["id"]]["mediapr"]  = parseInt(item["mediapr"]);
                        
                    });
                    //e.preventDefault();
                    buildLine();
                });
        
        
    };

