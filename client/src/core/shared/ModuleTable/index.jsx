import React from 'react';
import PropTypes from 'prop-types';
import './ModuleTable.css';

const ModuleTable = (props) => {

  const activeBadge = (module) => {
    const badge = module.position ? (
      <span className='active-table-module'>ACTIVE</span>
    ) : null
    return badge
  }

  const editModeBox = (module, index) => (
    <input 
      className='edit-mode-box'
      type='radio'
      name={'module-select'}
      value={module.name}
      checked={false}
      onChange={props.onModuleCellClick}
      data-module-index={index}
      id={module.name}
    />
  )

  return (
    <div className='module-table'>
      <table>
        <tbody>
          {
            props.modules.map((module, index) => (
              <tr 
                key={module.name}
                className={'row' + (props.selectedModuleIndex === index ? ' selected' : '') }
              >
                <td>
                  <label htmlFor={module.name}>
                    <div className='module-table-header'>
                      {module.name}
                      {activeBadge(module)}
                    </div>
                    <p className='module-table-description'>{module.description}</p>
                    {editModeBox(module, index)}
                  </label>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className='module-table-footer'>
          <button onClick={props.onButtonClick}>Apply Settings</button>
      </div>
    </div>
  )
}

ModuleTable.propTypes = {
  modules: PropTypes.array.isRequired,
  onModuleCellClick: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default ModuleTable;