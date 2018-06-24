import React from 'react';
import './SmartLights.css';

const SmartLight = (props) => (
  <div
    className='smart-light'
  >
    <div className='smart-light-name'>{props.name}</div>
    <div 
      className={'smart-light-button ' + (props.on ? "on" : null)}
      onClick={() => props.onLightClick(props.lightId, !props.on)}
    ></div>
  </div> 
)

export default SmartLight;