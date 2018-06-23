import React, { Component } from 'react';
import SmartLight from './SmartLight';
import SmartLightsHelper from './SmartLightsHelper'
import './SmartLights.css';

const Room = (props) => (
  <div className='room'>
    <div className='room-name'>{props.name}</div>
    <div className='room-lights'>
      {
        props.lights.map(light => {
          return(
            <SmartLight
              key={light.name}
              name={light.name}
              lightId={light.lightId}
              on={light.on}
              onLightClick={props.onLightClick}
            />
          )
        })
      }
    </div>
  </div>  
)

export default Room;