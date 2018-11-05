$.widget("custom.homeSelectors", {
  //--------Codigo de Widget-------------------------------------------------------------------------------
  createHtml:function(){
    var obj = this;
    var list = obj.options.list;
    var hour = (new Date()).getHours();
    var l = [];

    for(var x in list){  //extrae elementos por horario
      var item = list[x];
      var ini = item.from;
      var end = item.to;
      if(ini <= hour && end >= hour){
        l.push(item);
      }
    } 

    var cadena = '<div class="row">';
        cadena+= '  <div class="container">'
        for(var x in l){
          var item = l[x];
          cadena+= '<div class="home-selector-item col s12 m6 l4" text="'+item.words+'">';
          cadena+= '  <div class="card">';
          cadena+= '    <div class="card-image">';
          cadena+= '      <img src="'+item.img+'">';
          cadena+= '      <span class="card-title">'+item.label+'</span>';
          cadena+= '    </div>';
          cadena+= '  </div>';
          cadena+= '</div>';
        }
        cadena+=' </div>';
        cadena+='</div>';

        obj.element.html(cadena);

        $('.home-selector-item').each(function(){
          $(this).click(function(){
            var text = $(this).attr('text');
            obj.options.onAction({action:'search',text:text});
          });
        });

  },
  // default options
  options: {
    list:[]
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
  _create: function () {
    var obj = this;
    obj.id = obj.element.attr('id');

    this.element
      // add a class for theming
      .addClass("custom-homeSelectors");

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
    this.createHtml();
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
      .removeClass("custom-homeSelectors")
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

