import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default class DraggablePopout extends Component {
  render() {
    console.log(this.props.position);
    return (
      <Draggable>
        <div style={this.props.styles}>
          {this.props.children}
        </div>
      </Draggable>
    )
  }
}
