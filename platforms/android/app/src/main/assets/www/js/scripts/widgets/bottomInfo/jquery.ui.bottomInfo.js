$.widget("custom.bottomInfo", {
	// default options
	position:0,
	options: {
		cards:null
	},
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
			.addClass("custom-bottomInfo")
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
		obj.updatePosition();

		obj.onResize();
	},

	// events bound via _on are removed automatically
	// revert other modifications here
	_destroy: function () {
		this.element
			.removeClass("custom-bottomInfo")
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
		//	obj.workspace.maxWidth = Math.floor(w_width / 2);
		} else {
		//	obj.workspace.maxWidth = w_width;
		}


	},
	createHTMLStructure:function() {
		var obj = this;
		var cadena = '';
		var enablePan = true;
		cadena+= '<div id="bottomInfo_container" visible="false" class="bottomInfo-container row"></div>';
		cadena+= '	<div id="bottomInfo_top_container"></div>';
		cadena+= '	<div class="bottomInfo-info-container"></div>';
		cadena+= '</div>';
		obj.element.html(cadena);
		var container = new Hammer(document.getElementById('bottomInfo'));
		container.get('pan').set({ direction: Hammer.DIRECTION_ALL });
		
		container.on("panup pandown swipeleft", function(ev) { //detectar pan y determina si es swipe basado en la velocidad
			if(ev.type == 'swipeleft'){
				console.log(ev.type);
			}else{
			if(enablePan && Math.abs(ev.velocity) >= 0.1 && ev.isFinal){
				enablePan = false;
				
				setTimeout(function(){enablePan = true;},100);
				switch(ev.type){
					case 'panup':
							if(obj.position < 3)obj.position++;
							obj.updatePosition();
						break;
					case 'pandown':
							if(obj.position > 0)obj.position--;
							obj.updatePosition();
						break;
				}
			}
			}
		});
	},
	updatePosition:function(){
		var obj = this;
		var pos = obj.position;
		switch(pos){
			case 0:
				obj.hidePanel();
			break;
			case 1:
				obj.showMini();
			break;
			case 2:
				obj.showHalf();
			break;
			case 3:
				obj.showFull();
			break;
		}
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
			$('<link>', {rel: 'stylesheet',type: 'text/css',href: obj.path+'/jquery.ui.bottomInfo.css'}).appendTo('head'), //hoja de estilo de widget
			//$.getScript( path+'/symbols/symbols.js' ), //simbologia de busquedas
			$.getScript( path+'/language/'+region+'.js' ), //simbologia de busquedas
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        ).done(function(){
			//levanta tabla de simbolos
			//obj.symbols = bottomInfo_symbols;
			obj.language = bottomInfo_lang;
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
    },
	//view controls
	hidePanel:function(){
		var obj = this;
		obj.position = 0;
		obj.element.animate({'height':'0px'},500,function(){
			$(this).fadeOut();
		}).css({'top':''}).removeClass('bring-to-front');
		obj.element.attr('sizeHide');
		obj.options.sendBottomMargin(15);
		
	},
	showMini:function(){
		var obj = this;
		obj.position = 1;
		obj.element.show().animate({'height':'51px'},500).css({'top':''}).removeClass('bring-to-front');
		obj.element.attr('sizeMini');
		obj.options.sendBottomMargin(60);
	},
	showHalf:function(){
		var obj = this;
		obj.position = 2;
		obj.element.attr('sizeHalf');
		obj.element.show().animate({'height':'368px'},500).css({'top':''}).removeClass('bring-to-front');
		obj.options.sendBottomMargin(383);
	},
	showFull:function(){
		var obj = this;
		obj.position = 3;
		obj.element.attr('sizeFull');
		obj.element.show().css({'height':'100%',top:'0px'},500).addClass('bring-to-front');
		obj.options.sendBottomMargin(0);
	},
	showMiniCard:function(cards){
		var obj = this;
		var title = cards.title;
		var card = cards.list;
		var _card = null;
		var cadena = '';
		for(var x in card){
			_card = card[x];
			cadena += obj.options.cards.createCard(_card);
		}
		var content = cadena;
		
		var tc = $('#bottomInfo_top_container');
		var c = $('#bottomInfo_container');
		tc.html('<h5>'+title+'</h5>')
		c.html(content);
		obj.showHalf();
	}
});