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

const brightnessDragHandler = (brightnessPercent, props) => {
  var newBrightness = brightnessPercent * 254;
  if(newBrightness < 0) {
    newBrightness = 1;
  }
  console.log(`Setting brightness to ${newBrightness}`);
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
      className={'smart-light-button ' + (props.on ? '' : 'off')}
      onClick={() => props.onLightClick(props.lightId, !props.on)}
      draggable={true}
      onTouchMove={(event) => {
        const positionData = event.target.getBoundingClientRect();
        const dragPos = event.touches[0].clientY;
        var brightnessPercent;
        if(dragPos > positionData.bottom) {
          brightnessPercent = 0;
        } else if(dragPos < positionData.top) {
          brightnessPercent = 1;
        } else {
          const distanceFromTop = dragPos - positionData.top;
          brightnessPercent = 1 - (distanceFromTop / positionData.height);
        }
        const currentTime = new Date().getTime();
        if(!lastRequest || currentTime - lastRequest > 100) {
          lastRequest = currentTime;
          if(event.clientY !== 0) {
            dragDistance = event.touches[0].clientY - dragStartPos;
          }
          brightnessDragHandler(brightnessPercent, props);
        }
      }}
      onDrag={(event) => {
        const positionData = event.target.getBoundingClientRect();
        const dragPos = event.clientY;
        var brightnessPercent;
        if(dragPos > positionData.bottom) {
          brightnessPercent = 0;
        } else if(dragPos < positionData.top) {
          brightnessPercent = 1;
        } else {
          const distanceFromTop = dragPos - positionData.top;
          brightnessPercent = 1 - (distanceFromTop / positionData.height);
        }
        const currentTime = new Date().getTime();
        if(!lastRequest || currentTime - lastRequest > 100) {
          lastRequest = currentTime;
          brightnessDragHandler(brightnessPercent, props);
        }
      }}
      onDragStart={(event) => {
        event.dataTransfer.setDragImage(dragPreview(), 0, 0)
      }}
    >
      <div className='smart-light-brightness' style={getStyles(props)}></div>
    </div>
  </div> 
)

export default SmartLight;