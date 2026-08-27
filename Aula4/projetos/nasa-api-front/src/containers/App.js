import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// page markup
import { default as Layout } from '../components/layout/Layout'

// components for router-switch
import { default as Explore } from './Explore'
import { default as Apod } from './Apod'
import { default as About } from './About'

import '../static/AppTransitions.css';

const App = ({ location }) => {

  const currentKey = location.pathname.split('/')[1] || '/';
  const timeout = { enter: 600, exit: 200 }

  return(
      <TransitionGroup component={Layout}>
        <CSSTransition key={currentKey} timeout={timeout} classNames="fade">
          <Switch location={location}>
            <Route exact path='/' component={Explore} />
            <Route path="/photo-of-the-day" component={Apod} />
            <Route path="/about" component={About} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
  )
}

export default withRouter(App);
