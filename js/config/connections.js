/**
 * Definición de rutas de conexion
 * @returns {Object} regresa un objeto con cada uno de los modulos de conexion que empleara el sistema
 */
define([], function(){
    return {
        domain:'http://directoriocomercialdelcentro.com/wp-json/wp/v2/',
	    search:{
            url:'search/%s?fields=id,title.rendered,link,type,excerpt,content,featured_image',
            type:'GET',
            dataType:'json'
			
	    }
    };
    
});