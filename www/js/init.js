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
	screen.orientation.lock('portrait');
	if(window.plugins && window.plugins.phonedialer){
		window.plugins.phonedialer.dial(
			"2125551212", 
			function(err) {
			if (err == "empty") alert("Unknown phone number");
			else alert("Dialer Error:" + err);    
			},
			function(success) { alert('Dialing succeeded'); }
		);
	}

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


		//disable back button
		(function (global) { 

			if(typeof (global) === "undefined") {
				throw new Error("window is undefined");
			}
		
			var _hash = "!";
			var noBackPlease = function () {
				global.location.href += "#";
		
				// making sure we have the fruit available for juice (^__^)
				global.setTimeout(function () {
					global.location.href += "!";
				}, 50);
			};
		
			global.onhashchange = function () {
				if (global.location.hash !== _hash) {
					global.location.hash = _hash;
				}
			};
		
			global.onload = function () {            
				noBackPlease();
		
				// disables backspace on page except on input fields and textarea..
				document.body.onkeydown = function (e) {
					var elm = e.target.nodeName.toLowerCase();
					if (e.which === 8 && (elm !== 'input' && elm  !== 'textarea')) {
						e.preventDefault();
					}
					// stopping event bubbling up the DOM tree..
					e.stopPropagation();
				};          
			}
		
		})(window);




});

