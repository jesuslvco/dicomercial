requirejs.config({
    paths: {
        ol:'libs/ol/ol',
        jquery:'libs/jquery/jquery',
        jqueryui:'libs/jquery/jquery-ui.min',
        highcharts:'libs/highcharts/code/highcharts.src',
        materialize:'libs/materialize/dist/js/materialize',
        hammerjs:'libs/materialize/js/hammer.min',
		'jquery-hammer':'libs/hammerplugin/jquery.hammer',
        velocity:'libs/materialize/js/velocity.min',
        html2canvas:'libs/html2canvas/html2canvas',
        canvg:'libs/html2canvas/canvg',
        jsPdf:'libs/jsPdf/jsPdf',
        svg:'libs/jsPdf/svg_to_pdf',
        saveSvgAsPng:'libs/jsPdf/saveSvgAsPng',
        from_html:'libs/jsPdf/from_html',
        split_text_to_size:'libs/jsPdf/split_text_to_size',
        standard_fonts_metrics:'libs/jsPdf/standard_fonts_metrics',
        fileUpload:'libs/upload/fileupload',
        amplify:'libs/amplify/amplify'
        
    },
    waitSeconds: 0,
    shim: {
        
        ol: {
            deps:['amplify']
        },
        amplify:{
            deps:['materialize']  
        },
        materialize:{
            deps:['velocity']
        },
        velocity:{
            deps:['hammerjs']
        },
        hammerjs:{
          deps:['fileUpload']  
        },
        fileUpload:{
            deps:['highcharts']
        },
        highcharts:{
            exports: "Highcharts",
            deps:['jqueryui']
        },
        jqueryui:{
            deps:['jquery']
        }
		
        
    }
});

define(["ol"], function(){
        var v = 'version='+projectVersion;
        $.when(
            $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/libs/materialize/dist/css/materialize.min.css?'+v}).appendTo('head'),
            $('<link>', {rel: 'stylesheet',type: 'text/css',href:'https://fonts.googleapis.com/icon?family=Material+Icons&'+v}).appendTo('head'),
            $('<link>', {rel: 'stylesheet',type: 'text/css',href:'js/libs/ol/ol.css?'+v}).appendTo('head'),
            $.Deferred(function( deferred ){
			$( deferred.resolve );
		    })
		).done(function(){
	    });
});
