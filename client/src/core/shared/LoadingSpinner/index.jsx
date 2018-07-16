import React from 'react';
import Spinner from 'react-spinkit';
import './LoadingSpinner.css';

const LoadingSpinner = (props) => (
  <div className='loading-spinner-wrapper'>
    <div className='loading-spinner-content'>
      <Spinner 
        className='loading-spinner'
        name='three-bounce'
        color='white' 
      />
      <p className='loading-spinner-text'>{props.loadingText || 'Loading...'}.</p>
    </div>
  </div>
)

export default LoadingSpinner;