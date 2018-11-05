//WIDGETS INIT
requirejs.config({
    paths: {
        mainUI:'scripts/widgets/mainUI/jquery.ui.mainUI',
		categoryToSlider:'scripts/widgets/categoryToSlider/jquery.ui.categoryToSlider',
		view:'scripts/widgets/view/jquery.ui.view',
		categoryList:'scripts/widgets/categoryList/jquery.ui.categoryList',
		viewPost:'scripts/widgets/viewPost/jquery.ui.viewPost',
		homeSelectors:'scripts/widgets/homeSelectors/jquery.ui.homeSelectors',
		spinner:'scripts/widgets/spinner/jquery.ui.spinner'
    },
	shim: {
        mainUI:{
            exports:'mainUI'
		},
		categoryToSlider:{
			exports:'categoryToSlider'
		},
		view:{
			exports:'view'
		},
		categoryList:{
			exports:'categoryList'
		},
		viewPost:{
			exports:'viewPost'
		},
		homeSelectors:{
			exports:'homeSelectors'
		},
		spinner:{
			exports:'spinner'
		}
    },
    waitSeconds: 0
});
define(["router","storedData",  //modulos
		"mainUI","categoryToSlider","view","categoryList","viewPost","spinner","homeSelectors"],function  //widgets
		(router,storedData, //modulos
		mainUI,categoryToSlider,view,categoryList,viewPost,spinner,homeSelectors){ //widgets
	
	var widgets = {
		showSpinner:function(){
			var obj = this;

		},
		hideSpinner:function(){
			var obj = this;

		},
		createView:function(title,func){
			var countView = 0;
			$('.custom-view').each(function(){
				countView++;
			});


			var obj = this;
			var d = new Date();
			var n = d.getMilliseconds();
			var rand = Math.floor((Math.random() * 500) + 1);

			var cadena = '<div id="view_'+rand+'-'+n+'" style="z-index:'+(1000+countView)+'"></div>';
				$('#app').append(cadena); //inicializa contenido principal
				//activa widgets de inicio
				//var sliderCat = storedData.data.slider_category.id;
				$('#view_'+rand+'-'+n).view({
					path:require.toUrl("view"),
					title:title,
					storedData:storedData,
					onContent:function(container){
						func(container);
					}
				});
		},
		viewPost:function(opc){
			var obj = this;
			var title = opc.title;
			var slug = opc.slug;
			obj.createView(title,function(container){
				var cadena = '<div id="viewpost_'+opc.id+'"></div>';
				container.html(cadena); //inicializa contenido principal
				//activa widgets de inicio
				var sliderCat = storedData.data.slider_category.id;
				$('#viewpost_'+opc.id).viewPost({
					path:require.toUrl("viewPost"),
					slug:slug,
					storedData:storedData,
					onAction:function(opc){
						debugger;
					}
				});
			});
		},
		viewCategory:function(opc){
			var obj = this;
			var title = opc.title;
			obj.createView(title,function(container){
				var cadena = '<div id="category_'+opc.id+'"></div>';
				container.html(cadena); //inicializa contenido principal
				//activa widgets de inicio
				var sliderCat = storedData.data.slider_category.id;
				$('#category_'+opc.id+'').categoryList({
					path:require.toUrl("categoryList"),
					storedData:storedData,
					idCat:opc.id,
					search:null,
					onAction:function(opc){
						if(opc.action == 'viewPost'){
							var title = opc.title;
							obj.viewPost(opc);
						}
					}
				});
			});
		},
		search:function(opc){
			var obj = this;
			obj.createView('',function(container){
				var cadena = '<div id="search_view"></div>';
				container.html(cadena); //inicializa contenido principal
				//activa widgets de inicio
				var sliderCat = storedData.data.slider_category.id;
				$('#search_view').categoryList({
					path:require.toUrl("categoryList"),
					storedData:storedData,
					search:opc.text,
					idCat:null,
					onAction:function(opc){
						if(opc.action == 'viewPost'){
							var title = opc.title;
							obj.viewPost(opc);
						}
					}
				});
			});
		},
		init:function(){
			var obj = this;
			var cadena = '';
			cadena+= '<div id="main_ui"></div><div id="main_spinner"></div>';
			$('#main_content').append(cadena);
			//spinner
			$('#main_spinner').spinner({
				path:require.toUrl("spinner"),
				logo:'img/app_logo_300.jpg'
			});
			//UI

			$('#main_ui').mainUI({
				path:require.toUrl("mainUI"),
				storedData:storedData,
				homeContent:function(container){
						var cadena = '<div class="home-logo"><img src="img/app_logo_square.png"></div>';
							cadena+= '<div id="homeSlider"></div>';
						container.html(cadena); //inicializa contenido principal
						//activa widgets de inicio
						var sliderCat = storedData.data.slider_category.id;
						$('#homeSlider').categoryToSlider({
							path:require.toUrl("categoryToSlider"),
							storedData:storedData,
							idCat:sliderCat,
							slideToShow:1,
							per_page:5,
							autoplaySpeed:8000,
							autoplay:true
						});
						/*
						var cadena = '<div id="homeRandomPost"></div>';
						container.append(cadena); //inicializa contenido principal
						//activa widgets de inicio
						
						var sliderCat = storedData.data.slider_category.id;
						$('#homeRandomPost').categoryToSlider({
							path:require.toUrl("categoryToSlider"),
							storedData:storedData,
							per_page:10,
							slideToShow:2,
							autoplaySpeed:15000,
							autoplay:false
						});
						*/
						var cadena = '<div id="homeSelectors"></div>';
						container.append(cadena); //inicializa contenido principal
						//activa widgets de inicio
						$('#homeSelectors').homeSelectors({
							path:require.toUrl("homeSelectors"),
							list:router.config.home_selectors,
							onAction:function(params) {
								if(params.action == 'search'){
									obj.search({text:params.text});
								}
							}
						});
				},
				onAction:function(opc){
					switch(opc.action){
						case 'viewCategory':
							obj.viewCategory(opc);
						break;
						case 'search':
							obj.search({text:opc.value});
						break;
					}
				}
			});
			
		}
	}
	return widgets;
});
