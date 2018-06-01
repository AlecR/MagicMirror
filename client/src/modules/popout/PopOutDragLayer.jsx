import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragLayer } from 'react-dnd'
import { ItemTypes } from '../../lib/Constants'
import PopOutDragPreview from './PopOutDragPreview'

const layerStyles = {
	position: 'fixed',
	pointerEvents: 'none',
	zIndex: 100,
	left: 0,
	top: 0,
	width: '25%',
	height: '100%',
}

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props
  if (!initialOffset || !currentOffset) {
		return {
			display: 'none',
		}
  }
  
  let { x, y } = currentOffset 
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }
}

class PopOutDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
			x: PropTypes.number.isRequired,
			y: PropTypes.number.isRequired,
    }),
    currentOffset: PropTypes.shape({
			x: PropTypes.number.isRequired,
			y: PropTypes.number.isRequired,
		}),
		isDragging: PropTypes.bool.isRequired,
  }

  renderItem(type, item) {
    switch(type) {
      case ItemTypes.POPOUTVIEW:
        return <PopOutDragPreview />
      default:
        return null
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props

    if(!isDragging) {
      return null
    }

    return (
      <div style={layerStyles}>
				<div style={getItemStyles(this.props)}>
					{this.renderItem(itemType, item)}
				</div>
			</div>
    )
  }
}

export default DragLayer(collect)(PopOutDragLayer);