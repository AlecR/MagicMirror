import React, { Component } from 'react';
import Settings from 'core/Settings';
import './Dashboard.css';

export default class Dashboard extends Component { 

  render() {
    const modules = this.props.modules.map(Module => {
      return Module ? <Module /> : null 
    })
    
    return (
      <div className='dashboard__grid'>
        {
          modules.map((module, index) => {
            return (
              <div className={`dashobard__module-container dashboard__module-${index}`}>
                {module}
              </div>
            )
          })    
        }
        <div className={`dashobard__module-container dashboard__module-${modules.length}`}>
          <Settings />
        </div>
      </div>
    )
  }
}
