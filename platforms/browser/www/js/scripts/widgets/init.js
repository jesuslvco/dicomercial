//WIDGETS INIT
requirejs.config({
    paths: {
        dinamicPanel:'scripts/widgets/dinamicPanel/jquery.ui.dinamicPanel',
        mapBaseSelector:'scripts/widgets/mapBaseSelector/jquery.ui.mapBaseSelector',
        bottomInfo:'scripts/widgets/bottomInfo/jquery.ui.bottomInfo',
		mainTools:'scripts/widgets/mainTools/jquery.ui.mainTools'
    },
	shim: {
        dinamicPanel:{
            exports:'dinamicPanel'
		},
		mapBaseSelector:{
            exports:'mapBaseSelector'
		},
		bottomInfo:{
            exports:'bottomInfo'
		},
		mainTools:{
            exports:'mainTools'
		}
    },
    waitSeconds: 0
});
define(["router","dinamicPanel","mapBaseSelector","bottomInfo","mainTools","cards"],function(router,dinamicPanel,mapBaseSelector,bottomInfo,mainTools,cards){
	var map = router.map;
	var widgets = {
		init:function(){
			var cadena = '';
			cadena+= '<div id="dinamicPanel"></div>';
			$('#widgets_containers').append(cadena);
			$('#dinamicPanel').dinamicPanel({
				path:require.toUrl("dinamicPanel"),
				dataSource:router.config.connections,
				region:router.language.region,
				cards:cards,
				sendEdoCard:function(title,card){
					var cards = {title:title,list:card}
					$('#bottomInfo').bottomInfo('showMiniCard',cards);
				},
				gotoPoint:function(point){
						var lon = point.lon;
						var lat = point.lat;
						var params = {coords:[lon,lat],zoom:12};
						router.map.goCoords(params);
				},
				markLocation:function(point,item){
						//elimina todas las chinchetas primero
						router.map.markers.event({action:'remove',type:'identify',items:'all'});
						//coordenadas de nueva marka
						var lon = point.lon;
						var lat = point.lat;
						router.map.markers.event({action:'add',type:'identify',items:[{image:'identify',lon:lon,lat:lat,popup:{title:item.title,content:item.content,event:'evento'}}]})
					$('#bottomInfo').bottomInfo('showInformationHalf');
				},
				showTools:function(){
					$('#mainTools').mainTools('show');
				}
			});
			
			//selector de mapa base
			cadena = '<div id="mapBaseSelector"></div>';
			$('#widgets_containers').append(cadena);
			$('#mapBaseSelector').mapBaseSelector({
				path:require.toUrl("mapBaseSelector"),
				settings:router,
				region:router.language.region,
			})
			
			//area de información inferior
			cadena = '<div id="bottomInfo"></div>';
			$('#widgets_containers').append(cadena);
			$('#bottomInfo').bottomInfo({
				path:require.toUrl("bottomInfo"),
				settings:router,
				cards:cards,
				region:router.language.region,
				sendBottomMargin:function(margin){
					$('#mapBaseSelector').mapBaseSelector('bottomMargin',margin);
				}
			})
			
			//area de información inferior
			cadena = '<div id="mainTools"></div>';
			$('#widgets_containers').append(cadena);
			$('#mainTools').mainTools({
				path:require.toUrl("mainTools"),
				settings:router,
				region:router.language.region,
			})
			
			
		}
	}
	
	return widgets;
});
