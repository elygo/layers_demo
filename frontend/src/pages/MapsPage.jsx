import React, { useState } from 'react';
//import layers, toolbar, layerswitcher, panel
import { MapLayer } from '../MapComponents/MapLayer';
import { Toolbarleft } from '../MapComponents/Toolbarleft';
import { LayersSwitch } from '../MapComponents/LayersSwitch';
import { CollapsePanel } from '../MapComponents/Panel';
//map rendering component from terrestris
import {
  MapComponent
} from '@terrestris/react-geo';

/**
 * Map and its components containing page
 * @returns A map content with map in it
 */
function MapsPage() {
    //when user clicks a button panel will be invisible
    const [visible, setVisible] = useState(true);
    return (
        <div className="wrapper">
          <MapComponent map={MapLayer} />
          <Toolbarleft visible={visible} setVisible={setVisible}/>
          { visible ? <CollapsePanel /> : <div></div>}
          <LayersSwitch />
        </div>
    )
}

export default MapsPage;
