$.widget("custom.viewPost", {
  //--------Codigo de Widget-------------------------------------------------------------------------------

  // default options
  options: {

  },
  //Logica del Widget---------------------------------------------------------------------------------------
  createHtml:function(){
    var obj = this;
    obj.getPostData(function(data){
      var title = data.title.rendered;
      data = data.acf;

      var content = data.content;
      var address = data.address;
      var logo = (data.logo)?data.logo.sizes.thumbnail:'img/no-image-rectangle.jpg';
      var image = (data.image)?data.image.sizes['thumb-large']:'img/no-image-square.jpg';
      var design = (data.design)?data.design.sizes['thumb-large']:null;
      var phones = (data.phonenumber)?data.phonenumber.trim().split(','):[];
      
      var web = data.website;
      var youtube = data.youtube;
      var facebook = data.facebook;
      var instagram = data.instagram;
      var googlemaps = data.googlemaps;
      var twitter = data.twitter;

      //fix phoneNumbers
      for(var x in phones){
        phones[x] =  phones[x].replace(/[|&;$%@"<>()+,]/g, "").replace(/\s/g, "");
      }

      var social = '';
      if(web && web != ''){
        social+= '<p style="margin-bottom:8px;"><a href="'+web+'" target="_blank" class="waves-effect waves-light btn" style="clear:both;">Página WEB</a></p>';
      }
      if(facebook && facebook != ''){
        social+= '<span class="social-link"><a href="'+facebook+'" target="_blank"><img src="img/icons/facebook.png"></a></span>';
      }
      if(instagram && instagram != ''){
        social+= '<span class="social-link"><a href="'+instagram+'" target="_blank"><img src="img/icons/instagram.png"></a></span>';
      }
      if(twitter && twitter != ''){
        social+= '<span class="social-link"><a href="'+twitter+'" target="_blank"><img src="img/icons/twitter.png"></a></span>';
      }

      var _design = '';
      if(design && design != ''){
        _design+= '<img src="'+design+'" width="100%" class="materialboxed">';
      }

      var cadena = '';
      cadena+= ''

      cadena+= '<div class="card">';
      cadena+= '   <div class="card-image">';
      cadena+= '    <img src="'+image+'">';
      cadena+= '    <span class="card-title">'+title+'</span>';
      cadena+= '  </div>';
      cadena+= '  <div class="card-content">';
      cadena+= '    <img src="'+logo+'" width="120" style="clear:both" >'+_design+'<span>'+content+'</span>'+social;
      cadena+= '  </div>';
      cadena+= '</div>';




      if(phones && phones.length > 0){
        var f_p = [];
        for(var x in phones)
          f_p.push(phones[x].replace(/^(\d{3})(\d{3})(\d{4}).*/, '($1) $2-$3'));

        cadena+= '<div class="card">';
        cadena+= '  <div class="card-content telephone-content">';
        cadena+= '    <i class="Small material-icons icon-blue">local_phone</i><span>'+f_p.join('</br>')+'</span>';
        cadena+= '  </div>';
        cadena+= '</div>';
      }
      if(address && address != ''){
      cadena+= '<div class="card">';
      cadena+= '  <div class="card-content">';
      cadena+= '    <div class="address-content" style="display:flex;padding-bottom:8px;">';
      cadena+= '      <i class="Small material-icons icon-blue">location_on</i><span>'+address+'</span>';
      cadena+= '    </div>';
        if(googlemaps && googlemaps != ''){
          var urlRegex = /(https?:\/\/[^ ]*)/;
          var url = googlemaps.match(urlRegex)[1];
          if(url.substr(-1) == '"'){
            url = url.substr(0,url.length-1);
          }
          googlemaps = '<iframe src="'+url+'" width="100%" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>'
          cadena+=googlemaps;
        }

      cadena+= '  </div>';
      cadena+= '</div>';
      }

      if(youtube && youtube != ''){
        youtube = youtube.replace("watch?v=", "embed/");
        cadena+= '<div class="card">';
        cadena+= '  <div class="card-content">';
        cadena+= '    <div class="video-container">';
        cadena+= '      <iframe width="853" height="480" src="'+youtube+'" frameborder="0" allowfullscreen></iframe>';
        cadena+= '    </div>';
        cadena+= '  </div>';
        cadena+= '</div>';
      }

      //manejo del despliegue del boton de llamada
      var icons = {
        '_1':{icon:'looks_one',color:'red'},
        '_2':{icon:'looks_two',color:'yellow darken-1'},
        '_3':{icon:'looks_3',color:'green'},
        '_4':{icon:'looks_4',color:'blue'},
        '_5':{icon:'looks_5',color:'purple lighten-4'},
        '_6':{icon:'looks_6',color:'orange lighten-3'},
      }

      if(phones.length > 0){
        var maxPhone = (phones.length > 6)?6:phones.length;
        cadena+= '<div class="fixed-action-btn phonecaller">';
        cadena+= '  <a pos="'+0+'" class="btn-floating btn-large pulse '+icons['_1'].color+' '+((phones.length == 1)?'num-dialer':'')+'" number="'+phones[0]+'">';
        cadena+= '    <i class="large material-icons">local_phone</i>';
        cadena+= '  </a>';
        if(phones.length > 1){
          cadena+= '<ul>';
          for(var x = 0; x < maxPhone; x++){
              var icon = icons['_'+(x+1)];
              var num = phones[x];
              cadena+= '<li><a class="btn-floating num-dialer '+icon.color+'" pos="'+0+'" number="'+num+'"><i class="material-icons">'+icon.icon+'</i></a></li>';
          }
          cadena+= '</ul>';
        }
      }    
      cadena+='';
      obj.element.html(cadena);

      $('.materialboxed').materialbox();

      $('.phonecaller').floatingActionButton({
          direction:'top',
          hoverEnabled:false,
          toolbarEnabled:false
      });

      $('.phonecaller .num-dialer').each(function() {
        $(this).click(function () {
            var number = $(this).attr('number');
            obj.options.onAction({action:'dial',num:number});
        })
      });


      
    })
  },
  getPostData: function (func) {
    var obj = this;
    var slug = obj.options.slug; 
    var service = obj.options.storedData.getPost;
    service(slug,function (data) {
      if(data.result && data.result.length > 0){
        if ($.isFunction(func)) func(data.result[0]);  
      }
    });
  },
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
      .addClass("custom-viewPost");

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
      .removeClass("custom-viewPost")
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

