requirejs.config({
    paths: {
        mapping:'scripts/modules/mapping/mapping',
        mappingTree:'scripts/modules/mapping/tree',
        mappingFetures:'scripts/modules/mapping/features',
        mappingMarkers:'scripts/modules/mapping/markers',
		cards:'scripts/modules/cards/cards'
    },
    waitSeconds: 0,
    shim: {
        mapping: {
            deps:['mappingTree']
        }
    }
    
});
define(["mapping"],function(mapping){
	
		$.when(
            $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/scripts/modules/cards/cards.css'}).appendTo('head'),
            $.Deferred(function( deferred ){
			$( deferred.resolve );
		    })
		).done(function(){
	    });
    
});
