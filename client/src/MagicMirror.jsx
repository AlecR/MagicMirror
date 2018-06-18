import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropTargetLayer from './DropTargetLayer';
import PopoutDragLayer from './modules/Popout/PopoutDragLayer';
import Dashboard from './modules/Dashboard/Dashboard';
import ModuleIndex from './config.json';
import { refreshIndex } from './lib/ModuleIndex';

export const RegisterPopoutContext = React.createContext()

class MagicMirror extends Component {

  state = {
    mirrorModules: [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
    ],
    popouts: [],
    moduleIndex: ModuleIndex
  }

  componentWillMount() {
    refreshIndex()
    const mirrorModules = [...this.state.mirrorModules];
    this.state.moduleIndex.forEach(module => {
      if(module.position !== null){
        mirrorModules[module.position] = require(`${module.componentFile}`).default
      }
    })
    this.setState({ mirrorModules })
  }

  havePropsUpdated = (currentModule, newModule) => {
    const currentChildren = currentModule.props.children;
    const newChildren = newModule.props.children;

    var currentProps = currentModule.props;
    var newProps = newModule.props;

    var currentKeys = Object.keys(currentProps);
    var newKeys = Object.keys(newProps);

    if(currentChildren){
      currentProps = {...currentProps, ...currentChildren.props};
      const childKeys = Object.keys(currentChildren.props);
      currentKeys = [...currentKeys, ...childKeys];
    }

    if(newChildren){
      newProps = {...newProps, ...newChildren.props};
      const childKeys = Object.keys(newChildren.props);
      newKeys = [...newKeys, ...childKeys];
    }

    if(currentKeys.length !== newKeys.length) {
      return true;
    }

    for (var index = 0; index < currentKeys.length; index++) {
      const propKey = currentKeys[index];
      const currentPropValue = currentProps[propKey];
      const newPropValue = newProps[propKey];
      if(propKey !== 'children' &&  currentPropValue !== newPropValue) {
        return true;
      }
    }
    return false;
  }

  registerPopout = (ref) => {
    if(!ref) { return }
    for (var index = 0; index < this.state.popouts.length; index++) {
      const popout = this.state.popouts[index];
      if(popout.props.id === ref.props.id) {
        if(this.havePropsUpdated(popout, ref)) {
          const updatedPopouts = [
            ...this.state.popouts.slice(0, index), 
            ref, 
            ...this.state.popouts.slice(index+1)
          ]
          this.setState({ popouts: updatedPopouts })
          return
        } else {
          return
        }
      }
    }
    this.setState({ popouts: [...this.state.popouts, ref]});
  }

  render() {
    return (
      <div 
        className='wrapper'
        style={{
          display: 'block',
          height: '100%',
          width: '100%'
        }}
      >
        <DropTargetLayer>
          <RegisterPopoutContext.Provider value={this.registerPopout}>
            <Dashboard 
              modules={this.state.mirrorModules}
            />
          </RegisterPopoutContext.Provider>
        </ DropTargetLayer>
        <PopoutDragLayer
          popouts={this.state.popouts}
        />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(MagicMirror);