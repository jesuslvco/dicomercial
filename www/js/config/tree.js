define(function() {
    var data = {
        themes:{
                T1:{
                        label:'Prueba',
                        layers:[
                             'c100' 
                        ],
                        desc:'Prueba',
                        img:'prueba.jpg',
                        name:'prueba'
                }
        },
        bases:{
                B1:{
                    type:'Wms',
                    label:'Topogr&aacute;fico sin sombreado - INEGI',
                    img:'mapa_sin_sombreado.jpg',		             
                    url:['http://10.152.11.41:8200/mdmCache/service/wms?'],
                    layer:'MapaBaseTopograficov61_sinsombreado',
                    rights:'Derechos Reservados &copy; INEGI',
                    tiled:true,
                    legendlayer:['c100','c101','c102','c102-r','c102m','c103','c109','c110','c111','c112','c200','c201','c202','c203','c206','c300','c301','c302','c310','c311','c762','c793','c795'],
                    desc:'REPRESENTACION DE RECURSOS NATURALES Y CULTURALES DEL TERRITORIO NACIONAL A ESCALA 1: 250 000, BASADO EN IMAGENES DE SATELITE DEL  2002 Y TRABAJO DE CAMPO REALIZADO EN 2003',
                    clasification:'VECTORIAL',
                    visible:true
              },
               B2:{
                    type:'Wms',
                    label:'Topogr&aacute;fico gris - INEGI ',
                    img:'mapa_gris.jpg',		             
                    url:['http://gaiamapas1.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas3.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas2.inegi.org.mx/mdmCache/service/wms?'],
                    layer:'MapaBaseTopograficov61_sinsombreado_gris', 
                    rights:'Derechos Reservados &copy; INEGI',
                    tiled:true,
                    legendlayer:['c100','c101','c102','c102m','c103','c109','c110','c112','c200','c202','c203','c300','c301','c302','c310','c311','c793','c795'],
                    legendUrl:'http://10.152.11.41:82/cgi-bin/ms62/mapserv?map=/opt/map/mdm60/mdm61leyendaprueba_gris.map&Request=GetLegendGraphic&format=image/png&Version=1.1.1&Service=WMS&LAYER=',
                    desc:'REPRESENTACION DE RECURSOS NATURALES Y CULTURALES DEL TERRITORIO NACIONAL A ESCALA 1: 250 000, BASADO EN IMAGENES DE SATELITE DEL  2002 Y TRABAJO DE CAMPO REALIZADO EN 2003',
                    clasification:'VECTORIAL',
                    visible:false
              },
              B3:{
                    type:'Wms',
                    label:'Topogr&aacute;fico con sombreado - INEGI',
                    img:'mapa_con_sombreado.jpg',		             
                    url:['http://gaiamapas1.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas3.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas2.inegi.org.mx/mdmCache/service/wms?'],
                    layer:'MapaBaseTopograficov61_consombreado',
                    rights:'Derechos Reservados &copy; INEGI',
                    tiled:true,
                    legendlayer:['c100','c101','c102','c102-r','c102m','c103','c109','c110','c111','c112','c200','c201','c202','c203','c206','c300','c301','c302','c310','c311','c762','c793','c795'],
                    desc:'REPRESENTACION DE RECURSOS NATURALES Y CULTURALES DEL TERRITORIO NACIONAL A ESCALA 1: 250 000, BASADO EN IMAGENES DE SATELITE DEL  2002 Y TRABAJO DE CAMPO REALIZADO EN 2003',
                    clasification:'VECTORIAL',
                    visible:false
              },
              B4:{
                    type:'Wms',
                    label:'Hipsogr&aacute;fico - INEGI',
                    img:'baseHipsografico.jpg',		             
                    url:['http://gaiamapas1.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas3.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas2.inegi.org.mx/mdmCache/service/wms?'],
                    layer:'MapaBaseHipsografico',
                    rights:'&copy; INEGI 2013',
                    tiled:true,
                    legendlayer:['img_altimetria.png'],
                    desc:'IMAGEN DE RELIEVE QUE MUESTRA UNA COMBINACION DE ELEVACION A TRAVES DE COLORES HIPSOGRAFICOS, GENERADA POR PROCESAMIENTO DEL CONTINUO DE ELEVACIONES MEXICANOS DE 3.0 DE 15 METROS.',
                    clasification:'RASTER',
                    visible:false
              },
              B5:{
                    type:'Wms',
                    label:'Ortofotos - INEGI',
                    img:'baseOrtos.jpg',		             
                    url:['http://gaiamapas1.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas3.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas2.inegi.org.mx/mdmCache/service/wms?'],
                    layer:'MapaBaseOrtofoto',
                    rights:'&copy; INEGI 2013',
                    tiled:true,
                    desc:'CONJUNTO DE IMAGENES AEREAS ORTORECTIFICADAS A DIVERSAS ESCALAS Y RESOLUCIONES, PROVENIENTES DEL ACERVO DE ORTOFOTOS DE INEGI Y QUE CORRESPONDEN A TOMAS REALIZADAS EN EL LAPSO 2005-2012.',
                    clasification:'RASTER',
                    visible:false
                  },		
               B6:{
                    type:'Wms',
                    label:'ICDS - INEGI',
                    img:'baseICDS.jpg',		             
                    //url:['http://gaiamapas1.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas3.inegi.org.mx/mdmCache/service/wms?','http://gaiamapas2.inegi.org.mx/mdmCache/service/wms?'],
                    url:['http://10.152.11.19:82/mdmCache/service/wms?'],
                    layer:'ICDS',
                    rights:'&copy; INEGI 2017',
                    tiled:true,
                    desc:'CONJUNTO DE IMAGENES CARTOGÁFICAS DIGITALES DE LA CARTAS TOPOGRÁFICAS ESCALA 1:50,000',
                    clasification:'RASTER',
                    visible:false
                  },		
              B7:{
                    type:'Osm',
                    label:'Open Street Map',
                    img:'Osm.jpg',
                    rights:'&copy; OpenStreetMap contributors',
                    clasification:'VECTORIAL',
                    visible:false
              },
              B5:{
                    type:'Bing',
                    label:'Bing maps',
                    img:'Bing.jpg',
                    key:'At-Y-dJe-yHOoSMPmSuTJD5rRE_oltqeTmSYpMrLLYv-ni4moE-Fe1y8OWiNwZVT',
                    layer:'Aerial',
                    rights:'&copy; Bing Maps',
                    clasification:'RASTER',
                    visible:false
              },
              B8:{
                    type:'Google',
                    label:'Google Sat&eacute;lite',
                    img:'Google.jpg',
                    layer:'google.maps.MapTypeId.SATELLITE',
                    rights:'&copy; Google', 
                    clasification:'RASTER',
                    visible:false
              }, 
              B9:{
                    type:'Esri',
                    label:'Esri map',
                    img:'Esri.jpg',
                    url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
                    rights:'&copy; ESRI',
                    clasification:'VECTORIAL',
                    visible:false
              },
              B10:{
                    type:'Wms',
                    label:'Topográfico gris INE-INEGI',
                    img:'mapa_gris.jpg',		             
                    url:['http://10.152.11.41:8200/mdmCache/service/wms?'],
                    layer:'MapaBase_geoelectoral_sl',
                    rights:'&copy; INEGI 2017',
                    tiled:true,
                    desc:'CONJUNTO DE IMAGENES CARTOGÁFICAS DIGITALES DE LA CARTAS TOPOGRÁFICAS ESCALA 1:50,000',
                    clasification:'VECTORIAL',
                    visible:false
              }
        },
		overlays:{
                groups:{
                        G1:{
                                label:'L&iacute;mites del Marco Geoestad&iacute;stico Nacional 2016',
                                thematicLink:'http://www.inegi.org.mx/geo/contenidos/geoestadistica/default.aspx',
                                layers:{
                                    c100:{
                                        label:'Estatales',
                                        synonymous:['estado','estatales'],
                                        scale:1,
                                        position:52,
                                        active:false,
                                        texts:{
                                            scale:1,
                                            active:false
                                        }
                                    },
                                    c101:{
                                        label:'Municipales',
                                        synonymous:['municipio','municipales','municipal'],
                                        scale:5,
                                        position:51,
                                        active:false,
                                        texts:{
                                            scale:1,
                                            active:false
                                        }
                                    },
                                    c109:{
                                        label:'AGEB urbanas',
                                        synonymous:['ageb','urbana'],
                                        scale:7,
                                        position:53,
                                        active:false,
                                        texts:{
                                            scale:1,
                                            active:false
                                        }
                                    },
                                    c108:{
                                        label:'AGEB rurales',
                                        synonymous:['ageb','rurales'],
                                        scale:7,
                                        position:40,
                                        active:false,
                                        texts:{
                                            scale:1,
                                            active:false
                                        }
                                    }
                                }
                            },
                        G1:{
                                label:'Malla Cartográfica para el Sector Hidrocarburos',
                                layers:{
                                    cmallasener:{
                                        label:'Malla Cartográfica para el Sector Hidrocarburos',
                                        synonymous:['mallas','sener'],
                                        scale:1,
                                        position:60,
                                        active:false,
                                        texts:{
                                            scale:1,
                                            active:false
                                        }
                                    }
                                }
                        }
            }
        }
    };
    return data;
});