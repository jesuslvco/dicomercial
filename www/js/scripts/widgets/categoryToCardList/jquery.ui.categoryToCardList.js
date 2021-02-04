$.widget("custom.categoryToCardList", {
  //--------Codigo de Widget-------------------------------------------------------------------------------
  page: 1,
  per_page: 15,
  timerRoll: 0,
  // default options
  options: {
    per_page: 20,
    idCat: null,
    per_page:null,
    actions:function(){}
  },
  printMosaic: function () {
      var obj = this;
      var list = obj.options.storedData.data.categories;
      var tc = obj.options.storedData.data.top_category;
      
      var cadena = '';

      cadena = '<div class="row">';
      for(var x in list){
        var cat = list[x];
        var image = cat.acf.image.sizes.large;
        
        var color = (cat.color)?cat.color:'#f0d385';
        cadena+= '<div class="col s12 m6 l4">';
        cadena+= '  <div id="cat_card_item_'+cat.id+'" name="'+cat.name+'" slug="'+cat.slug+'" idref="'+cat.id+'" class="cat-card-item card"';
        cadena+= '   style="background-image:url('+image+')">';
        cadena+= '    <div class="cat-card-color" style="background-color:'+color+'"></div>';
        cadena+= '    <div class="cat-card-item-text">'+cat.name+'</div>';
        cadena+= '  </div>';
        cadena+= '</div>';
      }
      cadena+= '</div>';

      obj.element.html(cadena);
      var height = list.length*55;

      $('.cat-card-item').each(function(){
          $(this).click(function(){
            var id = $(this).attr('idref');
            var name = $(this).attr('name');
            obj.options.onAction({id:id,action:'viewCategory',title:name});
          });
      });
    
  },
  //Logica del Widget---------------------------------------------------------------------------------------
  loadFiles: function () {
    var obj = this;
    var cssFile = obj.widgetFile + '.css';

    $.when(
      $('<link>', { rel: 'stylesheet', type: 'text/css', href: obj.path + '/' + cssFile }).appendTo('head'), //hoja de estilo de widget
      //$.getScript( path+'/symbols/symbols.js' ), //simbologia de busquedas
      $.Deferred(function (deferred) {
        $(deferred.resolve);
      })
    ).done(function () {
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
      .addClass("custom-categoryToCardList");

    var _path = obj.options.path.split('/');
    _path.splice(-1, 1);
    obj.path = _path.join('/');
    obj.pathVars = obj.options.path.split('?')[1];
    obj.widgetFile = obj.options.path.split('/')[obj.options.path.split('/').length - 1].split('?')[0];

    //detecta evento de cambio de tamaño
    $(window).resize(function () {
      obj.onResize();
    });

    this.loadFiles();

    this._trigger("change");
    obj.printMosaic();

    this._refresh();
  },

  // Called when created, and later when changing options
  _refresh: function () {
    var obj = this;
    // Trigger a callback/event
  },


  // Events bound via _on are removed automatically
  // revert other modifications here
  _destroy: function () {
    // remove generated elements
    this.changer.remove();

    this.element
      .removeClass("custom-categoryToCardList")
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

