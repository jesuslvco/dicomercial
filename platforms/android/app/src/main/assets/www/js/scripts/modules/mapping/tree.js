define(["tree"], function(Tree){
    var Map=null;
    var reg = {
        'Vectorial':{},
        'Text':{}
    };
    var getOverlay = function(id){
        var overlay = '';
        var c = id.substring(0, 1);
        c = c.toLowerCase();
        switch (c) {
            case 't':
                overlay = 'Text';
                break;
            default:
                overlay = 'Vectorial';
        }
        return overlay;
    }
    var sortLayers = function(source){
        var layers = [];
        var sortable = [];
        for (var x in source) {
            sortable.push([x, source[x].position]);
        }
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });
        if (sortable.length>0) {
            for(var x in sortable){
                layers.push(sortable[x][0])
            }
        }
        return layers.join(',');
    }
    var getParams = function(Id){
        var params = null;
        var groups = Tree.overlays.groups;
        Groups:
        for(var x in groups){
            var group = groups[x];
            for(var y in group.layers){
                var layer = group.layers[y];
                var id = y;
                if(id==Id){
                    params = {group:x,position:layer.position};
                    break Groups;
                }
            }
        }
        return params;
    }
    var init = function(source){
        Map = source;
        var response = {};
        var groups = Tree.overlays.groups;
        for(var x in groups){
            var group = groups[x];
            for(var y in group.layers){
                var layer = group.layers[y];
                var id = y;
                var Layer = getOverlay(id);
                var params = {group:x,position:layer.position};
                if (layer.active) { 
                    reg[Layer][id] = params;
                }
                if ((layer.texts)&&(layer.texts.active)) {
                    var idText = 't'+id.substring(1,id.length);
                    reg['Text'][idText] = params;
                }
            }
        }
        for(var x in reg){
            response[x] = sortLayers(reg[x]);
        }
        return response;
    }
    var clock = null;
    var layerAltered = {};
    var updateLayers = function(a){
        for(var x in a){
                //{id:'c100',active:false,group:''}
                var i = a[x];
                var layer = getOverlay(i.id);
                if (i.active) {
                    if (!reg[layer][i.id]) {
                       var id = (layer=='Text')?'c'+i.id.substring(1,i.id.length):i.id;
                       var params = getParams(id);
                       if (params) {
                            reg[layer][i.id] = params;
                       }
                    }
                }else{
                    delete reg[layer][i.id];
                }
                layerAltered[layer]='';
        }
        
        if (clock) {
            clearTimeout(clock);
        }
            clock = setTimeout(function(){
                for(var x in layerAltered){
                    layerAltered[x] = sortLayers(reg[x]);
                }
                Map.events.updateOverlays(layerAltered);
                //invocacion de mapping para enviar parametros
                layerAltered = {};
            },500);
    }
    /*
    var updateLayers = function(a){
        if (reg[a.layer]) {
            for(var x in a.params.layers){
                //{id:'c100',active:false,group:''}
                var i = a.params.layers[x];
                if (i.active) {
                    if (!reg[a.layer][id]) {
                       var position = Tree.overlays.groups[i.group][i.id].position;
                       reg[a.layer][id] = {group:i.group,position:position};
                    }
                }else{
                    delete reg[a.layer][id];
                }
                layerAltered[a.layer]='';
            }
        }
        if (clock) {
            clearTimeout(clock);
            clock = setTimeout(function(){
                for(var x in layerAltered){
                    layerAltered[x] = sortLayers(reg[x]);
                }
                Map.events.updateOverlays(layerAltered);
                //invocacion de mapping para enviar parametros
                layerAltered = {};
            },500);
        }
    }
    */
    return {
	    getLayers:init,
        update:updateLayers
    };
    
});