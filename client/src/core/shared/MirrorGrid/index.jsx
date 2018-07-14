import React from 'react';
import PropTypes from 'prop-types';
import './MirrorGrid.css';

const MirrorGrid = (props) => {
  const modules = props.modules
  const moduleIndexPositions = [
    null, null, null, null, null, null,
    null, null, null, null, null, null,
  ]
  
  modules.forEach(module => {
    if(module.position){
      moduleIndexPositions[module.position] = modules.indexOf(module);
    }
  })
  
  const mirrorModule = (index) => {
    const moduleIndex = moduleIndexPositions[index];
    const module = props.modules[moduleIndex];
    return (
      <div 
        className={'mirror-grid-module-container ' + ((moduleIndexPositions[index] === null && props.selectedModuleIndex !== null) ? 'glowing' : '') }
        onClick={() => {
          props.onMirrorModuleClick(index)
        }}
        key={`module-${index}`}
      >
        {module ? <button onClick={() => props.removeModule(moduleIndex)}>X</button> : null}
        <p className='mirror-grid-module-name'>{module ? module.name : ''}</p>
      </div>
    )
  }

  const moduleRow = (indexes, small=false) => {
    const size = small ? 2 : 3;
    return (
      <section className={small ? 'mirror-grid-row-sm' : 'mirror-grid-row'}>
      {
        indexes.slice(0, size).map(index => {
          const module = mirrorModule(index);
          return module;
        })
      }
      </section>
    )
  } 

  return (
    <div className='mirror-grid'>
      {moduleRow([0,1], true)}
      {moduleRow([2,3,4])}
      {moduleRow([5,6,7])}
      {moduleRow([8,9,10])}
      {moduleRow([11,12], true)}
    </div>
  )
}

MirrorGrid.propTypes = {
  modules: PropTypes.array.isRequired,
  onMirrorModuleClick: PropTypes.func.isRequired,
};

export default MirrorGrid;