/**
 * Configuraci�n inicial para la carga de los archivos correspondientes al modulo config
 * @param {Object} paths - indica cada una de las rutas que emplea el modulo config
 */
requirejs.config({
    paths: {
        connections:'config/connections',
		home_selectors:'config/home_selectors',
        version:'config/version',
		data:'config/data'
    }
});
/**
 * Carga cada uno de los archivos definidos el las rutas de carga considerando las dependencias
 */
define(["version","connections","router","data","home_selectors"], function(version,connections,router,data,home_selectors){
	var config = {
			connections:connections,
			version:projectVersion,
			language:null,
			data:data,
			home_selectors:home_selectors
		}
	router.config = config;
	return({config:config});
});
