import React from 'react';
import MirrorConfiguration from 'core/shared/MirrorConfiguration';

const SettingsPopout = (props) =>  (
  <div className='settings-popout'>
    <div className='settings-popout-header'>
      <p className='settings-popout-title'>Settings</p>
    </div>
    <div className='settings-popout-body'>
      <MirrorConfiguration 
        onSaveSuccess={() => {
          window.location = "http://localhost:3000/dashboard";
        }}
      />
    </div>
  </div>
)

export default SettingsPopout;
