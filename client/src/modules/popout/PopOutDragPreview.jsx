import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { shouldPureComponentUpdate } from '../../lib/DndHelper'

export default class PopOutDragPreview extends Component {
  render() {
    return(
      <div className='pop-out-drag-preview'>
        <h1>Test</h1>
      </div>
    )
  }
}