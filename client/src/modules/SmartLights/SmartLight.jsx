import React from 'react';
import './SmartLights.css';

const dragPreview = () => {
  const preview = document.createElement("img"); 
  preview.src = require('./assets/preview.png');
  return preview;
}

const getStyles = (props) => {
  const brightnessPercent = parseInt(((props.brightness/254)*100), 10)
  const top = `${100 - brightnessPercent}%`
  return {
    top: top,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
}


const brightnessDragHandler = (event, props) => {
  var newBrightness = props.brightness - (dragDistance / 2);
  if(newBrightness < 0) {
    newBrightness = 1;
  } else if(newBrightness > 254) {
    newBrightness = 254;
  }
  props.updateBrightness(props.lightId, newBrightness);
} 

var dragStartPos = null;
var dragDistance = null;
var lastRequest = null;

const SmartLight = (props) => (
  <div
    className='smart-light'
  >
    <div className='smart-light-name'>{props.name}</div>
    <div 
      className={'smart-light-button ' + (props.on ? '' : 'on')}
      onClick={() => props.onLightClick(props.lightId, !props.on)}
      draggable={true}
      onTouchMove={(event) => {
        const currentTime = new Date().getTime();
        if(!lastRequest || currentTime - lastRequest > 100) {
          lastRequest = currentTime;
          if(event.clientY !== 0) {
            dragDistance = event.touches[0].clientY - dragStartPos;
          }
          brightnessDragHandler(event, props);
        }
        
      }}
      onTouchStart={(event) => {
        dragStartPos = event.touches[0].clientY;
      }}
      onTouchEnd={(event) => {
        lastRequest = null;
        dragStartPos = null;
      }}
      onDrag={(event) => {
        const currentTime = new Date().getTime();
        if(!lastRequest || currentTime - lastRequest > 100) {
          lastRequest = currentTime;
          if(event.clientY !== 0) {
            dragDistance = event.clientY - dragStartPos;
          }
          brightnessDragHandler(event, props);
        }
      }}
      onDragStart={(event) => {
        dragStartPos = event.clientY;
        event.dataTransfer.setDragImage(dragPreview(), 0, 0)
      }}
      onDragEnd={(event) => {
        lastRequest = null;
        dragStartPos = null;
      }}
    >
      <div className='smart-light-brightness' style={getStyles(props)}></div>
    </div>
  </div> 
)

export default SmartLight;