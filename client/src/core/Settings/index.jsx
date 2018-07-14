import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Module from 'core/Module';
import { SERVER_URL } from 'lib/constants';
import SettingsPopout from './SettingsPopout';
import './Settings.css';

export default class Settings extends Component {
  state = {
    editMode: false,
    selectedTableModuleName: null,
    selectedMirrorPosition: null,
  }

  updateModulePositions = (moduleConfig) => {
    const modulePositions = this.state.modulePositions.slice();
    moduleConfig.forEach(module => {
      if(module.position){
        modulePositions[module.position] = module.name
      }
    })
    this.setState({ modulePositions })
  }

  updateSelectedMirrorPosition = (position) => {
    var selectedTableModuleName = null;
    const selectedMirrorPosition = position;
    const editMode = position != null;
    this.state.modules.forEach(module => {
      if(module.position === position) {
        selectedTableModuleName = module.name;
      }
    });
    this.setState({ selectedMirrorPosition, selectedTableModuleName, editMode });
  }

  updateSelectedTableModule = (changeEvent) => {
    const mirrorPosition = parseInt(changeEvent.target.dataset.mirrorPosition, 10);
    const selectedTableModuleName = changeEvent.target.value;
    const modules = this.state.modules;

    modules.forEach(module => {
      if(module.position === mirrorPosition
         && module.name  !== selectedTableModuleName) {
        module.position = null;
      }

      if(module.name  === selectedTableModuleName){
        module.position = mirrorPosition;
      }
    })

    this.setState({ selectedTableModuleName, modules });
  }

  saveUpdatedConfig = () => {
    const requestURL = `${SERVER_URL}/api/mirror/config`
    fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.modules)
    }).then((res) => {
      console.log(res);
    })
  }

  render() {
    return (
      <Module 
        name='settings'
        popoutHeight={1200}
        popoutWidth={1000}
        popoutView={<SettingsPopout />}
      >
        <div className='settings'> 
          <FontAwesome
            name='cog'
            className='cog'
            size='2x'
          />
        </div>
      </Module>  
    )
  }
}