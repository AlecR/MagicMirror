import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropTargetLayer from './DropTargetLayer';
import PopoutDragLayer from './modules/popout/PopoutDragLayer';
import Dashboard from './modules/dashboard/Dashboard';
import ModuleIndex from './ModuleIndex';

export const RegisterPopoutContext = React.createContext()

class MagicMirror extends Component {

  state = {
    mirrorModules: [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
    ],
    popouts: [],
    availableModules: ModuleIndex
  }

  componentWillMount() {
    const mirrorModules = [...this.state.mirrorModules];
    this.state.availableModules.forEach(module => {
      if(module.position != null){
        mirrorModules[module.position] = module.module
      }
    })
    this.setState({ mirrorModules })
  }

  registerPopout = (ref) => {
    if(!ref) { return }
    var replacedRef = false
    var noChange = false
    var popouts = this.state.popouts.map(popout => {
      if(popout.props.id === ref.props.id) {
        if(popout.props.top === ref.props.top && popout.props.left === ref.props.left) {
          noChange = true
          return popout;
        } else {
          replacedRef = true;
          return ref;
        }
      } else {
        return popout;
      }
    });
    
    if(noChange) {
      return 
    } else if(replacedRef) {
      this.setState({popouts})
    } else {
      popouts = [...this.state.popouts, ref];
      this.setState({ popouts }); 
    }       
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