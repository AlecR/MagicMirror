import React from 'react';
import SettingsMirrorLayout from './SettingsMirrorLayout';
import SettingsModuleTable from './SettingsModuleTable';

const SettingsPopout = (props) =>  (
  <div className='settings-popout'>
    <div className='settings-popout-header'>
      <p className='settings-popout-title'>Settings</p>
    </div>
    <div className='settings-popout-body'>
      <SettingsMirrorLayout 
        modules={props.moduleData}
        selectedMirrorPosition={props.selectedMirrorPosition}
        onModuleClick={props.onMirrorModuleClick}
      />
      <SettingsModuleTable
        modules={props.moduleData}
        editMode={props.editMode}
        selectedMirrorPosition={props.selectedMirrorPosition}
        selectedTableModuleName={props.selectedTableModuleName}
        onModuleClick={props.onTableModuleClick}
        onApplyClick={props.onApplyClick}
      />
    </div>
  </div>
)

export default SettingsPopout;
