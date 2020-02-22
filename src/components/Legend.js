import React from 'react';

const Legend = () => {
    return (
        <div id="info" className="esriSimpleSlider">
            <h4>Calculate Nominal Power</h4>
            Draw a polygon over the area where you would like your solar installation.
            <br /><br />
            <span className="label">Area:</span> <span id="area"></span>
            <br />
            <span className="label">Nominal Power:</span> <span id="power"></span>
        </div>
    );
}

export default Legend;