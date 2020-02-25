import React, { Component } from 'react';
import WebMapView from './components/WebMapView';
import Legend from './components/Legend';

class MapContainer extends Component {
    function changeLegendValues = (area) => {
        this.setState({ area })
    }

    render() {
        <div>
            <WebMapView />
            <Legend />
        </div>
    }
}