define(["router","ui","widgets"], function(router,ui,widgets){
	var config = router;
    var main = {
		init:function(func){
			ui.init(func);
			widgets.init();
			var r = router;
		}
    };
    return main;
    
});