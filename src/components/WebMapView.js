// Adapted from ArcGIS tutorials, including:
// "Using the ArcGIS API for JavaScript with React"
// found here: https://developers.arcgis.com/javascript/latest/guide/react/
// and "Draw Graphics" at https://developers.arcgis.com/labs/javascript/draw-graphics/

import React from 'react';
import { loadModules } from 'esri-loader';

export class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    // React.createRef() gets a reference to the rendered DOM element to assign to the View
    this.mapRef = React.createRef();
  }

  componentDidMount() {

    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 
      'esri/views/MapView', 
      'esri/widgets/Search',
      'esri/widgets/AreaMeasurement2D'], { css: true })
    .then(([ArcGISMap, MapView, Search, AreaMeasurement2D]) => {
      // create map
      const map = new ArcGISMap({
        basemap: 'topo-vector'
      });


      // add map view
      const view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-72, 42],
        zoom: 7
      });
      
      // add searchbar 
      let search = new Search({
        view: view
      });
      view.ui.add(search, "top-right");

      // add area measurement tool
      let measurementWidget = new AreaMeasurement2D({
        view:view
      })
      view.ui.add(measurementWidget, "bottom-left");
      
    });
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  render() {
    return (
     <div className="webmap esri" ref={this.mapRef} />      
    )
  }
};

export default WebMapView;