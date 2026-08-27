import React from 'react';
import { NavLink } from 'react-router-dom'

import logo from '../../static/logo.svg';

export default (props) => {
  return (
    <div className="hero-head">
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <NavLink to="./" className="navbar-item">
            <img src={logo} className="App-logo" alt="app-logo" width="50" height="50" />
            {props.title}
          </NavLink>
          <NavLink to="photo-of-the-day" className="navbar-item ">
            <span className="">NASA Photo of day</span>
          </NavLink>
        </div>
      </nav>
    </div>
  )
}
