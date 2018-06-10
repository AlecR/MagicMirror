import React, { Component } from 'react';
import './Dashboard.css';

export default class Dashboard extends Component { 

  render() {
    console.log("Modules");
    console.log(this.props.modules);
    const modules = this.props.modules.map(Module => {
      return Module ? <Module /> : null 
    })
    
    return (
      <div className='dashboard'>
        <section className='dashboard-row dashboard-row-sm'>
          <div className='module-container'>
            {modules[0]}
          </div>
          <div className='module-container'>
            {modules[1]}
          </div>
        </section>
        <section className='dashboard-row'>
          <div className='module-container'>
            {modules[2]}
          </div>
          <div className='module-container'>
            {modules[3]}
          </div>
          <div className='module-container'>
            {modules[4]}
          </div>
        </section>
        <section className='dashboard-row'>
          <div className='module-container'>
            {modules[5]}
          </div>
          <div className='module-container'>
            {modules[6]}
          </div>
          <div className='module-container'>
            {modules[7]}
          </div>
        </section>
        <section className='dashboard-row'>
          <div className='module-container'>
            {modules[8]}
          </div>
          <div className='module-container'>
            {modules[9]}
          </div>
          <div className='module-container'>
            {modules[10]}
          </div>
        </section>
        <section className='dashboard-row dashboard-row-sm'>
          <div className='module-container'>
            {modules[11]}
          </div>
          <div className='module-container'>
            {modules[12]}
          </div>
        </section>
      </div>
    )
  }
}
