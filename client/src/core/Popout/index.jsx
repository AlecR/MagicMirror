import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './Popout.css';

export default class DraggablePopout extends Component {
  render() {
    return (
      <Draggable>
        <div style={this.props.styles}>
          <button 
            className='popout-close-button'
            onClick={() => this.props.onCloseClick()}
            hidden={!this.props.displayPopoutCloseButton}
          >X</button>
          {this.props.children}
        </div>
      </Draggable>
    )
  }
}
