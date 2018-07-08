import React from 'react';
import Particles from 'react-particles-js';
import './LaunchScreen.css';
import { Link } from 'react-router-dom'

const LaunchScreen = (props) => (
  <Link to='/onboarding/setup'>
    <Particles 
      height='100%'
      width='100%'
      style={{
        position: 'absolute'
      }}
      params={particlesConfig}
    />
    <div>
      <div className='launch-screen-title'>
        <p className='welcome'>Welcome To</p>
        <p className='launch-screen-title-name'>Smart Mirror</p>  
        <p className='subtitle'>Tap anywhere to continue</p>
      </div>
    </div>
  </Link>
)

const particlesConfig = {
  "particles": {
    "number": {
      "value": 120,
      "density": {
        "enable": true,
        "value_area": 1000
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 2,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "retina_detect": true
}

export default LaunchScreen;