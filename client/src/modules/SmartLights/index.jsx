import React, { Component } from 'react';
import Module from 'core/Module';
import SmartLightsHelper from './SmartLightsHelper';
import Room from './Room';
import './SmartLights.css';

export default class SmartLights extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      lights: {}
    }

    SmartLightsHelper.getRooms(response => {
      const rooms = response;
      this.setState({ rooms });
    })

    SmartLightsHelper.getAllLights(response => {
      const lights = response;
      this.setState({ lights });
    })
  };

  toggleLightState = (id) => {
    const lights = this.state.lights;
    lights[id].on = !lights[id].on;
    this.setState({lights});
  };

  toggleLight = (id, on) => {
    SmartLightsHelper.toggleLight(id, on, response => {
      if(response.length > 0 && response[0].success){
        this.toggleLightState(id);
      }
    });
  };

  updateBrightness = (id, brightness) => {
    const lights = this.state.lights;
    lights[id].brightness = brightness;
    this.setState({ lights })
  }

  render() {    
    return(
      <Module
        name='SmartLights'
      >
        <div className='smart-lights'>
          {
            this.state.rooms.map(room => (
              <Room 
                key={room.name}
                lights={this.state.lights}
                lightIds={room.lights}
                name={room.name}
                onLightClick={this.toggleLight}
                updateBrightness={this.updateBrightness}
              />
            ))
          }
        </div>
      </Module>
    )
  }
}