/**
 * Configuración inicial para la carga de los archivos correspondientes al modulo config
 * @param {Object} paths - indica cada una de las rutas que emplea el modulo config
 */
requirejs.config({
    paths: {
        connections:'config/connections',
        version:'config/version'
    }
});
/**
 * Carga cada uno de los archivos definidos el las rutas de carga considerando las dependencias
 */
define(["version","connections","router"], function(version,connections,router){
	var config = {
			connections:connections,
			version:projectVersion,
			language:null
		}
	router.config = config;
	return({config:config});
});
