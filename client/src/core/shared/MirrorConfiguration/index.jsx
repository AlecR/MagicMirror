import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MirrorConfig from 'config.json';
import MirrorGrid from 'core/shared/MirrorGrid';
import ModuleTable from 'core/shared/ModuleTable';
import { SERVER_URL } from 'lib/constants';
import './MirrorConfiguration.css';

export default class MirrorConfiguration extends Component {

  state = {
    modules: MirrorConfig.modules,
    selectedModuleIndex: null,
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

  updateMirrorConfiguration = (selectedPosition) => {
    if(this.state.selectedModuleIndex === null) return;
    const modules = this.state.modules;
    modules.forEach(module => {
      if(module.position === selectedPosition
         && modules.indexOf(module)  !== this.state.selectedModuleIndex) {
        module.position = null;
      }
    })
    modules[this.state.selectedModuleIndex].position = selectedPosition; 
    const selectedModuleIndex = null;
    const selectedMirrorPosition = null
    
    this.setState({ modules, selectedMirrorPosition, selectedModuleIndex });
  }

  updateSelectedTableModuleIndex = (changeEvent) => {
    const selectedModuleIndex = parseInt(changeEvent.target.dataset.moduleIndex, 10);
    this.setState({ selectedModuleIndex });
  }

  saveUpdatedConfig = () => {
    const requestURL = `${SERVER_URL}/api/mirror/config`
    const config = MirrorConfig
    config.modules = this.state.modules
    config.setupComplete = true
    fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    }).then((res) => {
      if(res.status === 200) {
        this.props.onSaveSuccess()
      }
    })
  }

  getStyles = () => {
    return {
      display: "flex",
      flexDirection: (this.props.horizontal ? "row" : "column"),
      height: "100%",
      width: "100%",
    }
  }

  render() {
    return (
      <div 
        className='mirror-configuration'
        style={this.getStyles()}
      >
        <div className='mirror-configuration-grid'>
          <MirrorGrid 
            modules={this.state.modules}
            onMirrorModuleClick={this.updateMirrorConfiguration}
            selectedModuleIndex={this.state.selectedModuleIndex}
            selectedMirrorPosition={this.state.selectedTableModuleName}
          />
        </div>
        <div className='mirror-configuration-table'>
          <ModuleTable 
            modules={this.state.modules}
            onModuleCellClick={this.updateSelectedTableModuleIndex}
            selectedModuleIndex={this.state.selectedModuleIndex}
            onButtonClick={this.saveUpdatedConfig}
          />
        </div> 
      </div>
    )
  } 
}

MirrorConfiguration.propTypes = {
  onSaveSuccess: PropTypes.func.isRequired,
};