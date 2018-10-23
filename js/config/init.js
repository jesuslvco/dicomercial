/**
 * Configuración inicial para la carga de los archivos correspondientes al modulo config
 * @param {Object} paths - indica cada una de las rutas que emplea el modulo config
 */
requirejs.config({
    paths: {
        mappingConfig:'config/mapping',
        connections:'config/connections',
        version:'config/version',
        tree:'config/tree'
    }
});
/**
 * Carga cada uno de los archivos definidos el las rutas de carga considerando las dependencias
 */
define(["version","mappingConfig","connections","tree","router"], function(version,mappingConfig,connections,tree,router){
	var config = {
			connections:connections,
			tree:tree,
			mappingConfig:mappingConfig,
			version:projectVersion,
			language:null
		}
	router.config = config;
	return({config:config});
});
