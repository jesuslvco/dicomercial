// JavaScript Document
var dinamicPanel_symbols = {
	getImage:function(text){
		var obj = this;
		var image = null;
		var router = obj.router[text];
		if(router){
			image = obj.images[router];
		}
		if(!image) image = 'sym_otro.png'; //imagen por defecto de no encontrar
		return 'symbols/'+image;
	},
	router:{
		
		edo:'edo',
		mun:'mun',
		loc:'loc',
		locurb:'loc',
		
		entidadfederativa:'edo',
		localidad:'loc',
		localidadurbana:'loc',
		localidadrural:'loc',
		municipio:'mun',
		
	},
	images:{
		edo:'sym_edo.png',
		mun:'sym_mun.png',
		loc:'sym_loc.png',
		otro:'sym_otro.png'
	}
}