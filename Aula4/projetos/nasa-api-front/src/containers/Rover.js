import React, {Component} from 'react'
import { default as RoverMounted } from '../components/rovercards/RoverMounted'
import { default as Hero } from '../components/hero/Hero'

import { ROVER } from '../lib/API'

class Rover extends Component {
  constructor(props){
    super(props)
    this.state = {
      fetched: false,
      isLoading: false,
      photoSet: [],
      filteredCams: [...props.mounted.cameras],
      zoomed: null,
      mounted: props.mounted,
      camera: null,
      sol: props.mounted.start_sol,
      page: null,
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const query = {'sol': this.state.sol}
    this.getImages(this.state.mounted.slug, query, this.state)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.mounted !== prevProps.mounted || this.state.sol !== prevState.sol) {
      const query = {sol: this.state.sol}
      this.getImages(this.props.mounted.slug, query, this.state)
      this.setState(state => ({
        ...this.state,
        mounted: this.props.mounted,
        filteredCams: [...this.props.mounted.cameras]
      }))
    }
  }

  getImages(rover, query, prevState) {
    this.setState({
      isLoading: true
    });
    fetch(`${ROVER.endPoint(ROVER.url, rover, ROVER.key, ROVER.parseQuery(query))}`)
      .then(res => res.json())
      .then(data => this.setState(
        prevState => ({
          ...prevState,
          photoSet: [
            ...data.photos ],
          isLoading: false,
          fetched: true
        })
      ))
  }

  filterImages(stringOrInteger) {
    if (typeof stringOrInteger === 'number') {
      this.setState({
        ...this.state,
        isLoading: true
      })
      this.setState({
        sol: (this.state.sol + stringOrInteger)
      })
    } else {
      if (stringOrInteger === 'all') {
        stringOrInteger = this.state.mounted.cameras
        this.setState(prevState=>({
          ...prevState,
          filteredCams: stringOrInteger
        }))
      } else {
        this.setState(prevState=>({
          ...prevState,
          filteredCams: [stringOrInteger]
        }))
      }
    }
  }

  render () {
    const { mounted, photoSet, filteredCams, sol} = this.state
    return (
      <div>
        <Hero>
          <div className="columns">
            <div className="column is-offset-9 is-3 is-right">
              <p className="numeral is-size-1 has-text-centered">
                <span className="numeral-overlay is-size-6 has-text-warning">Mission day: </span><br/>{sol}</p>
                <div className="buttons has-addons is-centered">
                  <span className="button disabled is-dark is-small has-text-white is-outlined">{!photoSet[0]? 'loading':  photoSet[0].earth_date}</span>
                  <span className="button is-dark is-small"
                    onClick={()=>this.filterImages(-1)}>
                    &lt;&lt; REW</span>
                  {sol >= mounted.max_sol? null :
                  <span className="button is-dark is-small is-disabled"
                    onClick={()=>this.filterImages(1)}>
                    FORW &gt;&gt; </span>}
                    <br/>
                </div>
              </div>
          </div>
        </Hero>
        <div className="section is-dark">
          <RoverMounted
            loading={this.state.isLoading}
            rover={mounted}
            photos={photoSet}
            filter={filteredCams}
            sol={sol}
            filterHandler={(filterBy)=>this.filterImages(filterBy)} />
        </div>
      </div>
  )}
}

export default Rover;
