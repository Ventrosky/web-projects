function Programma () {

	this.genere;
	this.tipo;
	this.nome;
	this.descrizione;
	this.sito;
	this.immagine;

	this.inizializza = 
		function(prog) {
			this.genere = prog.genere;
			this.tipo = prog.tipo;
			this.nome = prog.nome;
			this.descrizione = prog.desc;
			this.sito = prog.sito;
			this.immagine = prog.immg;
		}

	this.generaHTML = 
		function () {
			var offset = 60;
			var logoX = ((this.immagine - 1) *  offset) + 1;
			var progHTML = '<div class="freedom"><div class="software_img" style="background-position: -'+ logoX +'px 0px;"></div><div class="free_content"><h3><a href=' + this.sito + ' target="_blank">'+ this.nome + '</a></h3><p>' + this.descrizione + '</p></div></div>';
			return progHTML;
		}
}

function Programmi () {
	this.lista = [];

	this.inizializza = 
		function (elems) {
			for (var i = 0; i < elems.length; i++) {
				var programma = new Programma ();
				programma.inizializza(elems[i]);
				this.lista.push(programma);
			};
		}

	this.creaSelectGenere = 
		function (){
			var generi = {};
			for (var i = 0; i < this.lista.length; i++){
				generi[this.lista[i].genere] = true;
			}
			var selectHTML = "<option value='null'>Genere</option>";
			for (var i in generi) {
				selectHTML += '<option value="' + i + '">' + i + '</option>';
			}
			return selectHTML;
		}

	this.creaSelectTipo = 
		function (genere) {
			var tipi = {};
			for (var i = 0; i < this.lista.length; i++) {
				if (this.lista[i].genere == genere){ 
					tipi[this.lista[i].tipo] = true;
				}
			}
			var selectHTML = "<option value='null'>Tipo</option>";
			for (var i in tipi) {
				selectHTML += '<option value="' + i + '">' + i + '</option>';
			}
			return selectHTML;
		}
	
	this.cercaTipo = 
		function (tipo, genere) {
			var progs = [];
			for (var i = 0; i < this.lista.length; i++) {
				if (this.lista[i].genere == genere && this.lista[i].tipo == tipo) {
					progs.push(this.lista[i]);
				}
			}
			return progs;
		}
}

function gestoreGenere (genere) {
	try {
		var nodoSelGenere = document.getElementById("selGenere");
		var nodoSelTipo = document.getElementById("selTipo");
		var nodoRisultati = document.getElementById("fldResults");	
		var genere = nodoSelGenere.value;

		nodoSelTipo.innerHTML = lstSoftware.creaSelectTipo(genere);
		nodoRisultati.innerHTML = '<div id="empty">Per visualizzare i risultati seleziona <strong>genere</strong> e <strong>tipo</strong>.</div>';
	} catch ( e ) {
		var nodoW = document.getElementById("fldWarning");
		nodoW.innerHTML = '<div id="empty">Si è verificato un errore imprevisto (<strong>'+ e + '</strong>).</div>';
	}

}

function gestoreTipo (genere, tipo) {
	try {
		var nodoSelGenere = document.getElementById("selGenere");
		var nodoSelTipo = document.getElementById("selTipo");
		var nodoRisultati = document.getElementById("fldResults");
		var genere = nodoSelGenere.value;
		var tipo = nodoSelTipo.value;
		var progs = lstSoftware.cercaTipo(tipo, genere);

		if (progs.length > 0) {
			var progsHTML = "";
			for (var i = 0; i < progs.length; i++) {
				progsHTML += progs[i].generaHTML();
			}
			nodoRisultati.innerHTML = progsHTML;
		} else {
			nodoRisultati.innerHTML = '<div id="empty">Per visualizzare i risultati seleziona <strong>genere</strong> e <strong>tipo</strong>.</div>';
		}
	} catch ( e ) {
		var nodoW = document.getElementById("fldWarning");
		nodoW.innerHTML = '<div id="empty">Si è verificato un errore imprevisto (<strong>'+ e + '</strong>).</div>';
	}
}

var lstSoftware;

function inizializza () {
	try {
		var nodoSelGenere = document.getElementById("selGenere");
		var nodoSelTipo = document.getElementById("selTipo");

		lstSoftware = new Programmi ();
		lstSoftware.inizializza(dataSoftware);

		nodoSelGenere.innerHTML = lstSoftware.creaSelectGenere();
		nodoSelGenere.onchange = gestoreGenere;
		
		nodoSelTipo.innerHTML = lstSoftware.creaSelectTipo();
		nodoSelTipo.onchange = gestoreTipo;
	} catch ( e ) {
		var nodoW = document.getElementById("fldWarning");
		nodoW.innerHTML = '<div id="empty">Si è verificato un errore imprevisto (<strong>'+ e + '</strong>).</div>';
	}
}

window.onload = inizializza;

var dataSoftware = [
	{ genere : "Programma",
		tipo : "Multimedia",
		nome : "Amarok",
		desc : "Ascolta CD, musica, radio streaming e podcast",
		sito : "https://amarok.kde.org/",
		immg : 1
	},
	{ genere : "Programma",
		tipo : "Multimedia",
		nome : "VLC",
		desc : "Guarda DVD, video da YouTube ed altri download",
		sito : "http://www.videolan.org/",
		immg : 2
	},
	{ genere : "Programma",
		tipo : "Office e Database",
		nome : "LibreOffice",
		desc : "Editor di testi, spreadsheets e presentazioni",
		sito : "http://www.libreoffice.org/",
		immg : 3
	},
	{ genere : "Programma",
		tipo : "Office e Database",
		nome : "OpenOffice",
		desc : "Editor di testi, spreadsheets e presentazioni",
		sito : "http://www.openoffice.org/",
		immg : 4
	},
	{ genere : "Programma",
		tipo : "Office e Database",
		nome : "MySQL",
		desc : "Database completo che funziona con OpenOffice",
		sito : "https://www.mysql.it/",
		immg : 5
	},
	{ genere : "Programma",
		tipo : "Web e Mail",
		nome : "Drupal",
		desc : "Fai girare il tuo sito con style",
		sito : "https://www.drupal.org/",
		immg : 6
	},
	{ genere : "Programma",
		tipo : "Web e Mail",
		nome : "Chromium",
		desc : "Browser web libero dal quale Google Chrome trae il suo sorgente. ",
		sito : "https://www.chromium.org/",
		immg : 7
	},
	{ genere : "Programma",
		tipo : "Web e Mail",
		nome : "GNU IceCat",
		desc : "Naviga il web ad alta velocita ed in sicurezza",
		sito : "https://www.gnu.org/software/gnuzilla/",
		immg : 8
	},
	{ genere : "Programma",
		tipo : "Web e Mail",
		nome : "Thunderbird",
		desc : "Invia email come un pro!",
		sito : "https://www.mozilla.org/en-US/thunderbird/",
		immg : 9
	},
	{ genere : "Programma",
		tipo : "Graphics",
		nome : "Blender",
		desc : "Realizza animazioni 3d e modifica video",
		sito : "https://www.blender.org/",
		immg : 10
	},
	{ genere : "Programma",
		tipo : "Graphics",
		nome : "GIMP",
		desc : "Ritocca e ritaglia immagini dalla fotocamera digitale e web",
		sito : "http://www.gimp.org/",
		immg : 11
	},
	{ genere : "Programma",
		tipo : "Graphics",
		nome : "Inkscape",
		desc : "Realizza volantini, cartoline ed altri materiali da stampa",
		sito : "https://inkscape.org/en/",
		immg : 12
	},
	{ genere : "Sistema-Operativo",
		tipo : "GNU/Linux",
		nome : "BLAG",
		desc : "BLAG Linux and GNU, distribuzione GNU/Linux basata su Fedora.",
		sito : "http://www.blagblagblag.org/",
		immg : 13
	},
	{ genere : "Sistema-Operativo",
		tipo : "GNU/Linux",
		nome : "Dragora",
		desc : "Distribuzione GNU/Linux indipendente basata sul concetto della semplicità.",
		sito : "http://www.dragora.org",
		immg : 14
	},
	{ genere : "Sistema-Operativo",
		tipo : "GNU/Linux",
		nome : "Dynebolic",
		desc : "Distribuzione GNU/Linux con particolare attenzione per l'editing audio e video.",
		sito : "http://www.dynebolic.org",
		immg : 15
	},
	{ genere : "Sistema-Operativo",
		tipo : "GNU/Linux",
		nome : "Guix System Distribution",
		desc : "Distribuzione avanzata GNU/Linux costruita su GNU Guix. ",
		sito : "http://www.gnu.org/software/guix/",
		immg : 16
	},
	{ genere : "Sistema-Operativo",
		tipo : "GNU/Linux",
		nome : "gNewSense",
		desc : "Distribuzione GNU/Linux basata su Debian, sponsorizzata dalla FSF.",
		sito : "http://www.gnewsense.org/",
		immg : 17
	},
	{ genere : "Sistema-Operativo",
		tipo : "GNU/Linux",
		nome : "Musix",
		desc : "Distribuzione GNU+Linux basata su Knoppix, particolare attenzione per la produzione audio.",
		sito : "https://musixdistro.wordpress.com/",
		immg : 18
	},
	{ genere : "Sistema-Operativo",
		tipo : "GNU/Linux",
		nome : "Parabola",
		desc : "DIstribuzione GNU/Linux basata su Arch che prioritizza la semplice gestione di pacchetti e sistema.",
		sito : "http://www.parabola.nu/",
		immg : 19
	},
	{ genere : "Sistema-Operativo",
		tipo : "GNU/Linux",
		nome : "Trisquel",
		desc : "GNU/Linux basato su Ubuntu orientato per le piccole aziende, uso domestico ed educativo.",
		sito : "https://trisquel.info/",
		immg : 20
	},
	{ genere : "Sistema-Operativo",
		tipo : "GNU/Linux",
		nome : "Ututo XS",
		desc : "GNU/Linux basato su Gentoo. Il primo sistema GNU/Linux complòetamente libero riconosciuto dal GNU Project.",
		sito : "http://www.ututo.org",
		immg : 21
	},
	{ genere : "Sistema-Operativo",
		tipo : "Non GNU",
		nome : "Replicant",
		desc : "Versione libera di Android. Gli sviluppatori di Replicant hanno rimpiazzato molte librerie non libere.",
		sito : "http://www.replicant.us/",
		immg : 22
	},
];