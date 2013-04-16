var INTERFACE = "http://valence.annueldesprix.com:8001/essential/cap-core/demo/backoffice/scripts/interface.php?";

var app = {

    initialize: function() {
    
     	$.ajax({
     		url:INTERFACE
     		,data: {
     			get:'list-book'
     			,jsonp:1
     		}
     		,dataType: "jsonp"
     	}).done(function(books) {
     		
     		for(i in books) {
     			
     			book = books[i];
     			
     			ligne = '<li><a href="'+book.url+'">';
     			if(book.image!='') ligne+= '<img src="'+book.image+'" />';
     			ligne += '<h2>'+book.titre+' <span style="font-weight: normal">de '+book.author.prenom+' '+book.author.nom+'</span></h2>';
				ligne += '<p>'+book.resume+'</p></a></li>';
     			
     			$('#liste-livres').append(ligne);
     			
     		}
     		
     		$('#liste-livres').listview('refresh');
     		
     	}) ; 
    	    
    }

    
};



$(document).on('pageinit',function(){
	app.initialize();
});