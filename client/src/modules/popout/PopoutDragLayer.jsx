import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import { ItemTypes } from '../../lib/Constants';
import PopoutDragPreview from './PopoutDragPreview';
import { connect} from 'react-redux';

const layerStyles = {
	position: 'fixed',
	pointerEvents: 'none',
	zIndex: 100,
	left: 0,
  top: 0,
  height: '100%',
  width: '100%',
};

const getItemStyles = (props) => {
  const { initialOffset, currentOffset } = props
  if (!initialOffset || !currentOffset) {
		return {
			display: 'none',
		}
  }


  const x = initialOffset.x - currentOffset.x;
  const y = initialOffset.y - currentOffset.y;
  console.log(x, y);

  const transform = `translate(${-x}px, ${-y}px)`
  
	return {
		transform,
    WebkitTransform: transform,
    height: props.height,
    width: props.width,
  }
}

const mapStateToProps = (state, props) => {
  if (!state.activePopout) { return {} }
  const activePopout = props.popouts.find(popout => {
    return popout.props.id === state.activePopout
  })
  return {
    activePopout: activePopout,
    top: activePopout.props.top,
    left: activePopout.props.left,
    height: activePopout.props.height,
    width: activePopout.props.width,
  }
}

const collect = (monitor) => {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }
}

class PopoutDragLayer extends Component {
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
        return this.props.activePopout
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

const popoutDragLayer = DragLayer(collect)(PopoutDragLayer)
export default connect(
  mapStateToProps,
  null
)(popoutDragLayer);