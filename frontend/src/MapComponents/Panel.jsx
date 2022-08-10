import React from "react";
// importing collapsepanel from ant design
import { Collapse } from "antd";

//importing tree from reactgeo
import { LayerTree } from "@terrestris/react-geo";
//openlayer map
import { MapLayer, midstreamlayers, oilgaslayersgroup } from "./MapLayer";

const { Panel } = Collapse;
/**
 * Collapse panel on the right side of the maps page
 * @returns panel component with internal components
 */
function CollapsePanel() {
    return (
      <Collapse
        accordion
        style={{ position: "absolute", right: 10, top: 90, width: 250}}
        defaultActiveKey={["1"]}
        theme="dark"
      >
        <Panel header="Layers" key="1">
          <span className="layersgroup">Oil and gas layers</span>
          <LayerTree
                layerGroup={oilgaslayersgroup}
                //connecting layertree to the map
                map={MapLayer}
                //hiding unnecessary layers 
                filterFunction={(layer) =>
                    layer.get("name") != "react-geo_measure" &&
                    layer.get("name") != "react-geo_geolocationlayer"
            }
            />
            {
              JSON.parse(localStorage.getItem('userData')).role == 'admin' ? (
                <div>
                  <span className="layersgroup">Gas transportation objects</span>
                  <LayerTree
                      layerGroup={midstreamlayers}
                      //connecting layertree to the map
                      map={MapLayer}
                      //hiding unnecessary layers 
                      filterFunction={(layer) =>
                          layer.get("name") != "react-geo_measure" &&
                          layer.get("name") != "react-geo_geolocationlayer"
                  }
                  />
                </div>
                
              ) : <div></div>
            }
            
        </Panel>
        <Panel header="Legend" key="2" height={200}>
          <div className="legend">
            <span>Fields</span>
            <img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&legend_options=fontColor:000000;&TRANSPARENT=true&LAYER=geoportal:fields" />
         
            <span>Station</span>
            <img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&legend_options=fontColor:000000;&TRANSPARENT=true&LAYER=geoportal:bcs" />

            {
              JSON.parse(localStorage.getItem('userData')).role == 'admin' ? (
                <>
                  <span>Pipelines</span>
                  <img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&legend_options=fontColor:000000;&TRANSPARENT=true&LAYER=geoportal:pipeline" />
              
                  <span>Blocks</span>
                  <img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&legend_options=fontColor:000000;&TRANSPARENT=true&LAYER=geoportal:invest_block" />
                </>              
              ) : <div></div>
            }
          </div>
          
        </Panel>
        <Panel header="Features" key="3"></Panel>
      </Collapse>
    );
}

export { CollapsePanel };