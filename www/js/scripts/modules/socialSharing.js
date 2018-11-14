define(function(){
	var sharemodule = {
		init:function(modules){
			var obj = this;
			obj.modules = modules;
			
			if(!obj.modules.config.isApp){
				$.ajaxSetup({ cache: true });
				$.getScript('//connect.facebook.net/es_MX/sdk.js', function(){
					FB.init({
					  appId: '1925171154444719',
					  version: 'v2.7' // or v2.1, v2.2, v2.3, ...
					});     
				/*$('#loginbutton,#feedbutton').removeAttr('disabled');
					FB.getLoginStatus(updateStatusCallback);
				});*/
				});
			}
		},
		shareFacebook:function(url){
			var obj = this;
			//var logoOnline = obj.modules.config.onlineLogo;
			//if(obj.modules.config.isApp){
				window.plugins.socialsharing.shareViaFacebook('Message via Facebook', null /* img */, url /* url */, function() {console.log('share ok')});
			/*}else{
				
				if(obj.checkSocialApi('facebook')){
					FB.ui({
					  method: 'share_open_graph',
					  action_type: 'og.likes',
					  //link: ruta,
					  caption: '',
					  hashtag:'#dicomercial.com',
					  action_properties: JSON.stringify({
						object:url,
					  })
					}, function(response){
						
					});
				}
				
			}*/
		},
		checkSocialApi:function(name){
			var r = false;
			if(name == 'facebook' && FB)
				r = true;
			return r;
		},
		shareTwitter:function(url){
			var obj = this;
			//var logoOnline = obj.modules.config.onlineLogo;
			//if(obj.modules.config.isApp){
				window.plugins.socialsharing.shareViaTwitter('Message and link via Twitter', null, url);
			/*}else{
				
				var text = "dicomercial.com";
				window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&hashtags=congregacion_mt&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');

			}*/
		},
		shareAll:function(url){
			// this is the complete list of currently supported params you can pass to the plugin (all optional)
				var options = {
				  message: '', // not supported on some apps (Facebook, Instagram)
				  subject: 'https://dicomercial.com', // fi. for email
				  files: ['', ''], // an array of filenames either locally or remotely
				  url: url,
				  chooserTitle: 'Compartido desde dicomercial:' // Android only, you can override the default share sheet title
				}

				var onSuccess = function(result) {
				  //console.log("Compartir completado? " + result.completed); // On Android apps mostly return false even while it's true
				  //console.log("Compartir con aplicación: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
				}

				var onError = function(msg) {
                    M.toast({html: 'falló al compartir'});
				  //console.log("Sharing failed with message: " + msg);
				}

				window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
		}
		
	}
	
	return sharemodule;
})
