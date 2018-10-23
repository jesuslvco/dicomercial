requirejs.config({
    paths: {
        ui:'scripts/ui',
        main:'scripts/main',
        modules:'scripts/modules/init',
        widgets:'scripts/widgets/init',
		language:'config/language/init'
		
    },
	shim: {
        main: {
            deps:['language','modules','widgets','ui']
        }
    },
    waitSeconds: 0
    
});
define(["main","language"],function(main,language){
	return{
		init:function(){
			$('document').ready(function(){
				main.init();
			});
		}
	}
});
