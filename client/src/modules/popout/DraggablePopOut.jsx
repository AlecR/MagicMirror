import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from '../../lib/Constants';

const popOutSource = {
	beginDrag(props) {
		const { id, title, left, top } = props
		return { id, title, left, top }
	},
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

function getStyles(props) {
  const { left, top, height, width, isDragging } = props
	return {
    position: 'fixed',
    top: props.top,
    left: props.left,
    opacity: isDragging ? 0 : 1,
    height: height,
    width: width,
	}
}

class DraggablePopOut extends Component {
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

export default DragSource(ItemTypes.POPOUTVIEW, popOutSource, collect)(DraggablePopOut)