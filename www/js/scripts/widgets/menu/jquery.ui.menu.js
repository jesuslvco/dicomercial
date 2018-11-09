$.widget("custom.menu", {
  //--------Codigo de Widget-------------------------------------------------------------------------------
  createHtml:function(){
    var obj = this;
    var cat = obj.options.storedData.data.system;
    var id = cat.id;
    var cadena = '';
    obj.loadPost(id,function(data) {
      var list = data.result;
      if(list.length > 0 ){
        var cadena = '';

        cadena+= '<nav> <!-- navbar content here  --> </nav>';
        cadena+= '<ul id="main_menu_container" class="sidenav">';
        cadena+= '  <li><div class="user-view">';
        cadena+= '    <div class="background">';
        cadena+= '      <img src="'+obj.options.image+'">';
        cadena+= '    </div>';
        cadena+= '  </div></li>';

        for(var x in list){
            var item = list[x];
            var id = item.id;
            var title = item.title.rendered;
            var icon = (item.acf.icon && item.acf.icon != '')?'<i class="material-icons">'+item.acf.icon+'</i>':''
            cadena+= '  <li class="main-menu-item" type="post" idref="'+id+'"><a href="#!">'+icon+''+title+'</a></li>';
        }


        //cadena+= '  <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>';
        
        /*cadena+= '  <li><div class="divider"></div></li>';
        cadena+= '  <li><a class="subheader">Subheader</a></li>';
        cadena+= '  <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>';*/

        cadena+= '</ul>';

        obj.element.html(cadena);
        $('#main_menu_container').sidenav();
        
      }
    });
  },
  open:function(){
     var obj = this;
     var instance = M.Sidenav.getInstance($('#main_menu_container'));
     instance.open();
  },
  close:function(){
     var obj = this;
     var instance = M.Sidenav.getInstance($('#main_menu_container'));
     instance.close();
  },
  loadPost: function (idCat,func) {
    var obj = this;
    var page = 1;
    var idCat = idCat;
    var per_page = 20;
    var search = null;

    var service = obj.options.storedData.getPostsFromCategory;
    service(idCat,search,page, per_page, function (data) {
      if ($.isFunction(func)) func(data);
    });
    
  },
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
  _create: function () {
    var obj = this;
    obj.id = obj.element.attr('id');

    this.element
      // add a class for theming
      .addClass("custom-menu");

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
    obj.createHtml();
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
      .removeClass("custom-menu")
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

