define(['config','getData'],function(config,getData){
    
    var data = {
        categories:[],
        all_categories:[],
        top_category:null,
        slider_category:null,
        premium:null,
        menu:null,
        searches:[],
        results:[],
        currentShow:null,
    }
    return {
        data:data,
        getData:getData,
        init:function(func){
            var obj = this;
            obj.loadCategories(func);
        },
        //--------Carga de  datos
        loadCategories:function(func){
            var obj = this;
            var domain = config.config.connections.domain;
            var service = $.extend({},config.config.connections.categories);
            service.url = domain+service.url;
            obj.getData(service,{},function(_data){  //success
                var list = _data.result;
                obj.data.all_categories = list;
                var fixed_cat = null;
                for (var x in list){
                    var cat = list[x];
                    var type = (cat.acf)?(cat.acf.category_type)?cat.acf.category_type:'normal':'normal';
                    var reserved = ["slider","premium","menu","home_shortcut","system", "hidden"]

                    if(reserved.indexOf(type) >= 0){
                        if(type == 'slider')
                            obj.data.slider_category = cat;
                        if(type == 'premium')
                            obj.data.premium = cat;
                        if(type == 'menu')
                            obj.data.menu = cat;
                        if(type == 'home_shortcut')
                            obj.data.home_shortcut = cat;
                    }else{
                        if(cat.acf && cat.acf.image){  //si la categoria tiene imagen
                                if(cat.acf && !cat.acf.position || cat.acf.position == '' || cat.acf.position == '0')
                                    cat.acf.position = '300';
                                cat.acf.position = parseInt(cat.acf.position);

                                obj.data.categories.push(cat);
                        }
                    }
                }

                var compare = function(a,b) {
                    if (a.acf.position < b.acf.position)
                        return -1;
                    if (a.acf.position > b.acf.position)
                        return 1;
                    return 0;
                }
                obj.data.categories.sort(compare);

                if($.isFunction(func))func(_data);
            },function(_data){ //error
                M.toast({html: 'fallo al cargar las categorias'});
            });

        },
        getPostsFromCategory:function(cat_id,search,page,per_page,func){
            var obj = this;
            var domain = config.config.connections.domain;
            var service = $.extend({},config.config.connections.postsFromCategory);
            service.url = domain+service.url;
            delete service.params.categories; 
            delete service.params.search;

            if(cat_id) //considera la categoria solo si se recibe el parametro
                service.params.categories = cat_id;
            if(search)
                service.params.search = search;

            service.params.page = page;
            service.params.per_page = per_page;

            if(!cat_id && service.params.categories)
                delete service.params.categories;
            getData(service,{},function(_data,status,request){  //success
                if($.isFunction(func))func(_data);
            },function(_data){ //error
                M.toast({html: 'fallo al cargar entradas de la categoria'});
            })
        },
        getPost:function(slug,func){
            var obj = this;
            var domain = config.config.connections.domain;
            var service = $.extend({},config.config.connections.getPost);
            service.url = domain+service.url;
            service.params.slug = slug;

            getData(service,{},function(_data,status,request){  //success
                if($.isFunction(func))func(_data);
            },function(_data){ //error
                M.toast({html: 'fallo al cargar la entrada'});
            })
        },
        getCategoryInfo:function (id) {
            var obj = this;
            var list = obj.data.all_categories;
            var r = null;
            for(var x in list){
                if (list[x].id == id){
                    r = list[x];
                    break;
                }
            }
            return r;
        }
        //---------------------------------
        

    };
});
	