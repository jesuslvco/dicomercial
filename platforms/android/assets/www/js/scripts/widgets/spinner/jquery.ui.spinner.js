$.widget("custom.spinner", {
  //--------Codigo de Widget-------------------------------------------------------------------------------
  count:0,
  // default options
  options: {

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
  show:function(){
    var obj = this;
    obj.count++;
    obj.element.css('display','block');
  },
  hide:function(){
    var obj = this;
    obj.count--;
    if(obj.count <= 0){
      obj.count = 0;
      obj.element.css('display','none');
    }
  },
  _create: function () {
    var obj = this;
    obj.id = obj.element.attr('id');

    this.element
      // add a class for theming
      .addClass("custom-spinner").css('display','none');

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

    this._refresh();
    this.createHTML();
  },
  createHTML:function(){
    var obj = this;
    var cadena = '<div class="containerSpinner">';
        cadena+= '   <div class="containerSpinner-base">';
        cadena+= '          <div class="containerSpinner-animation">';
        cadena+= '              <div class="preloader-wrapper big active">';
        cadena+= '                  <div class="spinner-layer spinner-blue-only">';
        cadena+= '                  <div class="circle-clipper left">';
        cadena+= '                      <div class="circle"></div>';
        cadena+= '                  </div><div class="gap-patch">';
        cadena+= '                      <div class="circle"></div>';
        cadena+= '                  </div><div class="circle-clipper right">';
        cadena+= '                      <div class="circle"></div>';
        cadena+= '                  </div>';
        cadena+= '                  </div>';
        cadena+= '              </div>';
        cadena+= '          </div>';
        cadena+= '   </div>';
        cadena+= '</div>';

        obj.element.html(cadena);
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
      .removeClass("custom-spinner")
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

