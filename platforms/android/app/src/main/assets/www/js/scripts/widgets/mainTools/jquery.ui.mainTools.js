$.widget("custom.mainTools", {
	// default options
	workspace: {
		maxWidth: 0
	},
	currentMap:null,
	tools:[
		{id:'layers',sprite:'sprite-mainTools-capas',label:'Capas de información'},
		{id:'measure',sprite:'sprite-mainTools-medir',label:'Medición'},
		{id:'measure',sprite:'sprite-mainTools-medir',label:'otras'}
	],
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
		//detecta evento de cambio de tamaño
		$(window).resize(function () {
			obj.onResize();
		});

		this.element
			// add a class for theming
			.addClass("custom-mainTools").attr('panel',false)
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
		obj.onResize();
		
	},

	// events bound via _on are removed automatically
	// revert other modifications here
	_destroy: function () {
		this.element
			.removeClass("custom-mainTools")
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
	createHTMLStructure: function () {
		var obj = this;
		var tools = obj.tools;
		var cadena = '';
		cadena+= '<div id="mainTools_header" class="mainTools-header"></div>';
		cadena+= '<div id="mainTools_container" class="mainTools-container container">';
		cadena+= '</div>';
		cadena+= '<div id="mainTools_close" class="mainTools-close z-depth-1"><div class="sprite-mainTools-close"></div></div>';
		
		obj.element.html(cadena);
		
		cadena = '<div class="row">';
		cadena+= '	<div class="col s12"><center><div class="sprite-mainTools-logo"></center></div>';
		cadena+= '	<div class="col s12"><center><h5 class="mainTools-label">Herramientas</h5></center></div>';
		for(var x in tools){
			var item = tools[x];
			cadena+= '<div class="col s6 m4">';
			cadena+= '	<div class="mainTools-tool-item valign-wrapper z-depth-1">';
			cadena+= '		<div class="mainTools-tool-image '+item.sprite+'"></div><br>';
			cadena+= '		<div class="mainTools-tool-label">'+item.label+'</div>';
			cadena+= '	</div>';
			cadena+= '</div>';
		}
		cadena+= '</div>';
		
		
		$('#mainTools_container').html(cadena);
		
		var container = new Hammer(document.getElementById('mainTools_container'));
		container.on("swipeleft swiperight", function(ev) {
			if(ev.type == 'swipeleft')
				obj.hideContainer('left');
		});
		
		$('#mainTools_btn_main').click(function(){
			var isVisible = ($('#mainTools_container').attr('visible') == 'true');
			if(isVisible){
				obj.hideContainer();
			}else{
				obj.showContainer();		 
			}
		});
		
		$('#mainTools_close').click(function(){
			obj.hide();
		});
	},
	show:function(){
		var obj = this;
		obj.element.fadeIn();
	},
	hide:function(){
		var obj = this;
		obj.element.fadeOut();
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
			$('<link>', {rel: 'stylesheet',type: 'text/css',href: obj.path+'/jquery.ui.mainTools.css'}).appendTo('head'), //hoja de estilo de widget
			//$.getScript( path+'/symbols/symbols.js' ), //simbologia de busquedas
			$.getScript( path+'/language/'+region+'.js' ), //simbologia de busquedas
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        ).done(function(){
			//levanta tabla de simbolos
			//obj.symbols = mainTools_symbols;
			obj.language = mainTools_lang;
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