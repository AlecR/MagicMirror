import React, { Component } from 'react';
import Setup from 'core/Onboarding/Setup';
import LaunchScreen from 'core/Onboarding/LaunchScreen';
import Dashboard from 'core/Dashboard';
import MirrorConfig from 'config.json';
import { BrowserRouter, Route } from 'react-router-dom';
import { refreshIndex } from 'lib/ModuleIndex';
import './MagicMirror.css'

export default class MagicMirror extends Component {

  state = {
    mirrorModules: [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
    ],
    moduleIndex: MirrorConfig.modules
  }

  componentWillMount() {
    console.log(MirrorConfig.modules);
    refreshIndex()
    const mirrorModules = [...this.state.mirrorModules];
    this.state.moduleIndex.forEach(module => {
      if(module.position !== null) {
        mirrorModules[module.position] = require(`modules/${module.name}`).default
      }
    })
    this.setState({ mirrorModules });
  }

  render() {
    return (
      <div 
        style={{
          height: '100%',
          width: '100%'
        }}
      > 
        <BrowserRouter>
          <div className='routes'>
            <Route path='/dashboard' render={() => (
              <Dashboard 
                modules={this.state.mirrorModules}
              />
            )} />
            <Route path='/onboarding/welcome' component={LaunchScreen} />
            <Route path='/onboarding/setup' component={Setup} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}