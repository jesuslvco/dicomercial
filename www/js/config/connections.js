/**
 * Definici�n de rutas de conexion
 * @returns {Object} regresa un objeto con cada uno de los modulos de conexion que empleara el sistema
 */
define([], function(){
    return {
        domain:'http://directoriocomercialdelcentro.com/wp-json/wp/v2/',
	    search:{
            //url:'search/%s?fields=id,title.rendered,link,type,excerpt,content,featured_image',
			url:'posts', 
			//url:'posts?fields=id,title.rendered,link,type,excerpt,content,featured_image,categories&page=%page&per_page=%per_page&search=%s', 
            //url:'posts?search=comida&fields=id,title.rendered,link,type,excerpt,content,featured_image,categories&page=1&per_page=5&categories=41,42&&orderby=relevance',
			type:'GET',
			params:{
				search:'',
				page:1,
				per_page:10,
				fields:'id,title.rendered,link,type,acf',
				orderby:'relevance'
			},
            dataType:'json'
		},
		postsFromCategory:{
			url:'posts', 
			type:'GET',
			params:{
				//categories:0,
				page:1,
				per_page:10,
				fields:'id,title.rendered,link,type,acf',
				//orderby:'relevance'
			},
            dataType:'json'
		},
		categories:{
			url:'categories',
			type:'GET',
            dataType:'json'
		},
		mediaDetail:{
			url:'http://www.directoriocomercialdelcentro.com/wp-json/wp/v2/media?slug=%s',
			url:'categories',
			type:'GET',
            dataType:'json'
		}
    };
    
});