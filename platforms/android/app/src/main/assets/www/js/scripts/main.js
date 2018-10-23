define(["mapping","router","ui","widgets"], function(mapping,router,ui,widgets){
	var config = router;
    var main = {
		init:function(){
			ui.init();
			mapping.init();
			router.map = mapping;
			widgets.init();
		}
    };
    return main;
});