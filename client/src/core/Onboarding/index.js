import React from 'react';
import LaunchScreen from './LaunchScreen';
import Setup from './Setup';
import { BrowserRouter, Route } from 'react-router-dom';
import './Onboarding.css';

const Onboarding = (props) => (
  <BrowserRouter>
    <div className='routes'>
      <Route path='/onboarding/welcome' component={LaunchScreen} />
      <Route path='/onboarding/setup' component={Setup} />
    </div>
  </BrowserRouter>
)

export default Onboarding;