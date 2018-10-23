// JavaScript Document
define(["router"],function(router){
	var ui = {
		init:function(){
			var obj = this;
			obj.createHTMLStructure();	
		},
		createHTMLStructure:function(){
			var obj = this;
			var chain = '<div id="app" class="app">'+
                        '	<div id="map" class="map"></div>'+
						'	<div id="widgets_containers" class="widgets-containers"></div>'+
						'	<div id="header" class="header"></div>'+
                        '	<div id="foot" class="foot"></div>'+
                    	'</div>';
        	$("body").html(chain);
		},
		
	}
	return ui;
});