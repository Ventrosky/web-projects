var testText = `<div>
<h2> Informazioni generali.</h2>
<br>
<h3>1.a) Impresa di assicurazione.</h3>
<p>Helvetia Vita S.p.A. (di seguito Società) - Compagnia Italo Svizzera di Assicurazioni sulla Vita S.p.A., Società appartenente al Gruppo Assicurativo Helvetia.</p>
<h3>1.b) Informazioni sulla situazione patrimoniale della Società</h3>
<br>
<p>Il patrimonio netto della Società, all'ultimo bilancio approvato, è pari ad Euro 169.329.179,52, di cui Euro 47.594.000 costituiscono la parte relativa al capitale sociale ed Euro 52.303.237,16 si riferiscono alle riserve patrimoniali.</p>
<p>In base a quanto previsto dalla Direttiva Solvency II (Direttiva Quadro 2009/138/UE che riporta i principi fondamentali del nuovo regime e Regolamento 215/35/UE che reca previsioni di dettaglio sul nuovo regime e s.m.i.) di seguito si dà evidenza dei nuovi ratio patrimoniali calcolati secondo la Formula Standard in vigore al 31.12.2016.</p>
<br>
<p>Il requisito patrimoniale di solvibilità (SCR - Solvency Capital Requirement) è il capitale necessario per garantire che una compagnia di assicurazione sia in grado di soddisfare tutti gli impegni esistenti e quelli che si presuppone vengano assunti nei 12 mesi successivi, con una probabilità di almeno il 99,5% (livello di confidenza).</p>
<p>Il Solvency Capital Ratio è il risultato in percentuale che si ottiene rapportando i Fondi Propri e l'SCR.</p>
<p>Il requisito patrimoniale minimo (MCR - Minimum Capital Requirement) è il capitale necessario per garantire che una compagnia di assicurazione sia in grado di soddisfare tutti gli impegni esistenti e quelli che si presuppone vengano assunti nei 12 mesi successivi, con una probabilità di almeno l'85% (livello di confidenza).</p>
<p>Il MCR di norma è compreso tra il 25% ed il 45% del SCR. L'autorità interviene quando il capitale di una compagnia di assicurazione scende sotto l'SCR. Non appena il capitale della compagnia si avvicina al MCR, l'intervento dell'autorità si fa più intenso.</p>
<br>
<h3>1.c) Denominazione del contratto.</h3>
<p>Il prodotto è denominato Helvetia Multiattiva Style ─ Premium</p>
<br>
<h3>1.d) Tipologia del contratto.</h3>
<p>Helvetia Multiattiva Style ─ Premium è un piano di risparmio multiramo facente parte delle assicurazioni sulla vita. Al momento della sottoscrizione, il prodotto rende disponibili, all'interno di un unico contratto, sia:  una linea d'investimento di tipo Unit Linked, che consente di investire una componente dei premi in uno dei 4 Fondi Interni messi a disposizione dalla Società - denominati Fondo Conservativo, Fondo Stabilità "ARCA", Fondo Sviluppo e Fondo Opportunità - per costituire il Capitale della Componente Unit-Linked.</p>
<p>Le prestazioni assicurate dal presente contratto, relativamente al Capitale della Componente Unit- Linked, sono espresse in quote del Fondo scelto, il cui valore dipende dalle oscillazioni di prezzo delle attività finanziarie di cui le quote sono rappresentazione. Pertanto, con riferimento al Capitale della Componente Unit-Linked, il contratto comporta rischi finanziari per il Contraente riconducibili all'andamento del valore delle quote; una linea d'investimento di tipo rivalutabile, che consente di investire una componente dei premi nella gestione interna separata denominata Remunera più, per costituire il Capitale della Componente Gestione Separata.</p>
<p>Le prestazioni assicurate dal presente contratto, relativamente al Capitale della Componente Gestione Separata, sono contrattualmente garantite dalla Società in caso di decesso dell'Assicurato o di riscatto richiesto a partire dal 4° anniversario della data di decorrenza (compreso) e si rivalutano annualmente in base al rendimento della gestione interna separata sopra indicata.</p>
<p>Al momento della sottoscrizione il Contraente stabilisce i criteri di destinazione dei premi, secondo i limiti di ripartizione percentuale tra Componenti indicati al punto 4 della Nota informativa. Tali criteri non saranno più modificabili nel corso della durata contrattuale.</p>
<p>Non è consentito combinare tra loro i Fondi Interni, ma può essere scelto un singolo Fondo alla volta.</p>
<br>
<h3>1.e) Durata.</h3>
<p>Il contratto è a vita intera e la sua durata coincide con la vita dell'Assicurato.</p>
<p>Il Contraente può esercitare il diritto di riscatto a condizione che sia trascorso almeno 1 anno dalla data di decorrenza del contratto e l'Assicurato sia in vita.</p>
<br>
<h3>1.f) Pagamento dei premi.</h3>
<p>Il contratto consente il pagamento di un premio unico iniziale e di eventuali premi aggiuntivi.</p>
<p>Il premio iniziale, da versarsi in via anticipata ed in un'unica soluzione all'atto della conclusione del contratto, non può essere inferiore a 5.015,00 Euro o superiore a 500.000,00 Euro su singolo contratto e/o 1.000.000,00 di Euro in capo allo stesso Contraente/Assicurato.</p>
<p>Il Contraente può corrispondere premi aggiuntivi, di importo minimo pari a 1.215,00 Euro, purché siano trascorsi almeno 6 mesi dalla data di decorrenza del contratto ed entro il 4° anniversario della data di decorrenza stessa (compreso). In ogni caso, la Società si riserva in qualsiasi momento di non consentire il versamento di premi aggiuntivi.</p>
<p>Possono essere corrisposti premi (unico ed eventuali versamenti aggiuntivi) fino ad un limite massimo di 500.000,00 Euro per singolo contratto e/o 1.000.000,00 di Euro in capo allo stesso Contraente/Assicurato.</p>
<p>I premi investiti impiegati nella Componente Gestione Separata e per l'acquisto di quote del Fondo Interno della Componente Unit Linked, corrispondono alla somma delle porzioni dei premi versati (unico ed eventuali premi aggiuntivi), al netto delle componenti di costo di cui al punto 9.1.1 della Nota Informativa, in ciascuna delle due Componenti.</p>
</div>`;

var DynamicModal = function (title, body, filename, filetype, buttons) {
    var title = title || "Visualizza Documento";
	var topPad = $('.navbar').width
	var filename = filename || "pdf/MultiattivaStylePremium.pdf";
	var filetype = filetype || "application/pdf";
	var body = body || `<object data="${filename}" type="${filetype}" width="100%" height="100%"><p>Il tuo browser non ha plugin per visualizzare i PDF.<a href="pdf/MultiattivaStylePremium.pdf" download>Clicca qui per scaricare il file.</a></p></object>`;
	var buttons = buttons || [{ Value: "CHIUDI", Css: "btn-primary", Callback: function (event) { DynamicModal.Close(); } }];
	var modalStructure = function () {
        var that = this;
        this.Id = DynamicModal.Id = Math.random();
        var buttonshtml = "";
        for (var i = 0; i < buttons.length; i++) {
            buttonshtml += "<button type='button' class='btn " + 
            (buttons[i].Css||"") + "' name='btn" + this.Id + 
            "'>" + (buttons[i].Value||"CLOSE") + 
            "</button>";
        }
        return "<div class='modal fade dynamiccustommodal' name='dynamiccustommodal' id='" + 
		this.Id + "' tabindex='-1' role='dialog' data-backdrop='static' data-keyboard='false' aria-labelledby='" + 
		this.Id + "Label'><div class='modal-dialog'><div class='modal-content' id='modal-content'><div class='modal-header'><button type='button' class='close modal-white-close' onclick='DynamicModal.Close()'><span aria-hidden='true'>&times;</span></button><h4 class='modal-title'>" + 
		title + "</h4></div><div class='modal-body' id='modal-body'>" + body + 
		"</div><div class='modal-footer bg-default'>" + buttonshtml + 
		"</div><span class='fa fa-arrows pull-left' style='z-index: 90;cursor: move;width: 12px;height: 12px;left: 2px;bottom: 4px;position: absolute;color: #d0d0d0;'></span></div></div></div>";// style=\"height: 70%;\"
}();
    DynamicModal.Delete = function () {
        var modals = document.getElementsByName("dynamiccustommodal");
        if (modals.length > 0) document.body.removeChild(modals[0]);
    };
    DynamicModal.Close = function () {
		$('.modal-backdrop').css('z-index',-1);
        $(document.getElementById(DynamicModal.Id)).modal('hide');
        DynamicModal.Delete();
    };    
    this.Show = function () {
        DynamicModal.Delete();
        document.body.appendChild($(modalStructure)[0]);
        var btns = document.querySelectorAll("button[name='btn" + DynamicModal.Id + "']");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", buttons[i].Callback || DynamicModal.Close);
        }
        $(document.getElementById(DynamicModal.Id)).modal('show');
		$('.modal-backdrop').css('z-index',1050);
		$('.modal').css('z-index',1051);
		$('.modal-dialog').css('margin','40px auto');

		$(".modal-content").on("resize", function(event, ui) {
			var footerOh = $(".modal-footer").outerHeight();
			var modalOh = $(".modal-header").outerHeight();
			$(".modal-body").css("height", ui.size.height - modalOh - footerOh );
		});
		
		var resizeConfig = {
          minHeight: 200,
          minWidth: 300,
		  handles: 'se'
        };
		
		$('.modal-content').resizable(resizeConfig);
		$('.modal-dialog').draggable();
		fixMissingCss();
    };
};

function fixMissingCss(){
	var handle = $('ui-resizable-handle')
	var reszbl = $('.ui-resizable-se')
	var mdbody = $('.modal-body')
	
	handle.css('position', 'absolute');
    handle.css('font-size', '0.1px');
    handle.css('display', 'block');
	reszbl.css('cursor','se-resize');
    reszbl.css('width','12px');
    reszbl.css('height','12px');
    reszbl.css('right','1px');
    reszbl.css('bottom','1px');
	reszbl.addClass('pull-right fa fa-expand fa-rotate-90');
	reszbl.css('position','absolute');
	reszbl.css('color','#d0d0d0');
	mdbody.css('min-height','400px');
    mdbody.css('height','70vh');
    mdbody.css('overflow-y','scroll');
}

new DynamicModal().Show();
//new DynamicModal("Testo di Prova", testText).Show();
