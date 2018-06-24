import React from 'react';
import SmartLight from './SmartLight';
import './SmartLights.css';

const Room = (props) => (
  <div className='room'>
    <div className='room-name'>{props.name}</div>
    <div className='room-lights'>
      {
        props.lightIds.map(lightId => {
          const light = props.lights[lightId];
          if(light === undefined){
            return null;
          } else {
            return(
              <SmartLight
                key={light.name}
                name={light.name}
                lightId={light.lightId}
                on={light.on}
                onLightClick={props.onLightClick}
                updateBrightness={this.updateBrightness}
              />
            )
          }
        })
      }
    </div>
  </div>  
)

export default Room;