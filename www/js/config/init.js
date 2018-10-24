/**
 * Configuración inicial para la carga de los archivos correspondientes al modulo config
 * @param {Object} paths - indica cada una de las rutas que emplea el modulo config
 */
requirejs.config({
    paths: {
        connections:'config/connections',
        version:'config/version',
		data:'config/data'
		
    }
});
/**
 * Carga cada uno de los archivos definidos el las rutas de carga considerando las dependencias
 */
define(["version","connections","router","data"], function(version,connections,router,data){
	var config = {
			connections:connections,
			version:projectVersion,
			language:null,
			data:data
		}
	router.config = config;
	return({config:config});
});
