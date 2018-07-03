import React from 'react';

const SettingsMirrorLayout = (props) => {
  const modules = props.modules

  const modulePositions = [
    null, null, null, null, null, null,
    null, null, null, null, null, null,
  ]
  
  modules.forEach(module => {
    if(module.position){
      modulePositions[module.position] = module.name
    }
  })

  const mirrorModule = (index) => (
    <div 
      className={'settings-module-container ' + (props.selectedMirrorPosition === index ? 'active-mirror-module' : '') }
      onClick={() => {
        props.onModuleClick(index)
      }}
      key={`module-${index}`}
    >
      <p className='settings-module-name'>{modulePositions[index]}</p>
    </div>
  )
  
  const moduleRow = (indexes, small=false) => {
    const size = small ? 2 : 3;
    return (
      <section className={'settings-layout-row ' + (small ? 'settings-layout-row-sm' : '')}>
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
    <div className='mirror-layout'>
      {moduleRow([0,1], true)}
      {moduleRow([2,3,4])}
      {moduleRow([5,6,7])}
      {moduleRow([8,9,10])}
      {moduleRow([11,12], true)}
    </div>
  )
}

export default SettingsMirrorLayout;