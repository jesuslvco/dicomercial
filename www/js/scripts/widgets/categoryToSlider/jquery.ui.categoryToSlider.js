$.widget("custom.categoryToSlider", {
  //--------Codigo de Widget-------------------------------------------------------------------------------
  page: 1,
  per_page: 15,
  timerRoll: 0,
  // default options
  options: {
    per_page: 5,
    idCat: null,
    actions:function(){}
  },
  printSlider: function () {
    var obj = this;
    var idCat = obj.options.idCat;

   
     obj.loadCategoryData(idCat, function (data) {
        var cadena = '';
        cadena+= '<div id="main_page_slider" class="main-page-slider">';
        for (var x in data) {
            var post = data[x];
            var image = post.acf.logo.sizes.medium_large;
            var title = post.title.rendered;
            cadena += '<div idref="'+post.id+'" class="main-slider-item" ><img src="' + image + '" border="0" ></div>';
        }

        cadena+= '</div>';
        obj.element.html(cadena);
        $('#main_page_slider').slick({
           arrows:false,
           autoplay:true,
           autoplaySpeed: 6000,
           mobileFirst: false
        }).on('click',function(event, slick,image){
          var active = $('.main-slider-item.slick-active').attr('idref');
          console.log(active);

        });
     });
    /*
      cadena+= '<div>your content</div>';
      cadena+= '<div>your content</div>';
      cadena+= '<div>your content</div>'; */
    

    /*
    var cadena = '<div id="' + obj.id + '_wide_carrucel" class="carousel carousel-slider">';
    obj.loadCategoryData(idCat, function (data) {
      for (var x in data) {
        var post = data[x];
        var image = post.acf.logo.sizes.medium_large;
        var title = post.title.rendered;
        cadena += '<a class="carousel-item" _title="' + title + '" idref="' + post.id + '"><img src="' + image + '"></a>';
      }
      cadena += '</div>';

      obj.element.html(cadena);
      $('#' + obj.id + '_wide_carrucel').carousel({
        fullWidth: true,
        dist:0,
        onCycleTo: function ($current_item, dragged) {
          stopAutoplay();
          startAutoplay();
        }
      });

      var instance = M.Carousel.getInstance($('#' + obj.id + '_wide_carrucel'));
      var autoplay_id;
      function startAutoplay() {
        autoplay_id = setInterval(function () {
          instance.next();
        }, 5000); // every 5 seconds
        //console.log("starting autoplay");
      }

      function stopAutoplay() {
        if (autoplay_id) {
          clearInterval(autoplay_id);
        }
      }

      $('#'+obj.id+' .carousel-item').each(function(){
        $(this).click(function(){
          obj.options.actions({action:'view_post',id:$(this).attr('idref')});
        });
      }); */
      


    //});
  },
  loadCategoryData: function (idCat, func) {
    var obj = this;
    var page = obj.page;
    var per_page = obj.options.per_page;
    var service = obj.options.storedData.getPostsFromCategory;
    service(idCat, page, per_page, function (data) {
      if ($.isFunction(func)) func(data);
    })
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
      .addClass("custom-categoryToSlider");

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
    obj.printSlider();

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
      .removeClass("custom-categoryToSlider")
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

