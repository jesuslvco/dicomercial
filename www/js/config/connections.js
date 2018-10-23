/**
 * Definición de rutas de conexion
 * @returns {Object} regresa un objeto con cada uno de los modulos de conexion que empleara el sistema
 */
define([], function(){
    return {
        domain:'http://directoriocomercialdelcentro.com/wp-json/wp/v2/',
	    search:{
            //url:'search/%s?fields=id,title.rendered,link,type,excerpt,content,featured_image',
            url:'posts?search=%s&fields=id,title.rendered,link,type,excerpt,content,featured_image,categories&page=1&per_page=5',
            //url:'posts?search=comida&fields=id,title.rendered,link,type,excerpt,content,featured_image,categories&page=1&per_page=5&categories=41,42&&orderby=relevance',
            type:'GET',
            dataType:'json'
	    },
		categories:{
			url:'categories',
			type:'GET',
            dataType:'json'
		}
    };
    
});