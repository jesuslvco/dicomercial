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
                        '	<div id="header" class="header"></div>'+
                        '	<div id="main_content" class="main-content"></div>'+
                        '	<div class="footer"></div>'+
                    	'</div>';
        	$("body").append(chain);
		}
	}
	return ui;
});