define(["router","ui","widgets"], function(router,ui,widgets){
	var config = router;
    var main = {
		init:function(){
			ui.init();
			widgets.init();
			var r = router;
		}
    };
    return main;
    
});