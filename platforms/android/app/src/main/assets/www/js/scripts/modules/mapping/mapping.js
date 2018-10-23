var setBase = null;
var setCapa = null;
var enciende = null;
var markers = null;
var measure = null;
var go = null;
define(["ol","tree","mappingConfig","mappingTree","mappingMarkers","mappingFetures"], function(ol,Tree,mappingConfig,mappingTree,mappingMarkers,mappingFetures){
    var Map = {
        map:null,
        layers:[],
        baseSelected:null,
        events:{
            updateOverlays:null
        }
    }
    var getItemLayer = function(i,name,layers){
        var layer = null;
        var params = null;
        var type = i.type.toLowerCase();
        switch (type){
            case 'osm':
                params = {
                    source: new ol.source.OSM()
                }
                break;
            case 'google':
                params = {
                    source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}' })
                }
                break;
            case 'wms':
                var format = (i.format)?i.format:'jpeg';
                var allLayers = (i.layer)?i.layer:layers;
                if (i.tiled) {
                    params = {
                        source: new ol.source.TileWMS({
                        url: i.url,
                        params: {
                            'LAYERS': allLayers,
                            'VERSION': '1.1.1',
                            'FORMAT':'image/'+format
                        },
                        transition: 0,
                        serverType: 'mapserver'
                      })
                    };
                }else{
                    params = {
                        source: new ol.source.ImageWMS({
                            url: i.url,
                            params: {'LAYERS': allLayers},
                            serverType: 'mapserver'
                        })
                    };
                };
                if (allLayers=='') {
                    i.visible = false;
                }
                break;
            case 'esri':
                params = {
                    source: new ol.source.XYZ({
                        //attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                        url: i.url
                    })
                }
                break;
            case 'bing':
                params = {
                    preload: Infinity,
                    source: new ol.source.BingMaps({
                            key: i.key,
                            imagerySet: i.layer
                            // use maxZoom 19 to see stretched tiles instead of the BingMaps
                            // "no photos at this zoom level" tiles
                            // maxZoom: 19
                    })
                }
                break;
        }
        if (params) {
            params.name = name+'';
            params.visible = i.visible;
            layer = ((type=='wms')&&(!i.tiled))?new ol.layer.Image(params):new ol.layer.Tile(params);
        }
        return layer;
    }
    var defineLayers = function(source,data){
        for(var x in source){
            var i = source[x];
            var name = (i.name)?i.name:x;
            var layers = ((data)&&(typeof(data[name])=='string'))?data[name]:null;
            var l = getItemLayer(i,name,layers);
            if (l) {
                Map.layers.push(l);
            }
        }
    };
    var addMarkers = function(){
        Map.layers.push(mappingMarkers.get());
    }
    var init = function(){
        
        var layersOverlay = mappingTree.getLayers(Map);
        defineLayers(Tree.bases);
        defineLayers(mappingConfig.overlays,layersOverlay);
        addMarkers();
        Map.layers.push(mappingFetures.get());
        Map.map = new ol.Map({
            layers: Map.layers,
            target: 'map',
            view: new ol.View({
              projection: 'EPSG:900913',
              center: [-11390679.927522, 2531791.6145429],
              zoom: 5
            })
        });
        mappingFetures.init(Map);
    };
    var getLayer = function(name){
        var layer = null;
        for(var x in Map.layers){
            if (Map.layers[x].get('name')==name) {
                layer = Map.layers[x];
                break;
            }
        }
        return layer;
    };
    var setVisibility = function(layer,status){
        layer.setVisible(status);
    };
    var setBaseLayer = function(name){
        var selected = getLayer(Map.baseSelected);
        if (selected) {
            setVisibility(selected,false);
        }
        var layer = getLayer(name);
        if (layer) {
            Map.baseSelected = name;
            setVisibility(layer,true);
        }
    };
    var setOpacity = function(name,opacity){
        var layer = getLayer(name);
        if (layer) {
            layer.setOpacity(parseFloat(opacity/100));
        }
    };
    var updateParams = function(a){
        var layer = getLayer(a.layer);
        a.params['FIRM'] = ""+ Math.floor(Math.random()*11) + (Math.floor(Math.random()*101));
        var visible = true;
        if(layer){
            if(a.params.LAYERS!=''){
                layer.getSource().updateParams(a.params);
            }else{
                   visible=false;
            }
            setVisibility(layer,visible);
        }
    };
    var updateOverlays = function(source){
        for(var x in source){
            updateParams({layer:x,params:{LAYERS:source[x]}});
        }
    }
    var goCoords = function(){
        var a = arguments;
        var z = null;
        if(a[0].wkt){
            //es wkt
        }else{
            var c = a[0].coords;
            for(var x in c){
                c[x] = parseFloat(c[x]);
            }
            Map.map.getView().setCenter(c);
            z = (a[0].zoom)?a[0].zoom:((c.length==2)?10:null);
        }
        if (z) {
            Map.map.getView().setZoom(z);
        }
    };
    go = goCoords;
    Map.events.updateOverlays = updateOverlays;
    setBase = setBaseLayer;
    setCapa = updateParams;
    enciende = mappingTree.update;
    markers = mappingMarkers.event;
    measure = mappingFetures.enable;
    return {
	    init:init,
        base:{
            set:setBaseLayer,
        },
        overlay:{
            update:mappingTree.update
        },
        markers:{
            event:mappingMarkers.event
        },
        setOpacity:setOpacity,
        goCoords:goCoords,
        measure:{
            enable:mappingFetures.enable
        }
    };
    
});