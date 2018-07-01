import React, { Component } from 'react';
import Dashboard from './modules/Dashboard/Dashboard';
import ModuleIndex from './config.json';
import { refreshIndex } from './lib/ModuleIndex';

class MagicMirror extends Component {

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
        mirrorModules[module.position] = require(`${module.componentFile}`).default
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

export default MagicMirror;