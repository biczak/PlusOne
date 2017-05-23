// Import React Components
import React, { Component } from 'react';
import {Route, Router} from 'react-router';
import { render } from 'react-dom';
// Import Local Components and CSS
import Events from '../Events/Events.jsx';
import UserProfile from '../UserProfile/UserProfile.jsx';
import MenuBar from '../MenuBar/MenuBar.jsx';
import css from './app.css';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className="wrapper">
          <MenuBar />
            <div className="center">  
              <div className="title">
                <h1>LFM</h1>
                <p> Find people. Fill your group. Do the things you love.</p>
              </div>
              <div className="logins">  
                  <a href="/auth/facebook" className="ui image middle aligned facebook">
                    <img src='../../../assets/FB-f-Logo__blue_100.png' ></img>
                  </a>
                  <a href="/auth/google" className="ui image middle aligned google">
                    <img src='../../../assets/btn_google_light_normal_ios.svg' ></img>
                  </a>
              </div>
            </div>
            <div className="footer"> 
              <a href="/events"><i aria-hidden="true" className="chevron down huge icon inverted"></i></a>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
