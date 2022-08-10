// openlayers' components
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceTileWMS from 'ol/source/TileWMS';
import OlLayerGroup from 'ol/layer/Group';
import OlLayerImage from 'ol/layer/Image';
import OlSourceImageWMS from 'ol/source/ImageWMS';
import { Attribution, ScaleLine,  defaults as defaultControls } from 'ol/control';
import * as olProj from 'ol/proj';

// styles
import '../App.css';
import 'ol/ol.css';
import 'antd/dist/antd.min.css';
import '../styles/react-geo.css';

// openstreetmap
// openlayers tile with WMS url
const osm = new OlLayerTile({
    source: new OlSourceTileWMS({
        url: 'https://ows.terrestris.de/osm/service?',  //satellite layer
        params: {'LAYERS': 'OSM-WMS'}
    }),
    name: 'OSM',
    isBaseLayer: true,
    visible: true,
    zIndex: -1
});

// satellite WMS map
const satellite = new OlLayerTile({
    source: new OlSourceTileWMS({
        url: 'https://tiles.maps.eox.at/wms?',  //satellite layer
        params: {'LAYERS': 's2cloudless-2018_3857'}
    }),
    attribution: 'eox.at',
    projection: "EPSG:3857",
    isBaseLayer: true,
    visible: true,
    zIndex: -2,
    name: 'Satellite'
});

// topographic osm WMS map 
const topographic = new OlLayerTile({
    source: new OlSourceTileWMS({
        url: 'https://ows.terrestris.de/osm/service?',  //satellite layer
        params: {'LAYERS': 'TOPO-OSM-WMS'}
    }),
    projection: "EPSG:3857",
    isBaseLayer: true,
    visible: true,
    zIndex: -2,
    name: 'Topo-OSM'
});

//baselayers
const baselayergroup = new OlLayerGroup({
    name: 'Baselayers',
    layers: [osm, satellite, topographic],
    visible: true
});

// blocks layer imported from geoserver
const blocks = new OlLayerImage({
    legendUrl: 'http://localhost:8080/geoserver/geoportal/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&legend_options=fontColor:000000;&TRANSPARENT=true&LAYER=geoportal:invest_block',
    visibility: false,
    displayInLayerSwitcher:true,
    isBaseLayer: false,
    source: new OlSourceImageWMS({
    url:'http://localhost:8080/geoserver/geoportal/wms',
    params: {'LAYERS':'geoportal:invest_block', VERSION: '1.1.1', 'TILED':true},
    serverType: 'geoserver'
    }),
    name: 'Investment blocks'
});

//fields WMS layer
const fields = new OlLayerImage({
    legendUrl: 'http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&legend_options=fontColor:000000;&TRANSPARENT=true&LAYER=geoportal:fields',
    source: new OlSourceImageWMS({
    url:'http://localhost:8080/geoserver/geoportal/wms',
    params: {'LAYERS':'geoportal:fields', VERSION: '1.1.1', 'TILED':true},
    serverType: 'geoserver'
    }),
    name: 'Fields'
});

//pipelines WMS layer
const pipelines = new OlLayerImage({
    legendUrl: 'http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&legend_options=fontColor:000000;&TRANSPARENT=true&LAYER=geoportal:pipeline',
    source: new OlSourceImageWMS({
    url:'http://localhost:8080/geoserver/geoportal/wms',
    params: {'LAYERS':'geoportal:pipeline', VERSION: '1.1.1', 'TILED':true}
    }),
    serverType: 'geoserver',
    visible: false,
    name: 'Pipelines'
});

// booster compressor stations 
const bcs = new OlLayerImage({
    legendUrl: 'http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&legend_options=fontColor:000000;&TRANSPARENT=true&LAYER=geoportal:bcs',
    source: new OlSourceImageWMS({
    url:'http://localhost:8080/geoserver/geoportal/wms',
    params: {'LAYERS':'geoportal:bcs', VERSION: '1.1.1', 'TILED':true}
    }),
    serverType: 'geoserver',
    visible: false,
    name: 'Compressor stations'
});

// oilgaslayers are grouped
const oilgaslayersgroup = new OlLayerGroup({
    name: 'Oil and Gas layers',
    layers: [ blocks,  fields ],
    visible: true
});

// midstream objects are grouped
const midstreamlayers = new OlLayerGroup({
    name: 'Gas transportation layers',
    layers: [ pipelines, bcs, ],
    visible: true
});

//center of the map
const MapCenter = olProj.fromLonLat([ 64.240562, 41.611081]);

//main map layer
// all layers and mapcenter are attached
const MapLayer = new OlMap({
    //custom scalebar on the left bottom part of the maps page
    controls: defaultControls({attribution: false, zoom: false}).extend([
        new Attribution({collapsible: true}), 
        new ScaleLine({
            bar: true,
            steps: 4,
            text: true,
            minWidth: 150
        })
    ]),
    view: new OlView({
        center: MapCenter,
        zoom: 5.8,
    }),
    layers: [ baselayergroup, midstreamlayers, oilgaslayersgroup ]
});

export { MapLayer, midstreamlayers, oilgaslayersgroup, baselayergroup, osm, satellite, topographic };