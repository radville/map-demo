import React from 'react';

const Legend = (props) => {
    return (
        <div id="info" className="esriSimpleSlider">
            <h4>Calculate Area</h4>
            Draw a polygon over the area you would like to measure.
            <br /><br />
            <span className="label">Area:</span> {props.area} <span id="area"></span>
        </div>
    );
}

export default Legend;