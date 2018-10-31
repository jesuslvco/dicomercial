define(['config','getData'],function(config,getData){
    
    var data = {
        categories:[],
        slider_category:null,
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
            service.params = {}
            obj.getData(service,{},function(_data){  //success
                var list = _data;
                for (var x in list){
                    var cat = list[x];
                    var type = (cat.acf)?(cat.acf.category_type)?cat.acf.category_type:'normal':'normal';

                    if(type == 'premium'){
                        obj.data.slider_category = cat;
                    }else{
                        obj.data.categories.push(cat);
                    }
                }

                if($.isFunction(func))func(_data);
            },function(_data){ //error
                M.toast({html: 'fallo al cargar las categorias'});
            });

        },
        getPostsFromCategory:function(cat_id,page,per_page,func){
            var obj = this;
            var domain = config.config.connections.domain;
            var service = $.extend({},config.config.connections.postsFromCategory);
            service.url = domain+service.url;

            if(cat_id) //considera la categoria solo si se recibe el parametro
                service.params.categories = cat_id;
              
            service.params.page = page;
            service.params.per_page = per_page;

            if(!cat_id && service.params.categories)
                delete service.params.categories;

            getData(service,{},function(_data){  //success
                //obj.data.results.push() = _data;
                if($.isFunction(func))func(_data);
            },function(_data){ //error
                M.toast({html: 'fallo al cargar entradas de la categoria'});
            })
        }
        //---------------------------------
        

    };
});
	