import React from 'react';

const Legend = (props) => {
    function returnArea() {
        if (props.area) {
            return props.area + " m^2"
        }
    }

    return (
        <div id="info" className="esriSimpleSlider">
            <h4>Calculate Area</h4>
            Draw a polygon over the area you would like to measure.
            <br /><br />
            <span className="label">Area:</span> {returnArea() }<span id="area"></span>
        </div>
    );
}

export default Legend;