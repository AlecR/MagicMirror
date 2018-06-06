import React from 'react';
import DraggablePopout from '../popout/DraggablePopout'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { addPopout, removePopout, togglePopout } from '../../actions/index'
import { RegisterPopoutContext } from '../../MagicMirror'

import './Module.css'

const mapStateToProps = (state, props) => {
  const popout = state.popouts.find(popout => {
    return popout.id === props.name
  })
  if(popout){
    return {
      top: popout.top,
      left: popout.left,
      isVisible: popout.isVisible
    }
  } else {
    return {}
  }
  
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onModuleClick: () => {
      dispatch(togglePopout(props.name))
    },
    addPopout: () => {
      dispatch(addPopout(props.name, props.popoutHeight, props.popoutWidth))
    },
    removePopout: () => {
      dispatch(removePopout(props.name))
    },
  }
}

class Module extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    popOutView: PropTypes.object,
    popoutHeight: PropTypes.number,
    popoutWidth: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      showingPopoutView: this.props.isShowing
    }
  }

  componentDidMount() {
    if(this.props.popOutView) {
      this.props.addPopout();
    }
  }

  componentWillUnmount() {
    if(this.props.popOutView) {
      this.props.removePopout();
    }
  }

  render() {
    const popout = this.props.isVisible && this.props.popOutView ? (
      <DraggablePopout
        id={this.props.name}
        left={this.props.left}
        top={this.props.top}
        height={this.props.popoutHeight}
        width={this.props.popoutWidth}
      >
        {this.props.popOutView}
      </DraggablePopout>
    ) : null

    return (
      <div 
        className='module'
        name={this.props.name}
      >
        <div onClick={this.props.onModuleClick} >
          {this.props.children}
        </div>
        {popout}
        <RegisterPopoutContext.Consumer>
          {register => register(popout)}
        </RegisterPopoutContext.Consumer>
      </div>
      

    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Module)