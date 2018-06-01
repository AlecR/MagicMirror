import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropTargetLayer from './DropTargetLayer';
import PopOutDragLayer from './modules/popout/PopOutDragLayer';
import Dashboard from './Dashboard';

class Container extends Component {

  state = {
    popOuts: []
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
          <Dashboard />
        </ DropTargetLayer>
        <PopOutDragLayer />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Container);