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
     			
     			ligne = '<li><a href="'+book.url+'">'; //javascript:app.book('+book.id+')
     			if(book.image!='') ligne+= '<img src="'+book.image+'" />';
     			ligne += '<h2>'+book.titre+' <span style="font-weight: normal">de '+book.author.prenom+' '+book.author.nom+'</span></h2>';
				ligne += '<p>'+book.resume+'</p></a></li>';
     			
     			$('#liste-livres').append(ligne);
     			
     		}
     		
     		$('#liste-livres').listview('refresh');
     		
     	}) ; 
    	    
    }

	,book : function(id) {
		$.ajax({
     		url:INTERFACE
     		,data: {
     			get:'book'
     			,id: id
     			,jsonp:1
     		}
     		,dataType: "jsonp"
     	}).done(function(book) {
			
			$('#book-title').html(book.titre);
			$('#book-author').html(book.author.prenom+' '+book.author.nom);
			$('#book-author').attr('href', book.author.url);  
			
			$('#book-reference').html(book.reference);
			
			
			//$('[data-role=button]').button('refresh');
			     		
     		$.mobile.navigate('#book');
     		
     	}) ; 
		
	}
	,page:function (page) {
		$.mobile.navigate('#'+page);
	}
	,camera:function() {
		
		navigator.camera.getPicture(onSuccessCAM, onFailCAM, { quality: 50,
		    destinationType: Camera.DestinationType.DATA_URL
		 }); 
	}
    
};
function onSuccessCAM(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
    
    $(document).append(image);
    
}

function onFailCAM(message) {
    alert('Failed because: ' + message);
}


$(document).on('pageinit',function(){
	app.initialize();
});