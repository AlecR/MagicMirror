import React, { Component } from 'react';
import Module from '../Module/Module';
import SmartLightsHelper from './SmartLightsHelper';

import './SmartLights.css';

export default class SmartLights extends Component {

  render() {
    SmartLightsHelper.getRooms(response => {
      console.log(response);
    });
    return(
      <Module
        name='SmartLights'
        popoutHeight={600}
        popoutWidth={600}
      >
        <div className='smart-lights'>
          <h1>Hello World</h1>
        </div>
      </Module>
    )
  }
}