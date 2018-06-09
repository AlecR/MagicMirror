import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './lib/Constants';
import { movePopout } from './actions/index';
import { connect } from 'react-redux';  

const styles = {
  position: 'fixed',
  height: '100%',
  width: '100%',
  top: '0',
  left: '0',
}

const mapStateToProps = (state, props) => {
  return {
    popouts: state.popouts
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    movePopout: (id, top, left) => {
      dispatch(movePopout(id, top, left))
    }
  }
}

const popoutTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset()
    const module = monitor.getItem()
    let left = Math.round(module.left + delta.x)
    let top = Math.round(module.top + delta.y)
     
    component.movePopout(module.id, top, left)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}



class DropTargetLayer extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  }

  movePopout(id, top, left) {
    this.props.movePopout(id, top, left)
  }

  render() {
    const { connectDropTarget } = this.props

    return connectDropTarget(
      <div 
        className='drop-target-layer'
        style={styles}
      >
        {this.props.children}
      </div>
    )
  }
}

const dropTargetLayer = DropTarget(ItemTypes.POPOUTVIEW, popoutTarget, collect)(DropTargetLayer)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(dropTargetLayer)
