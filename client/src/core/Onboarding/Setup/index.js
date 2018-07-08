import React from 'react';
import MirrorConfiguration from 'core/shared/MirrorConfiguration';
import './Setup.css';

const Setup = (props) => (
  <div className='setup'>
    <div className='setup-header'>
      <p className='setup-title'>Setup</p>
      <p className='setup-subtitle'>Select a module from the list and then a position on the grid to place it on your mirror</p>
    </div>
    <div className='setup-body'>
      <MirrorConfiguration 
        onSaveSuccess={() => {
          window.location = "http://localhost:3000/dashboard";
        }}
      />
    </div>
  </div>
)

export default Setup;