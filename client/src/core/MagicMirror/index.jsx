import React, { Component } from 'react';
import Dashboard from 'core/Dashboard';
import ModuleIndex from 'config.json';
import { refreshIndex } from 'lib/ModuleIndex';

export default class MagicMirror extends Component {

  state = {
    mirrorModules: [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
    ],
    moduleIndex: ModuleIndex
  }

  componentWillMount() {
    refreshIndex()
    const mirrorModules = [...this.state.mirrorModules];
    this.state.moduleIndex.forEach(module => {
      if(module.position !== null) {
        console.log(`modules/${module.name}`);
        mirrorModules[module.position] = require(`modules/${module.name}`).default
      }
    })
    this.setState({ mirrorModules })
  }

  render() {
    return (
      <div 
        style={{
          height: '100%',
          width: '100%'
        }}
      > 
        <Dashboard 
          modules={this.state.mirrorModules}
        />
      </div>
    )
  }
}