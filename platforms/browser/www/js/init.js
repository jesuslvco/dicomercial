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
	//fija la pantalla en portrait
	//https://www.npmjs.com/package/cordova-plugin-call-number
	//window.plugins.CallNumber.callNumber(onSuccess, onError, number, bypassAppChooser);

	//https://www.npmjs.com/package/cordova-plugin-x-socialsharing#4-usage-on-ios-and-android
	//<button onclick="window.plugins.socialsharing.shareViaTwitter('Message via Twitter')">message via Twitter</button>
	//<button onclick="window.plugins.socialsharing.shareViaTwitter('Message and link via Twitter', null /* img */, 'http://www.x-services.nl')">msg and link via Twitter</button>
	//<button onclick="window.plugins.socialsharing.shareViaFacebook('Message via Facebook', null /* img */, null /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)})">msg via Facebook (with errcallback)</button>
	//<button onclick="window.plugins.socialsharing.shareViaInstagram('Message via Instagram', 'https://www.google.nl/images/srpr/logo4w.png', function() {console.log('share ok')}, function(errormsg){alert(errormsg)})">msg via Instagram</button>
	//...

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

/*
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
				
				var count = 0;
				var last = '';
				$(document).ready(function(){
					
					$('.view-container').each(function(){
						count++;
						last = $(this).attr('id');
					});
					console.log(last);
				
				});
				

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
		*/




});

