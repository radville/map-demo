// Adapted from ArcGIS tutorials, including:
// "Using the ArcGIS API for JavaScript with React"
// found here: https://developers.arcgis.com/javascript/latest/guide/react/
// and "Draw Graphics" at https://developers.arcgis.com/labs/javascript/draw-graphics/

import React from 'react';
import { loadModules } from 'esri-loader';

export class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.props.changeLegendValues)

    // lazy load the required ArcGIS API for JavaScript modules and CSS
    let me = this.props
    loadModules(['esri/Map', 
      'esri/views/MapView', 
      'esri/widgets/Search',
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch",
      "esri/geometry/geometryEngine"], { css: true })
    .then(([ArcGISMap, MapView, Search, GraphicsLayer, Sketch, geometryEngine]) => {
      console.log(me)
      // create map
      const map = new ArcGISMap({
        basemap: 'topo-vector'
      });

      // add map view
      let view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-100, 38],
        zoom: 4
      });
      
      // add searchbar 
      let search = new Search({
        view: view
      });
      view.ui.add(search, "top-right");

      // add graphics layer to be used by sketch toolbar
      let graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer)

      // Add the Sketch toolbar to draw polygons
      let sketch = new Sketch({
        view: view,
        layer: graphicsLayer,
        availableCreateTools: ["polyline", "polygon", "rectangle"],
      })

      // add sketch toolbar to top corner
      view.ui.add(sketch, "top-left")

      // when polygon is created, calculate area
      sketch.on("create", function(event) {
        if (event.state === "complete") {
          let geometry = event.graphic.geometry.extent

          // area in square meters, accounts for curve of Earth, rounded to nearest number
          let area = geometryEngine.geodesicArea(geometry, 109404)

          // add values to legend
          console.log(this.props)
          this.props.changeLegendValues(area)
        }       
      }.bind(this));
      
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