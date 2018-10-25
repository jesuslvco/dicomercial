$.widget("custom.baseWidget", {
  // default options
  options: {

  },

  // The constructor
  _create: function () {
    var obj = this;
    obj.id = obj.element.attr('id');

    this.element
      // add a class for theming
      .addClass("custom-baseWidget");

    var _path = obj.options.path.split('/');
    _path.splice(-1, 1);
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
  //Logica del Widget
  loadFiles: function () {
    var obj = this;
    var path = obj.path;
    var region = obj.options.region;

    $.when(
      $('<link>', { rel: 'stylesheet', type: 'text/css', href: obj.path + '/jquery.ui.layerManager.css' }).appendTo('head'), //hoja de estilo de widget
      //$.getScript( path+'/symbols/symbols.js' ), //simbologia de busquedas
      $.getScript(path + '/language/' + region + '.js'), //simbologia de busquedas
      $.Deferred(function (deferred) {
        $(deferred.resolve);
      })
    ).done(function () {
      //levanta tabla de simbolos
      //obj.symbols = layerManager_symbols;
      obj.language = layerManager_lang;
      obj._refresh();
    });
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
      .removeClass("custom-baseWidget")
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

