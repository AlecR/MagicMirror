import React from 'react';

const SettingsModuleTable = (props) => {
  const {modules, selectedTableModuleName, selectedMirrorPosition} = props;

  const activeBadge = (module) => {
    const badge = module.position ? (
      <span className='active-table-module'>ACTIVE</span>
    ) : null
    return badge
  }

  const editModeBox = (module) => (
    <input 
      className='edit-mode-box'
      type='radio'
      name={'module-select'}
      value={module.name}
      checked={false}
      onChange={props.onModuleClick}
      data-mirror-position={selectedMirrorPosition}
      id={module.name}
    />
  )

  return (
    <div className='settings-table-wrapper'>
      <table className='settings-table'>
        <caption>Modules</caption>
        <tbody>
          {
            modules.map((module) => (
              <tr 
                key={module.name}
                className={'settings-row ' + (selectedTableModuleName === module.name ? 'selected' : null) }
              >
                <td>
                  <label>
                    <div className='module-header'>
                      {module.name}
                      {
                        props.editMode ? editModeBox(module) : activeBadge(module)
                      }
                    </div>
                    <p className='module-description'>{module.description}</p>
                  </label>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className='settings-table-footer'>
          <button onClick={props.onApplyClick}>Apply Settings</button>
      </div>
    </div>
    
  )
}

export default SettingsModuleTable