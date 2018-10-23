$.widget("custom.dinamicPanel", {
	// default options
	position:1, //0 left 1 center 2 right
	workspace: {
		maxWidth: 0
	},
	symbols:{},
	dataResults: [],
	currentTool: {

	},
	options: {
		sendEdoCard:function(data){}
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
		
		//detecta evento de cambio de tamaño
		$(window).resize(function () {
			obj.onResize();
		});



		this.element
			// add a class for theming
			.addClass("custom-dinamicPanel top-position")
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
		obj.setToSearch();
		obj.onResize();
	},

	// events bound via _on are removed automatically
	// revert other modifications here
	_destroy: function () {
		this.element
			.removeClass("custom-dinamicPanel")
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
		
		var resultActive = obj.element.hasClass('capturingtext');
		//ajuste por posicion
		
		
		var position = (resultActive)?1:obj.position; //si hay resultados activos ignora movimiento por arrastre
		switch(position){
			case 0:
				$('#dinamicPanel_input_box').animate({
					'width': 0
				}, 300);
			break;
			case 1: //posicion central, el area de captura se extiende
				$('#dinamicPanel_input_box').animate({
					'width': obj.workspace.maxWidth - 70
				}, 300);
			break;
			case 2:
				$('#dinamicPanel_input_box').animate({
					'width': 0
				}, 300);
			break;
		}
		
		$('#dinamicPanel_result_container').css({
			width: obj.workspace.maxWidth,
			height: w_height,
			left: -10,
			top: -10
		});

		$('#dinamicPanel_modal').css({
			width: w_width,
			height: w_height,
			left: -10,
			top: -10
		});
	},
	createHTMLStructure: function () {
		var obj = this;
		var cadena = '';

		cadena += '<div id="dinamicPanel_modal" class="dinamicPanel-modal"></div>';

		cadena += '<div id="dinamicPanel_result_container" class="dinamicPanel-result-container">';
		cadena += '</div>';

		cadena += '<div id="dinamicPanel_input_box" class="dinamicPanel-input-box z-depth-2">';

		cadena += '	<div id="dinamicPanel_input_box_container" class="dinamicPanel-input-box-container">';
		cadena += '	</div>';

		cadena += '	<div id="dinamicPanel_input_box_btn_container" class="dinamicPanel-input-btn-box-container">';
		cadena += '	</div>';

		cadena += '</div>';

		cadena += '<div id="dinamicPanel_circle_container" class="dinamicPanel-circle-container z-depth-2">';

		//Spinner
		cadena += '	<div id="dinamicPanel_circle_spinner" class="dinamicPanel-circle-spinner">';
		cadena += '		<div class="preloader-wrapper big active">';
		cadena += '			<div class="spinner-layer spinner-blue-only">';
		cadena += '				<div class="circle-clipper left">';
		cadena += '		  			<div class="circle"></div>';
		cadena += '				</div><div class="gap-patch">';
		cadena += '		  			<div class="circle"></div>';
		cadena += '				</div><div class="circle-clipper right">';
		cadena += '		  			<div class="circle"></div>';
		cadena += '				</div>';
		cadena += '			</div>';
		cadena += '		</div>';
		cadena += '	</div>';

		//logo
		cadena += '	<div id="dinamicPanel_circle_img_container" class="dinamicPanel-circle-img-container z-depth-1">';
		cadena += '		<div class="dinamicPanel-circle-img-logo dinamicPanel-sprite-logo-mdm"></div>';
		cadena += '	</div>';
		cadena += '</div>';

		obj.element.html(cadena);
		
		var container = new Hammer(document.getElementById('dinamicPanel'));
		container.on("swipeleft swiperight", function(ev) {
			if(ev.type == 'swipeleft'){
				obj.position = (obj.position > 0)?obj.position-1:0;
				obj.onResize();
			}
			if(ev.type == 'swiperight'){
				obj.position = (obj.position < 2)?obj.position+1:2;
				obj.onResize();
			}
		});
		
		var container_r = new Hammer(document.getElementById('dinamicPanel_result_container'));
		container.on("swipeleft", function(ev) {
			if($('#dinamicPanel_result_container').html() == '' && ev.type == 'swipeleft' && obj.element.hasClass('capturingtext')){
				obj.hideSearch('anim');
			}
		});
		
	},

	//Show Spinner
	showSpinner: function () {
		var obj = this;
		obj.element.addClass('showSpinner');
	},
	hideSpinner: function () {
		var obj = this;
		obj.element.removeClass('showSpinner');
	},
	getModeParams: function () {

	},
	//set modes
	hideSearch:function(anim){
		var obj = this;	
		if(anim){
			$('#dinamicPanel_input_search').val('').blur();
			$('#dinamicPanel_result_container').effect('drop','slow',function(){
				obj.element.removeClass('capturingtext');
				$('#dinamicPanel_result_container').css({left:'-10px',top:'-10px',display:'',opacity:1});
			});
		}else{
			obj.element.removeClass('capturingtext');
			$('#dinamicPanel_input_search').val('');
		}
		//obj.element.removeClass('capturingtext modalpanel');
		
	},
	//Search Mode -----------------------------------------------------------------------------------------------	
	setToSearch: function () {
		var obj = this;
		var timerSearch = null;
		
		var modeParams = obj.getModeParams('search');

		var toolContainer = $('#dinamicPanel_input_box_btn_container');
		var tool = '<div id="dinamicPanel_btn_options" class="dinamicPanel-sprite-btn-option"></div>';
		tool += '<div id="dinamicPanel_btn_clear" class="dinamicPanel-sprite-btn-close"></div>';
		toolContainer.html(tool);
		
		$('#dinamicPanel_btn_options').click(function(){
			obj.options.showTools();
		});
		

		var boxContainer = $('#dinamicPanel_input_box_container');
		var input = '<input type="text" placeholder="'+obj.text('search')+'" id="dinamicPanel_input_search" class="dinamicPanel-input-search browser-default">';
		boxContainer.html(input);


		$('#dinamicPanel_input_search').focus(function () {
			obj.element.addClass('capturingtext');
			//obj.element.addClass('capturingtext modalpanel');
		});

		$('#dinamicPanel_btn_clear').click(function () {
			obj.hideSearch();
		});


		var id = 'dinamicPanel_input_search';
		var callback = function () {
			var val = $('#' + id).val();
			clearTimeout(timerSearch);
			timerSearch = setTimeout(function(){
				obj.search(val);
			},300);
		}
		var callbackEnter = function () {
				var val = $('#' + id).val();
				obj.search(val);
			}
			//Asigna control de entrada en captura de input
		$('#' + id).bind("keypress", function (evt) {
			var otherresult = 12;
			if (window.event != undefined) {
				otherresult = window.event.keyCode;
			};
			var charCode = (evt.which) ? evt.which : otherresult;
			if (charCode == 13 || charCode == 12) {
				if (charCode == 13) /*$("#"+idClick).click();*/
					if (charCode == 12 && evt.keyCode == 27) { //atrapa esc y limpia
						setTimeout(function () {
							$('#' + id).val('');
						}, 200);
					};
			} else {
				var keyChar = String.fromCharCode(charCode);
				var keyChar2 = keyChar.toLowerCase();
				var re = /[\u0020\u0027\u00B0\u00E0-\u00E6\u00E8-\u00EB\u00EC-\u00EF\u00F2-\u00F6\u00F9-\u00FC\u0061-\u007a\u00f10-9\-\,\.]/;
				var result = re.test(keyChar2);
				result = (charCode == 8) ? true : result;
				if (result) {
					 if ($.isFunction(callback))callback();
				};
				return result;

			};
		}).keyup(function (e) {
			//   if ($.isFunction(callback))callback($('#'+id).val());
			/*if (e.which == 13)
				if ($.isFunction(callbackEnter)) {
					callbackEnter();
				}*/
		});/*.change(function () {
			//if ($.isFunction(callback)) callback($('#' + id).val());
		});*/
	},
	search: function (text,catopc) {
		var obj = this;
		var ds = $.extend(true, {}, obj.options.dataSource.searches.mainSearch);
		var cats_list = catopc;
		if(cats_list){//es el filtrado por categoria
			ds.params.category = cats_list.category;
			ds.url+= '/entidades';
		}
		
		var results = obj.dataResults;
		ds.params.q = text;

		var params = {};
		obj.getData(ds, params, function (data) {
			data.text = text;
			var cats = data.categories;
			
			var n_cats = [];
			if(!cats_list){
				for(var x in cats){
					n_cats.push({id:obj.textAsID(x),label:x,value:cats[x]});
				}
			}else{
				n_cats = cats_list.list;
			}
			cats = n_cats;
			//cats = (cat)?cat.categories:data.categories;
			data.categories = cats;

			if (results.length >= 10) //almacena los ultimos 10 resultados
				results.shift;

			results.push(data);
			obj.printSearch(data);
		});
	},
	getResultValue:function(id){
		var obj = this;
		var r = null;
		var results = obj.dataResults;
		if(results && results.length > 0){
			var list = results[results.length-1].results; //obtiene los ultimos resultados
			for(var x in list){
				if(list[x].id == id){
					r = list[x];
					break;
				}
			}
		}
		return r;
		
	},
	printSearch: function (data) {
		var obj = this;
		
		var service = data.service;
		var text = data.text;
		var list = data.results;
		var cats = data.categories;
		
		//convertcats
		var results = $('#'+obj.id+'_result_container');
		
		var cadena = ' <div class="row">';
    	cadena+= '			<div class="col s12">';
      	cadena+= '				<ul class="tabs">';
        cadena+= '					<li id="tab_results" class="tab col s3"><a class="active" href="#dp_results">'+obj.text('results')+'</a></li>';
		cadena+= '      			<li id="tab_categories" class="tab col s3"><a href="#dp_results_others">'+obj.text('other_results')+'</a></li>';
		cadena+= '  			</ul>';
		cadena+= '  		</div>';
		cadena+= '      	<div id="dp_results" class="col s12 dp-search-result">Cargando...</div>';
		cadena+= '      	<div id="dp_results_others" class="col s12 dp-search-result">categorias</div>';
		cadena+= '    </div>';
		results.html(cadena);
		
		$('.tabs').tabs();  //asigna comportamiento de tabs
		
		var container_r = new Hammer(document.getElementById('dp_results'));
		container_r.on("swiperight swipeleft", function(ev) {
			if(obj.element.hasClass('capturingtext')){
				switch(ev.type){
					case 'swipeleft':
						$('#tab_categories a').click();
						break;
					case 'swiperight':
							obj.hideSearch('anim');
						break;
				}
			}
			
		});
		var container_rc = new Hammer(document.getElementById('dp_results_others'));
		container_rc.on("swiperight swipeleft", function(ev) {
			if(obj.element.hasClass('capturingtext')){
				switch(ev.type){
					case 'swipeleft':
						obj.hideSearch('anim');
						break;
					case 'swiperight':
						$('#tab_results a').click();
						break;
				}
			}
			
		});
		
		cadena= '<ul class="collection">';
		
		//impresion de resultados
		for(var x in list){
			var item = list[x];
			var table = item.tabla;
			var id = item.id;
			var image = obj.path+'/'+obj.symbols.getImage(obj.textAsID(item.tipo))+'?'+obj.pathVars; //obtiene la imagen correspondiente a el rasgo
			cadena+= '	<li idref="'+item.id+'" class="collection-item avatar  dinamicPanel-result-item">';
			cadena+= '		<img src="'+image+'" alt="" class="circle">';
			cadena+= '		<span class="title">'+item.nombre+'</span>';
			cadena+= '		<p>'+item.tipo+'<br>';
			//cadena+= '  		Second Line';
			cadena+= '		</p>';
			cadena+= '		<a href="#!" class="secondary-content"><i class="material-icons">info</i></a>';
			cadena+= '	</li>';
		}
    	cadena+= '	</ul>';
		$('#dp_results').html(cadena);
		//impresion de otros resultados
		list = cats;
		cadena = '	<div class="collection">';
		for(var x in list){
			var item = list[x];
			cadena+= '		<a idref="'+item.id+'" text="'+item.label+'" href="#!" class="collection-item dinamicPanel-otheresult-item"><span class="badge">'+item.value+'</span>'+item.label+'</a>';
		}
    	cadena+= '	</div>';
		$('#dp_results_others').html(cadena);
		
		//var g_res = new Hammer(document.getElementById('#dp_results'));
		/*g_res.on('pan', function(ev) {
			console.log(ev);
		});*/
		
		
		
		$('.dinamicPanel-otheresult-item').each(function(){
			$(this).click(function(){
				var cat = $(this).attr('text');
				obj.search(text,{category:cat,service:service,list:data.categories});
			});
		});
		
		$('.dinamicPanel-result-item').each(function(){
			$(this).click(function(){
				var id = $(this).attr('idref');
				var element = obj.getResultValue(id);
				if(element){
					var coord = element.coord_merc.split(',');
					obj.options.gotoPoint({lon:coord[1],lat:coord[0]});
					obj.hideSearch();
					obj.getEdoInfo(element,function(func){
						obj.options.markLocation({lon:coord[1],lat:coord[0]},{title:element.nombre,content:element.nombre});	
					});
					
				}
			});
		});
		
	},
	//Transaccion de datos
	getEdoInfo:function(element,func){
		var obj = this;
		var ds = $.extend(true, {}, obj.options.dataSource.cards.getEdoCard);
		var cvegeo = element.id;
			cvegeo = (cvegeo.length == 1)?'0'+cvegeo:cvegeo;
		var name = element.nombre;
		var params = {cvegeo:cvegeo};
		obj.getData(ds, params, function (data) {
			var data = data.multicards;
			obj.options.sendEdoCard(name,data);
		});
	},
	getData: function (source, params, callback, error, before, complete) {
		var obj = this;

		//Anexo de parametros que vengan definidos desde fuente de datos
		var s_params = source.params;
		var stringify = source.stringify;

		if (!(s_params === undefined)) {
			for (var x in s_params) { //anexo de la conifuracion del origen de datos
				params[x] = s_params[x];
			};
		}
		if (!(stringify === undefined) && stringify) {
			params = JSON.stringify(params);
		}
		//Estructura basica de peticion
		var dataObject = {
			data: params,
			success: function (json, estatus) {
				if (json.response && json.response.success) {
					callback(json.data, estatus);
				} else {

				}
			},
			beforeSend: function (solicitudAJAX) {
				obj.showSpinner();
				if ($.isFunction(before)) {
					before(params);
				};
			},
			error: function (solicitudAJAX, errorDescripcion, errorExcepcion) {
				if ($.isFunction(error)) {
					error(errorDescripcion, errorExcepcion);
				};
			},
			complete: function (solicitudAJAX, estatus) {
				obj.hideSpinner();
				if ($.isFunction(complete)) {
					complete(solicitudAJAX, estatus);
				};
			}
		};
		//anexo de la conifuracion del origen de datos
		for (var x in source) {
			if (!(/field|name|id|params|stringify/.test(x))) dataObject[x] = source[x];
		};

		jQuery.support.cors = true;
		$.ajax(dataObject);
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
			$('<link>', {rel: 'stylesheet',type: 'text/css',href: obj.path+'/jquery.ui.dinamicPanel.css'}).appendTo('head'), //hoja de estilo de widget
			$.getScript( path+'/symbols/symbols.js' ), //simbologia de busquedas
			$.getScript( path+'/language/'+region+'.js' ), //simbologia de busquedas
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        ).done(function(){
			//levanta tabla de simbolos
			obj.symbols = dinamicPanel_symbols;
			obj.language = dinamicPanel_lang;
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