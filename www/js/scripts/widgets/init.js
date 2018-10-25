//WIDGETS INIT
requirejs.config({
    paths: {
        mainUI:'scripts/widgets/mainUI/jquery.ui.mainUI'
    },
	shim: {
        mainUI:{
            exports:'mainUI'
		}
    },
    waitSeconds: 0
});
define(["router","storedData",  //modulos
		"mainUI"],function  //widgets
		(router,storedData, //modulos
		mainUI){ //widgets
	
	var widgets = {
		init:function(){
			var cadena = '';
			cadena+= '<div id="main_ui"></div>';
			$('#main_content').append(cadena);
			$('#main_ui').mainUI({
				path:require.toUrl("mainUI"),
				storedData:storedData
			});
		}
	}
	return widgets;
});
