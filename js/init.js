requirejs.config({
            urlArgs: "version=" + (new Date()).getTime(),
            baseUrl: 'js/',
            waitSeconds: 0,
            paths: {
				config:'config/init',
				router:'router'
			},
			shim:{
				config:{
					deps:['router']
				}
			}
});
require(['config','router'],function (config) {
	    var v = 'version='+projectVersion;
		//objeto principal para el aacceso a el codigo
	    requirejs.config({
			urlArgs: v,
			paths: {
                    libs:'libs/init',
				    scripts:'scripts/init'
			},
			shim: {
				    scripts:{
                        deps:['libs']   
				    }
			}
	    });
	    require(['scripts'],function (scripts) {
			  scripts.init();
		});
});

