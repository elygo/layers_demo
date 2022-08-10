import React from "react";
import "antd/dist/antd.less";
import { Tooltip } from "antd";

//components from terrestris reactgeo
import {
  Toolbar,
  SimpleButton,
  ZoomButton,
  GeoLocationButton,
  ZoomToExtentButton,
  MeasureButton
} from "@terrestris/react-geo";

//openlayers map
import { MapLayer } from "./MapLayer";

//icons
import {
  FaMapMarkerAlt,
  FaMinus,
  FaPlus,
  FaExpandArrowsAlt,
  FaIndent,
  FaGreaterThan,
  FaVectorSquare,
  FaRulerCombined,
  FaRulerHorizontal
} from "react-icons/fa";

/**
 * Toolbar component containing button on the left side of the page
 * @param {panel state} param0 
 * @returns toolbar component
 */
function Toolbarleft({ visible, setVisible}) {
    //updates map when zoomed in or out
    const toggleUpdate = () => {
        MapLayer.updateSize();
    };
    //panel visibility function
    const showPanel = () => {
        setVisible(!visible);
    };
      
    return (
       <div>
        <Toolbar
            alignment="vertical"
            style={{ position: "absolute", left: 10, top: 90 }}
        > 
            <ZoomButton 
                //zoom in button
                map={MapLayer} shape="circle">
                <FaPlus onClick={toggleUpdate}/>
                <Tooltip placement="right" title="Zoom in" />
            </ZoomButton>
            
            <ZoomButton 
                // zoom out 
                map={MapLayer} shape="circle" delta={-1}>
                <FaMinus onClick={toggleUpdate}/>
            </ZoomButton>

            <ZoomToExtentButton
                // zoom to extent
                map={MapLayer}
                extent={[6818948, 4284461, 7973685, 5829060]}
                shape="circle"
            >
                <FaExpandArrowsAlt />
            </ZoomToExtentButton>

            <Tooltip placement="left" title="Measure a distance">
                <MeasureButton
                    //measure button
                    name="line"
                    map={MapLayer}
                    measureType="line"
                    shape="circle"
                >
                    <FaRulerHorizontal />
                </MeasureButton>
            </Tooltip>

            <Tooltip placement="left" title="Measure distances">
                <MeasureButton
                    //measure lines with steps 
                    name="steps"
                    map={MapLayer}
                    measureType="line"
                    showMeasureInfoOnClickedPoints
                    shape="circle"
                >
                    <FaRulerCombined />
                </MeasureButton>
            </Tooltip>

            <Tooltip placement="left" title="Measure an area">
                <MeasureButton
                    // measure area 
                    name="poly"
                    map={MapLayer}
                    measureType="polygon"
                    shape="circle"
                >
                    <FaVectorSquare />
                </MeasureButton>
            </Tooltip>

            <Tooltip placement="left" title="Measure an angle">
                <MeasureButton
                    // measure angle
                    name="angle"
                    map={MapLayer}
                    measureType="angle"
                    shape="circle"
                >
                <FaGreaterThan />
                </MeasureButton>
            </Tooltip>
            
            <Tooltip placement="left" title="Geolocation">
                <GeoLocationButton
                    //find my location 
                    onGeolocationChange={() => undefined}
                    map={MapLayer}
                    showMarker={true}
                    follow={true}
                    shape="circle"
                >
                    <FaMapMarkerAlt />
                </GeoLocationButton>
            </Tooltip>

            <Tooltip placement="left" title="Sidebar">
                <SimpleButton
                    //show panel
                    shape="circle"
                    onClick={showPanel}
                >
                    <FaIndent />
                </SimpleButton>
            </Tooltip>
        </Toolbar>
      </div>
    );
}

export { Toolbarleft };