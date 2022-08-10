import React from "react";

//reactgeo
import { LayerSwitcher } from "@terrestris/react-geo";
//layers
import { MapLayer, osm, satellite, topographic } from "./MapLayer";

/**
 * baselayers are changed with this function
 * @returns Layer switcher component
 */
function LayersSwitch() {
  return (
    <LayerSwitcher
      style={{ position: "absolute", bottom: 10, left: 10, zIndex: 2}}
      // layerswitcher is connected here
      map={MapLayer}
      // imported layers are attached
      layers={[ osm, satellite, topographic ]}
    >
    </LayerSwitcher>
  );
}

  
  export { LayersSwitch };