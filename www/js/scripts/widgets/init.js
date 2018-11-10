//WIDGETS INIT
requirejs.config({
    paths: {
        mainUI:'scripts/widgets/mainUI/jquery.ui.mainUI',
		categoryToSlider:'scripts/widgets/categoryToSlider/jquery.ui.categoryToSlider',
		categoryToMosaic:'scripts/widgets/categoryToMosaic/jquery.ui.categoryToMosaic',
		view:'scripts/widgets/view/jquery.ui.view',
		categoryList:'scripts/widgets/categoryList/jquery.ui.categoryList',
		viewPost:'scripts/widgets/viewPost/jquery.ui.viewPost',
		homeSelectors:'scripts/widgets/homeSelectors/jquery.ui.homeSelectors',
		menu:'scripts/widgets/menu/jquery.ui.menu',
		spinner:'scripts/widgets/spinner/jquery.ui.spinner'
    },
	shim: {
        mainUI:{
            exports:'mainUI'
		},
		categoryToSlider:{
			exports:'categoryToSlider'
		},
		categoryToMosaic:{
			exports:'categoryToMosaic'
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
		menu:{
			exports:'menu'
		},
		spinner:{
			exports:'spinner'
		}
    },
    waitSeconds: 0
});
define(["router","storedData",  //modulos
		"mainUI","categoryToSlider","categoryToMosaic","view","categoryList","viewPost","spinner","homeSelectors","menu"],function  //widgets
		(router,storedData, //modulos
		mainUI,categoryToSlider,categoryToMosaic,view,categoryList,viewPost,spinner,homeSelectors,menu){ //widgets
	
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
						if(opc.action == 'dial'){
							var number = opc.num;
							//llamada
								window.plugins.CallNumber.callNumber(
									function(){ //success

									}, function(){ //error
										 M.toast({html: 'Error al realizar la llamada al número:'+number});
									}, number);
						}
						if(opc.action == 'viewCategory'){
							obj.viewCategory(opc);
						}
						if(opc.action == 'viewPost'){
							obj.viewPost(opc);
						}
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
				logo:'img/logos/0.5x/app_logo_square@0.5x.png'
			});
			//menu
			$('body').append('<div id="main_menu"></div>');
			$('#main_menu').menu({
				path:require.toUrl("menu"),
				storedData:storedData,
				image:'img/logos/300w/app_logo_rectangle_solid300.png',
				onAction:function(opc) {
					if(opc.action == 'viewPost'){
							obj.viewPost(opc);
						}
					}
			});
			//UI

			$('#main_ui').mainUI({
				path:require.toUrl("mainUI"),
				storedData:storedData,
				homeContent:function(container){
						var cadena = '<div id="main_header_logo" class="main-header-logo">';
							cadena+= '	<div class="home-logo center">';
							cadena+= '		<img src="img/logos/300w/app_logo_hor_rectangle.png">';
							cadena+= '	</div>';
							cadena+= '	<i id="btn_menu" class="small material-icons">dehaze</i>';
							cadena+= '</div>';
							cadena+= '<div id="homeSlider"></div>';
						container.html(cadena); //inicializa contenido principal
						$('#btn_menu').click(function() {
							$('#main_menu').menu('open');
						});

						//activa widgets de inicio
						if(storedData.data.slider_category){
							var sliderCat = storedData.data.slider_category.id;
							$('#homeSlider').categoryToSlider({
								path:require.toUrl("categoryToSlider"),
								storedData:storedData,
								idCat:sliderCat,
								slideToShow:1,
								per_page:5,
								autoplaySpeed:8000,
								autoplay:true,
								onAction:function(opc) {
								if(opc.action == 'viewPost'){
										obj.viewPost(opc);
									}
								}
							});
						}
						/*
						var cadena = '<div id="homePremiumPost"></div>';
						container.append(cadena); //inicializa contenido principal
						//activa widgets de inicio
						//activa widgets de inicio
						if(storedData.data.premium){
							var sliderCat = storedData.data.premium.id;
							$('#homePremiumPost').categoryToSlider({
								path:require.toUrl("categoryToSlider"),
								storedData:storedData,
								idCat:sliderCat,
								slideToShow:3,
								per_page:8,
								autoplaySpeed:10000,
								autoplay:true,
								onAction:function(opc) {
								if(opc.action == 'viewPost'){
										obj.viewPost(opc);
									}
								}
							});

						}
						
						var mosaicCat = storedData.data.premium.id;
						$('#homePremiumPost').categoryToMosaic({
							path:require.toUrl("categoryToMosaic"),
							storedData:storedData,
							idCat:mosaicCat,
							per_page:10,
							onAction:function(opc) {
								if(opc.action == 'viewPost'){
									var title = opc.title;
									obj.viewPost(opc);
								}
							}
						});*/
						
						var cadena = '<div id="homeSelectors"></div>';
						container.append(cadena); //inicializa contenido principal
						//activa widgets de inicio
						$('#homeSelectors').homeSelectors({
							path:require.toUrl("homeSelectors"),
							storedData:storedData,
							list:router.config.home_selectors,
							onAction:function(opc) {
								if(opc.action == 'search'){
									obj.search({text:opc.text});
								}
								if(opc.action == 'viewCategory'){
									obj.viewCategory(opc);
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
