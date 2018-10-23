/**
 * Configuración inicial para la carga de los archivos correspondientes al modulo lenguaje
 * @param {Object} paths - indica cada una de las rutas que emplea el modulo lenguaje
 */
//funciones para carga de cookies ----------------------------------------------
//La cookie para almacenar el lenguaje seleccionado es "mdm_language" de no existir carga por defecto "MX_es"
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//----------------------------------------------------------------------------------

var lang = getCookie('mdm_language');
if(!lang){
	setCookie('mdm_language','MX_es',365);
	lang = getCookie('mdm_language');
}
var path = {};
	path['lang'] = 'config/language/'+lang

requirejs.config({
    paths: path
});
/**
 * Carga cada uno de los archivos definidos el las rutas de carga considerando las dependencias
 */
define(["lang","router"], function(lang,router){
	router.language = lang;
});
