//WIDGETS INIT
requirejs.config({
    /*paths: {
        dinamicPanel:'scripts/widgets/dinamicPanel/jquery.ui.dinamicPanel'
    },
	shim: {
        dinamicPanel:{
            exports:'dinamicPanel'
		}
    },
    waitSeconds: 0*/
});
define(["router"],function(router){
	
	var widgets = {
		init:function(){
			var cadena = '';
			/*cadena+= '<div id="dinamicPanel"></div>';
			$('#app').append(cadena);
			$('#dinamicPanel').dinamicPanel({
				path:require.toUrl("dinamicPanel")
			});*/
			
			
		}
	}
	return widgets;
});
