jQuery(function ($) {
    'use strict';

    (function () {
        $('#preloader').delay(200).fadeOut('slow');
    }());
}); 

window.addEventListener("load", function(){
     		window.cookieconsent.initialise({
     		  "palette": {
     		  "popup": {
     		    "background": "#000"
     		   },
     		  "button": {
     		    "background": "#bd5532"
     		   }
     		  },
     		  "theme": "edgeless",
     		  "content": {
     		  "message": "This website uses cookies intended for statistical purposes."
     		}
     })});

$(document).ready(function() {

	window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-45292459-3');

	$( ".progress-bar" ).each(function( i, obj ) {
    	this.style.width = obj.innerText;
	});
});
