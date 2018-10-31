// JavaScript Document
/*$.ajax({
   type: 'POST',
   url:'url.do',
   data: formData,
   success: function(data, textStatus, request){
        alert(request.getResponseHeader('some_header'));
   },
   error: function (request, textStatus, errorThrown) {
        alert(request.getResponseHeader('some_header'));
   }
  });*/
define(function(){
	var getData = function (source, params, callback, error, before, complete) {
		var obj = this;
		var connection = window.navigator.onLine;
		if(connection){ //si hay coneccion de internet

				//Anexo de parametros que vengan definidos desde fuente de datos
				var s_params = source.params;
				var stringify = source.stringify;

				if (!(s_params === undefined)) {
					for (var x in s_params) { //anexo de la conifuracion del origen de datos
						params[x] = s_params[x];
					};
				}
				if (!(stringify === undefined) && stringify) {
					params = JSON.stringify(params);
				}
				//Estructura basica de peticion
				var dataObject = {
					data: params,
					success: function (json, estatus) {
						if ($.isFunction(callback)) 
							callback(json, estatus);
					},
					beforeSend: function (solicitudAJAX) {
						//obj.showSpinner();
						if ($.isFunction(before)) {
							before(params);
						};
					},
					error: function (solicitudAJAX, errorDescripcion, errorExcepcion) {
						if ($.isFunction(error)) {
							error(errorDescripcion, errorExcepcion);
						};
					},
					complete: function (solicitudAJAX, estatus) {
						//obj.hideSpinner();
						if ($.isFunction(complete)) {
							complete(solicitudAJAX, estatus);
						};
					}
				};
				//anexo de la conifuracion del origen de datos
				for (var x in source) {
					if (!(/field|name|id|params|stringify/.test(x))) dataObject[x] = source[x];
				};

				jQuery.support.cors = true;
				$.ajax(dataObject);
		}else{
			 M.toast({html: 'No se detectó una conección de internet'});
		}
	}
	
	return getData;
})