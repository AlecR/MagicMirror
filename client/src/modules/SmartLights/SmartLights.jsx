import React, { Component } from 'react';
import Module from '../Module/Module';
import SmartLightsHelper from './SmartLightsHelper';
import Room from './Room';

import './SmartLights.css';

export default class SmartLights extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    }
    SmartLightsHelper.getRooms(response => {
      const rooms = response;
      SmartLightsHelper.getAllLights(response => {
        const lights = response;
        const roomLightData = rooms.map(room => {
          const roomLights = room.lights.map(lightId => {
            return lights[lightId]
          });
          return {
            name: room.name,
            lights: roomLights
          };
        })
        this.setState({rooms: roomLightData})
      })
    });
  };

  toggleLightState = (id) => {
    const rooms = this.state.rooms;
    rooms.forEach(room => {
      room.lights.forEach(light => {
        if(light.lightId === id) {
          light.on = !light.on;
        }
      })
    })
    this.setState(rooms);
  }

  toggleLight = (id, on) => {
    SmartLightsHelper.toggleLight(id, on, response => {
      if(response.length > 0 && response[0].success){
        this.toggleLightState(id);
      }
    });
  }

  render() {    
    return(
      <Module
        name='SmartLights'
        popoutHeight={600}
        popoutWidth={600}
      >
        <div className='smart-lights'>
          {
            this.state.rooms.map(roomData => (
              <Room 
                key={roomData.name}
                lights={roomData.lights}
                name={roomData.name}
                onLightClick={this.toggleLight}
              />
            ))
          }
        </div>
      </Module>
    )
  }
}