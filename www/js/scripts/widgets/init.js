//WIDGETS INIT
requirejs.config({
    paths: {
        mainUI:'scripts/widgets/mainUI/jquery.ui.mainUI',
		categoryToSlider:'scripts/widgets/categoryToSlider/jquery.ui.categoryToSlider'
    },
	shim: {
        mainUI:{
            exports:'mainUI'
		},
		categoryToSlider:{
			exports:'categoryToSlider'
		}
    },
    waitSeconds: 0
});
define(["router","storedData",  //modulos
		"mainUI","categoryToSlider"],function  //widgets
		(router,storedData, //modulos
		mainUI,categoryToSlider){ //widgets
	
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
