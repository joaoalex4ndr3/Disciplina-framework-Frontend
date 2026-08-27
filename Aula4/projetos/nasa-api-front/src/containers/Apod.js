import React, { Component } from 'react'

import { default as Hero } from '../components/hero/Hero'
import { default as Loading } from '../components/layout/Loading'
import { default as Slides } from '../components/slideShow/Slides'
import { default as Zoomed } from '../components/slideShow/Zoomed'

import {  APOD_endPoint } from '../lib/API'


class Apod extends Component {
  constructor() {
    super()
    this.state = {
      fetched: false,
      isLoading: false,
      photoSet: [],
      zoomed: null
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('apod_store')) {
      this.getImages(APOD_endPoint, this.state);
    }
    else {
      const cache = JSON.parse(localStorage.getItem('apod_store'));
      this.setState((prevState)=> (
        cache
        ))
    }
  }

  componentWillUnmount() {
    this.storeCache()
  }

  getImages(endpoint,prevState) {
    this.setState({ ...prevState, isLoading: true });
    fetch(endpoint)
    .then(response => response.json())
    .then((data) => this.setState(prevState => ({
        ...prevState,
        photoSet: [...data.filter(ph => (
          ph.media_type === 'image' && ph
        )).reverse(), ...prevState.photoSet],
        isLoading: false,
        fetched: true
      }))
    )
    .catch(error => this.setState({
        ...this.state,
        error: error,
        isLoading: false,
        fetched: false
      }))
  }

  storeCache() {
    if (this.state.fetched) {
      localStorage.setItem('apod_store', JSON.stringify(this.state));
    }
  }

  clearCache() {
    if (localStorage.getItem('apod_store') !== undefined) {
      localStorage.removeItem('apod_store');
      this.getImages(APOD_endPoint);
    }
  }

  zoomImage(image) {
    if (!image) {
      this.setState({
        ...this.state,
        zoomed: null
      })
    }
    else {
      window.scrollTo(0, 0);
      this.setState({
        ...this.state,
        zoomed: image
      })
    }
  }

  render () {
    const { photoSet, isLoading, fetched, zoomed } = this.state
    if (isLoading) {
      return <Loading />
    };
    if (zoomed) {
      return <Zoomed back={()=>this.zoomImage()} image={zoomed}/>
    }

    return (
      <Hero
        subtitle={'Browse mindblowing photos from space in an uninterrupted manner'}
        title="Nasa Photo of the day"
        bg="null"
        full
        >
        <Slides
          photoSet={photoSet}
          fetched={fetched}
          loader={()=>this.clearCache()}
          zoomed={(photo)=>this.zoomImage(photo)}
          />
      </Hero>
    )
  }
}

export default Apod
