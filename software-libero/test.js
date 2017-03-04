function Questionario () {

  this.domande;
  this.risposte;
  this.numero;
  this.corrente;
  this.corrette;

  this.inizializza = 
    function (domande) {
      this.domande = {};
      this.risposte = {}; 
      this.numero = domande.length; 
      for (var i = 0; i < this.numero; i++){
        this.domande[i] = domande[i].testo;
        this.risposte[i] = domande[i].risposte;      
      }  
      this.corrente = -1;
      this.corrette = 0;
    }

  this.controlloRisp = 
    function (scelta, risps){
      var corretta = risps[risps.length-1];
      if (scelta == corretta) {  
        return true;
      } else {
        return false;
      }
    }

  this.creaDomande = 
    function () {
      return this.domande[this.corrente];
    }
  
  this.creaRisposte = 
    function() {
      var risp = this.risposte[this.corrente];
      var nodiRisps = [];
      for (var i = 0; i < risp.length -1; i++) {
        var nodoOpzioni = document.createElement('div');
        var nodoTesto = document.createTextNode(risp[i]);
        nodoOpzioni.appendChild(nodoTesto);  
        if (this.controlloRisp(i, risp)){
          nodoOpzioni.onclick = gestoreSpuntaVerde;
        } else {
          nodoOpzioni.onclick = gestoreSpuntaRossa;
        }  
        nodiRisps.push(nodoOpzioni);
      }
      return nodiRisps;
    }

  this.prossimaDomanda = 
    function(){
      var sDomanda = "";
      var nodiRisps;
      if (this.corrente < (this.numero - 1)) {
        this.corrente += 1;
        sDomanda = this.creaDomande();
        nodiRisps = this.creaRisposte();
    
      } else {
        sDomanda = 'Puoi trovare maggiori informazioni su <a href="https://www.gnu.org/copyleft/gpl.html" target="_blank">GPL FAQ</a>';
        nodiRisps = [];
      }
      return {quesito: sDomanda, risposte : nodiRisps};
    }

}

function gestoreMostraQuiz (quiz) {
  try {
    var nodoWndQuiz = document.getElementById('wndQuiz');
    var nodoValida = document.getElementById('fldSpunte');
    nodoWndQuiz.style.display = "block";
    test.corrente = -1;
    test.corrette = 0;
    nodoValida.innerHTML = "";    
    gestoreDomanda();
  } catch ( e ) {
    var nodoW = document.getElementById("fldWarning");
    nodoW.innerHTML = '<div id="empty">Si è verificato un errore imprevisto (<strong>'+ e + '</strong>).</div>';
  }  
}

function gestoreXQuiz () {
  try {
    var nodoWndQuiz = document.getElementById('wndQuiz');
    nodoWndQuiz.style.display = "none";
  } catch ( e ) {
    var nodoW = document.getElementById("fldWarning");
    nodoW.innerHTML = '<div id="empty">Si è verificato un errore imprevisto (<strong>'+ e + '</strong>).</div>';
  } 
}

function gestoreChiudiQuiz (event) {
  try {
    var nodoWndQuiz = document.getElementById('wndQuiz');
    if (event.target == nodoWndQuiz) {
            nodoWndQuiz.style.display = "none";
    }
  } catch ( e ) {
    var nodoW = document.getElementById("fldWarning");
    nodoW.innerHTML = '<div id="empty">Si è verificato un errore imprevisto (<strong>'+ e + '</strong>).</div>';
  } 
}

function gestoreSpuntaVerde() {
  try {
    var nodoValida = document.getElementById('fldSpunte');
    nodoValida.innerHTML += '<div class="correct"></div>';
    test.corrette++;
    gestoreDomanda();
  } catch ( e ) {
      var nodoW = document.getElementById("fldWarning");
      nodoW.innerHTML = '<div id="empty">Si è verificato un errore imprevisto (<strong>'+ e + '</strong>).</div>';
  }  
}

function gestoreSpuntaRossa() {
  try {
    var nodoValida = document.getElementById('fldSpunte');
    nodoValida.innerHTML += '<div class="false"></div>';
    gestoreDomanda();
  } catch ( e ) {
    var nodoW = document.getElementById("fldWarning");
    nodoW.innerHTML = '<div id="empty">Si è verificato un errore imprevisto (<strong>'+ e + '</strong>).</div>';
  }  
}

function gestoreDomanda () {
  try {
    var nodoDomande = document.getElementById('fldDomande');
    var nodoRisposte = document.getElementById('fldRisposte');
    var domanda = test.prossimaDomanda();
    nodoRisposte.innerHTML = '';
    if (domanda.risposte.length > 0){
      nodoDomande.innerHTML = domanda.quesito;
      for (var i = 0; i < domanda.risposte.length; i++){
          nodoRisposte.appendChild(domanda.risposte[i]);
      }
    } else {
      nodoDomande.innerHTML = controlloCookie(test.corrette, "puntiQuiz", document.cookie) + domanda.quesito;
      document.cookie = creaCookie("puntiQuiz", test.corrette);
    }  
  } catch ( e ) {
    var nodoW = document.getElementById("fldWarning");
    nodoW.innerHTML = '<div id="empty">Si è verificato un errore imprevisto (<strong>'+ e + '</strong>).</div>';
  } 
}

function creaCookie (nome, valore, scadenza) {
  if (scadenza == undefined || isNaN(scadenza)) {
    return nome + "=" + valore+";";
  } else{
        var data = new Date();
        data.setTime(date.getTime()+(days*24*60*60*1000));
        var scade = "expires="+data.toGMTString();
     }
  return nome + "=" + valore+"; " + scade+";";
}

function estraiCookie (nome, stringa) {
  var coppie = stringa.split(";");
  for(var i = 0; i < coppie.length; i++) {
    var appo = coppie[i].trim();
    if (appo.indexOf(nome) == 0) {
            return appo.substring(nome.length + 1,appo.length);
        }
  }
  return undefined;
}

function controlloCookie(nuovo, nome, stringa){
  var punti = "Giuste " + nuovo + " su " + test.numero + ". ";
  if (test.numero == nuovo) return punti + " Ottimo!<BR>";
  var risultato = estraiCookie(nome, stringa);
  if (risultato != undefined) {
      var vecchio = parseInt(risultato);
      if (nuovo > vecchio) return punti + " Meglio!<BR>";  
  }
  return punti + "<BR>";
}

var test;

var domande = [
       { testo : 'Joan scrive un browser web e rilascia il sorgente sotto GPL sul suo sito. Fred da un CD con i binari del browser di Joan ad un suo amico. Quale dei seguenti non soddisfa l\'obbligo di Fred di rendere il sorgente disponibile:', 
         risposte : ['Mettere il sorgente sul suo sito, inserendo l\'URL nel CD.', 'Dare il sorgente sullo stesso CD dei binari.', 'Proporre di rilasciare il sorgente su CD per una tassa che copra le spese di distribuzione.', 0]},
       
       { testo : 'Fred modifica il browser di Joan e distribuisce i binari sul suo sito. Quale dei seguenti rispetta l\'obbligo di Fred di rilasciare il sorgente del browser modificato?<ul style="list-style-type:none"><li>I.  Distribuire solo il sorgente originale di Joan.</li><li>II.  Distribuire la versione modificata del sorgente insieme ai binari.</li><li>III. Distribuire solo le modifiche marginali del sorgente.</li>', 
         risposte : ['Solamente I e II.', 'Solamente II.' , 'Solamente III.', 1]},
       
       { testo : 'Fred desidera distribuire il browser di Joan collegato ad un modulo di terze parti. Questo modulo ha la seguente licenza: <em>Questo codice può essere modificato, copiato e distribuito, purché non venga imposto alcun costo.</em>  Violerebbe GPL?', 
         risposte : ['Si, GPL richiede che il codice collegato sia anche esso GPL.', 'Si, GPL non permette di aggiungere ulteriori restrizioni.', 'No, perchè il codice non appartiene a Joan.', 1]},
     
       { testo : 'Peter crea una libreria chiamata LibIdo sotto LGPL. FooCorp ne distribuisce una versione modificata collegata con il loro programma proprietario Frobber. Quale dei seguenti non è un obbligo per FooCorp?', 
         risposte : ['FooCorp deve rendere disponibile l\'intero sorgente di LibIdo modificato.', 'FooCorp deve notificare tutte le modifiche su LibIdo.' , 'FooCorp deve rendere disponibile il sorgente di Frobber.', 2]},
       
       { testo : 'FooCorp modifica il browser di Joan includendo una tecnologia che ha patentato. Distribuisce il browser modificato su CD. Ci sono requisiti in GPL su che licenza applicare alla patente?', 
         risposte : ['No.', 'Si, permettere a tutti di utilizzare la tecnologia patentata per qualsiasi scopo.', 'Si, permettere a chi usa codice del browser di usare la tecnologia patentata.', 2]}
     
     ];

function inizializza(){
  try {
    test = new Questionario ();
    test.inizializza(domande);
    var nodoBtnApri = document.getElementById("btnOpen");
    var nodoBtnChiudi = document.getElementById("btnClose");
    nodoBtnApri.onclick = gestoreMostraQuiz;
    nodoBtnChiudi.onclick = gestoreXQuiz;  
    window.onclick = gestoreChiudiQuiz;
  } catch ( e ) {
    var nodoW = document.getElementById("fldWarning");
    nodoW.innerHTML = '<div id="empty">Si è verificato un errore imprevisto (<strong>'+ e + '</strong>).</div>';
  } 
}

window.onload = inizializza;