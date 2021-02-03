$.widget("custom.mainUI", {
  //--------Codigo de Widget------------------------------------------------------------------------------
  createDOM:function(){
    var obj = this;
    var container = obj.element;
    var cadena = '';
    cadena+= '<div id="mainui_top_search" style="display:none" class="mainui-top-search z-depth-1">';
    cadena+= '  <div class="search-container">';
    cadena+= '    <div><i class="small material-icons">search</i></div>';
    cadena+= '    <input id="search_input" type="search" placeholder="Buscar" class="browser-default">';
    cadena+= '    <i id="search_clear" class="small material-icons">close</i></div>';
    cadena+= '  <div>';
    cadena+= '  </div>';
    cadena+= '</div>';
    cadena+= '<div id="mainui_bottom_container" class="mainui-bottom-container">';
    cadena+= '  <div id="mainui_content" class="mainui-content"></div>';
    cadena+= '  <div  id="top_tools" class="top-tools"></div>';
    cadena+= '  <div  id="mainui_left" class="mainui-left">';
    //cadena+= '    <div  id="top_tools" class="top-tools"></div>';
    cadena+= '    <div  id="cat_container" class="cat-container"></div>';
    cadena+= '  </div>';
    cadena+= '</div>';
    container.html(cadena);
    obj.printCategories();
    obj.createHomeContent();

    $('#search_input').on('search', function(){
      this.value = this.value.replace(/[|&;$%@"<>()+,]/g, "");
      if(this.value && this.value != ''){
        obj.options.onAction({action:'search',value:this.value});
        $('#search_input').blur();
      }
   });
   $('#search_clear').click(function(){
      var val = $('#search_input').val();
      if(val == ''){
        obj.hideSearch();
      }else{
        obj.resetSearch();
      }
   });

  },
  resetSearch:function(){
    var obj = this;
    $('#search_input').val('');
  },
  showSearch:function(){
    var obj = this;
    $('#mainui_top_search').slideDown('fast');
    $('#search_input').focus();
  },
  hideSearch:function(){
    var obj = this;
    obj.resetSearch();
    $('#mainui_top_search').slideUp();
    $('#search_input').blur();
  },
  createHomeContent:function(){
    var obj = this;
    var container = $('#mainui_content');
    container.html('');
    obj.options.homeContent(container);
  },
  printCategories:function(){
    var obj = this;
    var list = obj.options.storedData.data.categories;
    var tc = obj.options.storedData.data.top_category;
    /*
    count: 5
description: ""
id: 36
link: "http://www.directoriocomercialdelcentro.com/category/abogados-y-despachos/"
meta: []
name: "Abogados y Despachos"
parent: 0
slug: "abogados-y-despachos"
taxonomy: "category"

*/
    var cadena = '';
    //link a inicio
    cadena+= '<div id="btn_search" class="cat-home-btn"><img  width="50" src="img/icon_search_55.png"></div>';
    $('#top_tools').html(cadena);

    cadena = '';
    for(var x in list){
      var cat = list[x];
      var image = cat.acf.image.sizes.thumbnail;
      cadena+= '<div id="cat_item_'+cat.id+'" name="'+cat.name+'" slug="'+cat.slug+'" idref="'+cat.id+'" class="cat-item"><img  width="50" src="'+image+'"></div>';
    }
    $('#cat_container').html(cadena);
    var height = list.length*55;

    $('#cat_container').animate({scrollTop:height}, 1000, 'swing', function() { 
        $('#cat_container').animate({scrollTop:0}, 1500, 'swing', function() { });
   });

   $('.cat-item').each(function(){
      $(this).click(function(){
        var id = $(this).attr('idref');
        var name = $(this).attr('name');
        obj.options.onAction({id:id,action:'viewCategory',title:name});
      });
   });

   $('#btn_search').click(function(){
      obj.showSearch();
   });
    
  },
  // default options
  options: {
    data:null,
    onAction:function(opc){}
  },
  //Logica del Widget---------------------------------------------------------------------------------------
  loadFiles: function () {
    var obj = this;
    var cssFile = obj.widgetFile+'.css';

    $.when(
      $('<link>', { rel: 'stylesheet', type: 'text/css', href: obj.path + '/'+cssFile }).appendTo('head'), //hoja de estilo de widget
      //$.getScript( path+'/symbols/symbols.js' ), //simbologia de busquedas
      $.Deferred(function (deferred) {
        $(deferred.resolve);
      })
    ).done(function () {
      //levanta tabla de simbolos
      //obj.symbols = layerManager_symbols;
      obj._refresh();
    });
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

  // The constructor
  _create: function () {
    var obj = this;
    obj.id = obj.element.attr('id');

    this.element
      // add a class for theming
      .addClass("custom-mainUI");

    var _path = obj.options.path.split('/');
    _path.splice(-1,1);
    obj.path = _path.join('/');
    obj.pathVars = obj.options.path.split('?')[1];
    obj.widgetFile = obj.options.path.split('/')[obj.options.path.split('/').length-1].split('?')[0];

    //detecta evento de cambio de tamaño
		$(window).resize(function () {
			obj.onResize();
    });
    
    this.loadFiles();
    this.createDOM();
    this._refresh();
  },

  // Called when created, and later when changing options
  _refresh: function () {
    // Trigger a callback/event
    
    this._trigger("change");

  },


  // Events bound via _on are removed automatically
  // revert other modifications here
  _destroy: function () {
    // remove generated elements
    this.changer.remove();

    this.element
      .removeClass("custom-mainUI")
      .enableSelection()
      .css("background-color", "transparent");
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
  }
});

