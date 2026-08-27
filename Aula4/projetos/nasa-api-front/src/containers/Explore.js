import React, { Component } from 'react';

import { default as Hero } from '../components/hero/Hero'
import { default as RoverCards } from '../components/rovercards/RoverCards'
import { default as Footer } from '../components/layout/Footer'

import Rover from './Rover'
import {rovers} from '../lib/Mocks.js'

class App extends Component {
  constructor(){
    super()
    this.state = {
      mounted: {
        mounted: false,
        id: null,
        payload: null,
      },
      explore: true
    }
  }

  onClickHandler(target) {
    window.scrollTo(0, 0);
    if (!target) {
      this.setState(state => ({
        mounted: {
          mounted: false,
          id: null,
          payload: null,
        },
        explore: true
      }))
    } else {
      this.setState(state => ({
        'explore': false,
        'mounted': {
          ...state.mounted,
          mounted: true,
          'id': target.name,
          'manifest': target.manifest,
          'payload': target,
        }
      }))
    }
  }
  render() {
    return (
      <div className="App">

          {!this.state.mounted.mounted
            ? <Hero
              title={this.state.mounted.mounted? <a className="button" onClick={()=>this.onClickHandler()}>back</a>: 'Welcome to the Red Planet'}
              subtitle={this.state.mounted.mounted? null: "The rocks, soil and sky have a red or pink hue. The distinct red color was observed by stargazers throughout history. It was given its name by the Romans in honor of their god of war. Our civilizations is currently exploring it with three on-site Rovers."}
              mounted={this.state.mounted.mounted}
              full
              />
            : <Rover
              id={this.state.id}
              mounted={this.state.mounted.payload}
              handler={(target)=>this.onClickHandler(target)}
              />
          }

        <RoverCards
          mini={this.state.mounted.mounted? true: false }
          rovers={rovers}
          handler={(target)=>this.onClickHandler(target)}
        />


        <Footer />
      </div>
    );
  }
}

export default App;
