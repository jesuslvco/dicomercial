$.widget( "custom.layerManager", {
  // default options
  options: {},
  // the constructor
  _create: function() {
	var obj = this;
	obj.layers = obj.options.settings.config.tree.overlays;
	  
	this.element
	  // add a class for theming
	  .addClass( "custom-layerManager" )
	  // prevent double click to select text
	  .disableSelection();
	 this.id = this.element.attr('id');
	 
		var _path = obj.options.path.split('/');
		_path.splice(-1,1);
		obj.path = _path.join('/');
		obj.pathVars = obj.options.path.split('?')[1];
		//carga mapas base

		//detecta evento de cambio de tamaño
		$(window).resize(function () {
			obj.onResize();
		});

		this.loadFiles();

	this._refresh();
  },
  onResize: function () {
		var obj = this;
		var pos = obj.element.position();
		var w_width = $(window).width();
		var w_height = $(window).height();
		var orientation = (w_width > w_height) ? 'landscape' : 'portrait';
		var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
		var maxSide = (w_width > w_height) ? w_width : w_height;
		var isTablet = (maxSide >= 960) ? true : false;

		if (orientation == 'landscape' && isTablet) { //es una tableta en horizontal?
			
		//	obj.workspace.maxWidth = Math.floor(w_width / 2);
		} else {
		//	obj.workspace.maxWidth = w_width;
		}
	},
	printLayers:function(){
		var obj = this;
		var groups = obj.options.adminLayers.getAllLayers();
		var cadena = '';
		
		var iconConvert = {
				'point':'grain',
				'area':'view_quilt',
				'line':'show_chart',
				'raster':'terrain',
				'pattern':'texture',
		}
		
		cadena+= '<ul class="collapsible">'; //manejo de grupos 
		for(var x in groups){
			var group = groups[x];
			var layers  = group.layers;
			var glabel =  group.label;
			cadena+= '<li><div class="collapsible-header"><i class="material-icons">layers</i>'+glabel+'</div>'; //encabezado de area plegable
			cadena+= '	<div class="collapsible-body"><span>';  //contenedor de cuerpo plegable
			
			cadena+= '	<ul class="collection">'; //coleccion de layers
			for(var y in layers){
				var id = y;
				var layer = layers[y];
				var icon = iconConvert[layer.type] || 'do_not_disturb' ;
				var hasText = !(layer.texts === undefined);
				
				
				cadena+= '<li class="collection-item layerManager-item-layer">'; //capa listado
				cadena+= '	<div class="layerManager-item-image"><i class="small material-icons">'+icon+'</i></div>';
				cadena+= '	<div class="layerManager-item-text">'+layer.label+'</div>';
				cadena+= '	<div class="layerManager-item-active-container">';
				
				if(hasText){
					var textId = 't'+id;
					var textStatus = layer.texts.active;
					var classActive = (textStatus)?'':'grey darken-1';
				
				cadena+= '		<div class="layerManager-item-active-text-active">';
				cadena+= '			<a id="text_'+id+'" idref="'+id+'" isText="true" class="'+classActive+' layerManager-item-text-button waves-effect waves-light btn-small">T</a>';
				cadena+= '		</div>';
					
				}
				var activeLayer = (layer.active)?'checked="checked"':'';
				
				cadena+= '		<div class="layerManager-item-active-layer-active">';
				cadena+= '			<label>  <input id="layer_'+id+'" idref="'+id+'" type="checkbox" class="filled-in layerManager-item-checkbox" '+activeLayer+' />  <span></span> </label>';
				cadena+= '		</div>';
				cadena+= '	</div>';
				cadena+= '</li>'; //capa listado
			}
			cadena+= '	</ul>'; //cierre coleccion de layers
			
			cadena+= '</span></div></li>'; //cierre area colapsable
		}
		cadena+= '</ul>';//manejo de grupos 
		
		$('#layerManager_layer_list').html(cadena);
		$('.collapsible').collapsible();
		
		$('.layerManager-item-text-button').each(function(){
			$(this).click(function(){
				var idLayer = $(this).attr('idref');
				var active = ($(this).hasClass('grey darken-1'));
				if(active){
					$(this).removeClass('grey').removeClass('darken-1');
				}else{
					$(this).addClass('grey darken-1');
				}
				
				obj.options.adminLayers.setActive(idLayer,active,true); //idLayer,status,isText
			});
		});
		
		$('.layerManager-item-checkbox').each(function(){
			$(this).click(function(){
				var active = $(this).is(":checked");
				
				var idLayer = $(this).attr('idref');
				obj.options.adminLayers.setActive(idLayer,active,false); //idLayer,status,isText
			});
		});
	},
	createHTMLStructure:function() {
		var obj = this;
		var cadena = '';
		var enablePan = true;
		cadena+= '<div id="layerManager_container_header" class="layerManager-container-header card">';
		cadena+= '	<div class="layerManager-container-header-button"><a id="'+obj.id+'_close_btn" class="waves-effect waves-light btn-small btn-back"><i class="material-icons left">navigate_before</i>Regresar</a></div>';
		cadena+= '  <div class="layerManager-container-header-text"><div class="right header-title right">Capas de Información</div></div>';
		cadena+= '<div></div>';
		cadena+= '</div>';
		cadena+= '<div id="layerManager_container_content" class="layerManager-container-content">';
		cadena+= '	<div id="layerManager_container" visible="false" class="layerManager-container container"><div id="layerManager_layer_list" class="layerManager-layer-list row"></div></div>';
		cadena+= '</div>';
		obj.element.html(cadena);
		obj.printLayers();
		
		
		$('#'+obj.id+'_close_btn').click(function(){
			obj.element.effect( 'drop', 500);
		});
		
	},
	//Logica del Widget
	loadFiles: function () {
		var obj = this;
		var path = obj.path;
		var region = obj.options.region;
		
		$.when(
			$('<link>', {rel: 'stylesheet',type: 'text/css',href: obj.path+'/jquery.ui.layerManager.css'}).appendTo('head'), //hoja de estilo de widget
			//$.getScript( path+'/symbols/symbols.js' ), //simbologia de busquedas
			$.getScript( path+'/language/'+region+'.js' ), //simbologia de busquedas
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        ).done(function(){
			//levanta tabla de simbolos
			//obj.symbols = layerManager_symbols;
			obj.language = layerManager_lang;
			obj._refresh();
		});
	},

  // called when created, and later when changing options
  _refresh: function() {
	 var obj = this;
	// trigger a callback/event
	obj.createHTMLStructure();
	//obj.updatePosition();
	obj.onResize();
  },

  // events bound via _on are removed automatically
  // revert other modifications here
  _destroy: function() {
	this.element
	  .removeClass( "custom-layerManager" )
	  .enableSelection();
  },

  // _setOptions is called with a hash of all options that are changing
  // always refresh when changing options
  _setOptions: function() {
	// _super and _superApply handle keeping the right this-context
	this._superApply( arguments );
	this._refresh();
  },

  // _setOption is called for each individual option that is changing
  _setOption: function( key, value ) {
	// prevent invalid color values
	this._super( key, value );
  }
});