$.widget("custom.mapBaseSelector", {
	// default options
	workspace: {
		maxWidth: 0
	},
	currentMap:null,
	symbols:{},
	dataResults: [],
	currentTool: {

	},
	options: {},
	// the constructor
	_create: function () {
		var obj = this;
		//extrae ruta de widget
		//extrae la ruta base
		var _path = obj.options.path.split('/');
			_path.splice(-1,1);
		obj.path = _path.join('/');
		obj.pathVars = obj.options.path.split('?')[1];
		//carga mapas base
		obj.baseMaps = obj.options.settings.config.tree.bases;
		obj.currentMap = Object.keys(obj.baseMaps)[0];
		
		//detecta evento de cambio de tamaño
		$(window).resize(function () {
			obj.onResize();
		});



		this.element
			// add a class for theming
			.addClass("custom-mapBaseSelector").attr('panel',false)
			// prevent double click to select text
			.disableSelection();
		this.id = this.element.attr('id');
		
		this.loadFiles();
	},

	// called when created, and later when changing options
	_refresh: function () {
		var obj = this;
		// trigger a callback/event
		obj.createHTMLStructure();
		obj.createBasePanel();
		obj.onResize();
		setTimeout(function(){
			obj.showMainBtn();	
		},1000);
		
	},

	// events bound via _on are removed automatically
	// revert other modifications here
	_destroy: function () {
		this.element
			.removeClass("custom-mapBaseSelector")
			.enableSelection();
	},

	// _setOptions is called with a hash of all options that are changing
	// always refresh when changing options
	_setOptions: function () {
		// _super and _superApply handle keeping the right this-context
		this._superApply(arguments);
		this._refresh();
	},

	// _setOption is called for each individual option that is changing
	_setOption: function (key, value) {
		// prevent invalid color values
		this._super(key, value);
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
			obj.workspace.maxWidth = Math.floor(w_width / 2);
		} else {
			obj.workspace.maxWidth = w_width;
		}


	},
	showMainBtn:function(){
		var obj = this;
		$('#mapBaseSelector_btn_main').animate({right:10},600);
	},
	hideMainBtn:function(){
		var obj = this;
		$('#mapBaseSelector_btn_main').animate({right:-50},600);
	},
	showContainer:function(){
		var obj = this;
		var container = $('#mapBaseSelector_container');
		//obj.hideMainBtn();
		container.fadeIn().attr('visible','true');
		obj.element.attr('panel',true);
	},
	hideContainer:function(anim){
		var obj = this;
		var container = $('#mapBaseSelector_container');
		
		//var isVisible = ($('#mapBaseSelector_container').attr('visible') == 'true');
		
		
		switch (anim){
				case 'left':
					container.effect('drop','slow',function(){
						obj.showMainBtn();	
					}).attr('visible','false');
				break;
				default:
					container.fadeOut(function(){
						obj.showMainBtn();	
					}).attr('visible','false');
		}
		
		obj.element.attr('panel',false);
		
	},
	createHTMLStructure: function () {
		var obj = this;
		var cadena = '';
		cadena+= '<div id="mapBaseSelector_container" visible="false" class="mapBaseSelector-container"></div>';
		cadena+= '<div id="mapBaseSelector_btn_main" class="mapBaseSelector-btnmain z-depth-2">';
		cadena+= '	<div class="mapBaseSelector-btn-main"></div>';
		cadena+= '	<div class="mapBaseSelector-btn-close"></div>';
		cadena+= '</div>';
		obj.element.html(cadena);
		
		var container = new Hammer(document.getElementById('mapBaseSelector_container'));
		container.on("swipeleft swiperight", function(ev) {
			if(ev.type == 'swipeleft')
				obj.hideContainer('left');
		});
		
		$('#mapBaseSelector_btn_main').click(function(){
			var isVisible = ($('#mapBaseSelector_container').attr('visible') == 'true');
			if(isVisible){
				obj.hideContainer();
			}else{
				obj.showContainer();		 
			}
		});
		
	},
	createBasePanel:function(){
		var obj = this;
		var bases = obj.baseMaps;
		var current = obj.currentMap;
		var cadena = '<div class="row">';
		var map = obj.options.settings.map;
		
		for(var x in bases){
			var item = bases[x];
			var selected = (x == current)?'selected':'';
			cadena+= '<div class="col s12 l6">';
			cadena+= '	<div class="mapBaseSelector-map-option-container z-depth-1">';
			cadena+= '		<div class="mapBaseSelector-map-option-text">';
			cadena+= '			<span class="mapBaseSelector-map-name">'+item.label+'</span>';
			cadena+= '			<span class="mapBaseSelector-map-copyrights">'+item.rights+'</span>';
			cadena+= '		</div>';
			cadena+= '		<div idref="'+x+'" class="'+selected+' mapBaseSelector-map-option" style="background-image:url(\'img/basemaps/'+item.img+'\')">';
			//cadena+= '			<img src="img/basemaps/'+item.img+'" class="mapBaseSelector-map-image" />';
			cadena+= '		</div>';
			cadena+= '	</div>';
			cadena+= '</div>';
		}
		cadena+= '</div>';
		$('#mapBaseSelector_container').html(cadena);
		$('.mapBaseSelector-map-option').each(function(){
			$(this).click(function(){
				var id = $(this).attr('idref');
				map.base.set(id);
				$('#mapBaseSelector_btn_main').click();
			});
		});
		
	},
	bottomMargin:function(margin){
		var obj = this;
		$('#mapBaseSelector_btn_main').animate({bottom:margin+'px'},500);
	},
	//custom functions
	text:function(text){
		var obj = this;
		var text = obj.language[text.toUpperCase()];
		if(!text)text = obj.language['NOT_LANGUAGE'];
		return text;
	},
	//Logica del Widget
	loadFiles: function () {
		var obj = this;
		var path = obj.path;
		var region = obj.options.region;
		
		$.when(
			$('<link>', {rel: 'stylesheet',type: 'text/css',href: obj.path+'/jquery.ui.mapBaseSelector.css'}).appendTo('head'), //hoja de estilo de widget
			//$.getScript( path+'/symbols/symbols.js' ), //simbologia de busquedas
			$.getScript( path+'/language/'+region+'.js' ), //simbologia de busquedas
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        ).done(function(){
			//levanta tabla de simbolos
			//obj.symbols = mapBaseSelector_symbols;
			obj.language = mapBaseSelector_lang;
			obj._refresh();
		});
		
		
	},
	textAsID:function(text){
                    text = text.toLowerCase();
                    text = text.replace(/[\u00E1]/gi,'a');
                    text = text.replace(/[\u00E9]/gi,'e');
                    text = text.replace(/[\u00ED]/gi,'i');
                    text = text.replace(/[\u00F3]/gi,'o');
                    text = text.replace(/[\u00FA]/gi,'u');
                    text = text.replace(/[\u00F1]/gi,'n');
                    
                    text = text.replace(/&aacute;/g, 'a');
                    text = text.replace(/&eacute;/g, 'e');
                    text = text.replace(/&iacute;/g, 'i');
                    text = text.replace(/&oacute;/g, 'o');
                    text = text.replace(/&uacute;/g, 'u');
                    text = text.replace(/&ntilde;/g, 'n');
                    
                    text = text.replace(/\s/g, '');
					text = text.replace(/:/g, '');
                    return text;
    }
});