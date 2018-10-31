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
				storedData:storedData,
				homeContent:function(container){
						var cadena = '<div id="homeSlider"></div>';
						container.html(cadena); //inicializa contenido principal
						//activa widgets de inicio
						var sliderCat = storedData.data.slider_category.id;
						$('#homeSlider').categoryToSlider({
							path:require.toUrl("categoryToSlider"),
							storedData:storedData,
							idCat:sliderCat,
							slideToShow:1,
							per_page:5
						});

						var cadena = '<div id="homeRandomPost"></div>';
						container.append(cadena); //inicializa contenido principal
						//activa widgets de inicio
						
						var sliderCat = storedData.data.slider_category.id;
						$('#homeRandomPost').categoryToSlider({
							path:require.toUrl("categoryToSlider"),
							storedData:storedData,
							per_page:9,
							slideToShow:3
						});
				}
			});
		}
	}
	return widgets;
});
