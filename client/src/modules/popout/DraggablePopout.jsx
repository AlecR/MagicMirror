import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from '../../lib/Constants';
import { setActivePopout, resetActivePopout } from '../../actions/index';
import { connect } from 'react-redux';

const getStyles = (props) => {
  const { left, top, height, width, isDragging } = props
	return {
    position: 'fixed',
    top: top,
    left: left,
    opacity: isDragging ? 0 : 1,
    height: height,
    width: width,
	}
}

const popoutSource = {
  beginDrag(props) {
    const { id, title, left, top, dispatch } = props;
    dispatch(setActivePopout(id));
    return { id, title, left, top }
  },
  endDrag(props) {
    const { id, dispatch } = props;
    dispatch(resetActivePopout(id));
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class DraggablePopout extends Component {
  static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
		left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    popoutHeight: PropTypes.number,
    popoutWidth: PropTypes.number
  }

  

  componentDidMount() {
		this.props.connectDragPreview(getEmptyImage(), {
			captureDraggingState: true,
    })
  }

  render() {
    const { connectDragSource } = this.props
    return connectDragSource(
      <div 
        className='draggable-pop-out'
        style={getStyles(this.props)}
      >
        {this.props.children}
      </div>
    )
  }
}

const draggablePopout = DragSource(ItemTypes.POPOUTVIEW, popoutSource, collect)(DraggablePopout)
export default connect()(draggablePopout)
