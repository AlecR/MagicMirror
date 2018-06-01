import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './lib/Constants';
import { shouldPureComponentUpdate } from './lib/DndHelper';
import { movePopout } from './actions/index';
import { connect } from 'react-redux';  
import Dashboard from '../src/Dashboard';

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

const popOutTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset()
    const item = monitor.getItem()
    let left = Math.round(item.left + delta.x)
    let top = Math.round(item.top + delta.y)
     
    component.movePopOut(item.id, top, left)
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

  shouldComponentUpdate = shouldPureComponentUpdate

  constructor(props) {
    super(props)
    this.state = {
      popOuts: []
    }
  }

  movePopOut(id, top, left) {
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

const dropTargetLayer = DropTarget(ItemTypes.POPOUTVIEW, popOutTarget, collect)(DropTargetLayer)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(dropTargetLayer)
