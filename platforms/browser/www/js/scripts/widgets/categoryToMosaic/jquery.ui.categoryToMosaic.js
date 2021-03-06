$.widget("custom.categoryToMosaic", {
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
    var slideToShow = obj.options.slideToShow;
    obj.loadCategoryData(function (data) {
      var l = data.result;  
      var cadena = '<div class="row">';
        cadena+= '  <div class="container">'
        for(var x in l){
          var item = l[x];
          var image = (item.acf.logo)?item.acf.logo.sizes.medium_large:'img/no-image-square.jpg';
          cadena+= '<div class="categoryToMosaic-item col s6 m3 l2" idref="'+item.id+'" label="'+item.title.rendered+'" slug="'+item.slug+'">';
          cadena+= '  <div class="card">';
          cadena+= '    <div class="card-image">';
          cadena+= '      <img src="'+image+'">';
          cadena+= '    </div>';
          cadena+= '  </div>';
          cadena+= '</div>';
        }
        cadena+=' </div>';
        cadena+='</div>';

        obj.element.html(cadena);

        $('.categoryToMosaic-item').each(function(){
          $(this).click(function(){
            var text = $(this).attr('slug');
            var id = $(this).attr('id');
            var title = $(this).attr('label');
            obj.options.onAction({id:id,action:'viewPost',slug:text,title:title});
          });
        });
    });
  },
  loadCategoryData: function (func) {
    var obj = this;
    var page = obj.page;
    var idCat = obj.options.idCat;
    var per_page = obj.options.per_page;
    var search = null;

    var service = obj.options.storedData.getPostsFromCategory;
    service(idCat,search,page, per_page, function (data) {
      if ($.isFunction(func)) func(data);
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
      .addClass("custom-categoryToMosaic");

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
      .removeClass("custom-categoryToMosaic")
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

