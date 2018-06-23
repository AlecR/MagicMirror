import React from 'react';
import './SmartLights.css';

const SmartLight = (props) => {
  console.log(props);
  console.log(props.on);
  return (
    <div
      className='smart-light'
    >
      <div className='smart-light-name'>{props.name}</div>
      <div>
        <div 
          className={'smart-light-button ' + (props.on ? "on" : null)}
          onClick={() => props.onLightClick(props.lightId, !props.on)}
        >
        </div>
      </div>
    </div> 
  )
}

export default SmartLight;