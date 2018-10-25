define(['config','getData'],function(config,getData){
    
    var data = {
        categories:[],
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
                obj.data.categories = _data;

                if($.isFunction(func))func(_data);
            },function(_data){ //error
                console.log('fallo al cargar las categorias');
            });

        },
        getPostsFromCategory:function(cat_id,page,per_page,func){
            var obj = this;
            var domain = config.config.connections.domain;
            var service = $.extend({},config.config.connections.postsFromCategory);
            service.url = domain+service.url;
            service.params.categories = cat_id;
            service.params.page = page;
            service.params.per_page = page;
            getData(service,{},function(_data){  //success
                //obj.data.results.push() = _data;
                if($.isFunction(func))func(_data);
            },function(_data){ //error
                console.log('fallo al cargar entradas de la categoria');
            })
        }
        //---------------------------------
        

    };
});
	