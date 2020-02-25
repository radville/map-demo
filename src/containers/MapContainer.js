import React, { Component } from 'react';
import WebMapView from './components/WebMapView';
import Legend from './components/Legend';

class MapContainer extends Component {
    constructor() {
        this.state = { area: '' }
    }

    function changeLegendValues = (area) => {
        this.setState({ area })
    }

    render() {
        <div>
            <WebMapView changeLegendValues={this.changeLegendValues} />
            <Legend area={this.state.area} />
        </div>
    }
}