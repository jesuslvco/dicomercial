define(function(){
	var cards = {
		createCard:function(card){
			var obj = this;
			var r = null;
			switch(card.type){
				case 'mini_avatar':
						r = obj.mini_avatar(card);
					break;
			}
			return r;
		},
		mini_avatar:function(data){
			var obj = this;
			var type = data.type;
			var size = data.size;
			var info = data.data;
			var color = info.bgcolor;
			var size = 's'+size.short+' m'+size.medium+' l'+size.large;
			
			var image = info.image;
			
			var cadena = '';
				cadena+= '<div class="col '+size+' card-mini-avatar">';
				cadena+= '	<div class="card card-main-container" style="background-color:'+color+';color:'+obj.invertColor(color,true)+'">';
				cadena+= '		<div class="card-content">';
				cadena+= '			<div class="card-image-container">';
				cadena+= '				<img src="'+image+'" border="none">';
				cadena+= '			</div>';
				cadena+= '			<div class="text-container">'; 
				cadena+= '				<ul>'; 
				cadena+= '					<li class="main-title-value truncate">'+info.main_value+'</li>'; 
				cadena+= '					<li class="main-title truncate">'+info.main_value_title+'</li>'; 
				cadena+= '				</ul>'; 
				cadena+= '			</div>';
				cadena+= '			<div class="card-bottom-container">';
				cadena+= '				<div class="card-bottom-container-left">';
				cadena+= '					<div class="card-title truncate">'+info.title+'</div>';
				cadena+= '				</div>';
				cadena+= '				<div class="card-bottom-container-right truncate">';
				cadena+= '					<ul>'; 
				cadena+= '						<li class="card-value-title truncate">'+info.value_title+'</li>'; 
				cadena+= '						<li class="card-value truncate">'+info.value+'</li>'; 
				cadena+= '					</ul>'; 
				cadena+= '				</div>';
				cadena+= '			</div>';
				cadena+= '		</div>';
				cadena+= '	</div>';
				cadena+= '</div>';
			
			return cadena;
			
		},
		//color managment
		invertColor(hex, bw) {
			var padZero = function(str, len) {
								len = len || 2;
								var zeros = new Array(len).join('0');
								return (zeros + str).slice(-len);
							}
			
			if (hex.indexOf('#') === 0) {
				hex = hex.slice(1);
			}
			// convert 3-digit hex to 6-digits.
			if (hex.length === 3) {
				hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
			}
			if (hex.length !== 6) {
				throw new Error('Invalid HEX color.');
			}
			var r = parseInt(hex.slice(0, 2), 16),
				g = parseInt(hex.slice(2, 4), 16),
				b = parseInt(hex.slice(4, 6), 16);
			if (bw) {
				// http://stackoverflow.com/a/3943023/112731
				return (r * 0.299 + g * 0.587 + b * 0.114) > 186
					? '#000000'
					: '#FFFFFF';
			}
			// invert color components
			r = (255 - r).toString(16);
			g = (255 - g).toString(16);
			b = (255 - b).toString(16);
			// pad each with zeros and return
			return "#" + padZero(r) + padZero(g) + padZero(b);
		}
	}
	return cards;
});