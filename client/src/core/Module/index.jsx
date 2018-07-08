import React from 'react';
import DraggablePopout from 'core/Popout';

import './Module.css'


class Module extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showingPopoutView: false
    }
  }

  togglePopoutView = () => {
    const showingPopoutView = !this.state.showingPopoutView;
    this.setState({ showingPopoutView });
  }

  getStyles = () => {
    const { popoutHeight, popoutWidth } = this.props;
    const { x, y } = this.popoutCenterPosition();
    return {
      position: 'absolute',
      zIndex: 100,
      height: popoutHeight,
      width: popoutWidth,
      left: x,
      top: y
    }
  }

  popoutCenterPosition = () => {
    const { popoutHeight, popoutWidth } = this.props;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const x = (screenWidth / 2) - (popoutWidth / 2);
    const y = (screenHeight / 2) - (popoutHeight / 2);
    return { x, y }
  }

  

  render() {
    const Popout = this.state.showingPopoutView && this.props.popoutView ? (
      <DraggablePopout
        id={this.props.name}
        styles={this.getStyles()}
      >
        {this.props.popoutView}
      </DraggablePopout>
    ) : null

    return (
      <div 
        className='module-wrapper'
        name={this.props.name}
      >
        <div 
          onClick={this.togglePopoutView} 
          className='module'
        >
          {this.props.children}
        </div>
        {Popout}
      </div>
    )
  }
}

export default Module;