import React, { Component } from 'react';
import WebMapView from '../components/WebMapView';
import Legend from '../components/Legend';

class MapContainer extends Component {
    constructor() {
        super();
        this.state = { area: '' }
    }

    changeLegendValues = (area) => {
        this.setState({ area })
    }

    render() {
        return (
            <div>
                <WebMapView area={2} changeLegendValues={this.props.changeLegendValues} />
                <Legend area={this.state.area} />
            </div>
        )
    }
}

export default MapContainer;