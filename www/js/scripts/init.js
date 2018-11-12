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
define(["main","language","modules"],function(main,language,modules){
    
	return{
		init:function(){
			$('document').ready(function(){
                
                setTimeout(function(){
                    $('#home_splash').css('background-color','#98d4ff');
                     $('#home_splash_logo').fadeIn('slow');
                },500);
                modules.storedData.init(function(){ //precarga la informacion necesaria antes de iniciar el app
                   main.init();
                   $('#home_splash').fadeOut('slow',function(){
                       $('#home_splash').remove();
                    });
                })
			});
		}
	}
});
