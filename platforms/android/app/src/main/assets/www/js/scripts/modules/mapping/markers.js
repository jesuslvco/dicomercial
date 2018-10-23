define(["ol"], function(ol){
    var Markers = null;
    var reg = {};
    var label ='marker';
    var counter = 0;
    var path = 'img/markers/';
    var format = '.png';
    var getStyle = function(feature) {
        var style = new ol.style.Style({
              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 44],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: path+feature.get('image')+format
              })),
              stroke: new ol.style.Stroke({
                width: 3,
                color: [255, 0, 0, 1]
              }),
              fill: new ol.style.Fill({
                color: [0, 0, 255, 0.6]
              })
        });
        return style;
    }

    var define = function(){
        /*
        var pointFeature = new ol.Feature({
            geometry: new ol.geom.Point([-11387246.245297, 2496842.056386]),//new ol.geom.Point(ol.proj.transform([-72.0704, 46.678], 'EPSG:4326', 'EPSG:3857')),
            type:'identify',
            title:'prueba',
            content:'contenido',
            evento:'evento'
          });
        */
        var features = [];
        Markers = new ol.layer.Vector({
            source: new ol.source.Vector({
              features: features
            }),
            style: getStyle
        });
        return Markers;
    };
    var getMarker = function(a,id){
        var marker = null;
        if (reg[a.type][id]) {
            marker = reg[a.type][id];
        }
        return marker;
    };
    var getId = function(){
        counter+=1;
        return label+counter;  
    };
    var add = function(a){//{event:'add',type:'identify',items:[{image:'',lon:'',lat:'',popup:{title:'',content:'',event:''}}}]}
        var pois = [];
        var ids = [];
        for(var x in a.items){
            var i = a.items[x];
            var id =getId();
            var poi = new ol.Feature({
                geometry: new ol.geom.Point([i.lon,i.lat]),
                id:id,
                type:(a.type)?a.type:'identify',
                title:(i.popup)?((i.popup.title)?i.popup.title:''):'',
                content:(i.popup)?((i.popup.content)?i.popup.content:''):'',
                event:(i.popup)?((i.popup.event)?i.popup.event:''):'',
                image:(i.image)?i.image:a.type
            });
            pois.push(poi);
            if (!reg[a.type]) {
                reg[a.type]={};
            }
            reg[a.type][id]=poi;
            ids.push(id);
        }
        if (pois.length>0) {
            Markers.getSource().addFeatures(pois);
        }
        return ids;
    }
    var remove = function(a){//{event:'add',type:'identify',items:['id','id']} o //{event:'add',type:'identify',items:'all'}
        if ((typeof(a.items)=='string')&&(a.items=='all')) {
            if (reg[a.type]) {
                for(var x in reg[a.type]){
                    var marker = reg[a.type][x];
                    Markers.getSource().removeFeature(marker);
                }
                delete reg[a.type];
            }
        }else{
            for(var x in a.items){
                var id = a.items[x];
                var marker = getMarker(a,id);
                if (marker) {
                    Markers.getSource().removeFeature(marker);
                    if ((reg[a.type])&&(reg[a.type][id])) {
                        delete reg[a.type][id];
                    }
                }
            }
            
        }
        Markers.setVisible(false);
        Markers.setVisible(true);
    }
    var event = function(a){
        var response = null;
        switch (a.action) {
            case 'add':
                response = add(a);
                break;
            case 'remove':
                remove(a);
                break;
        }
        return response;
    }
    return {
	    get:define,
        event:event
    };
    
});



