import React from 'react'
import {default as RoverPhoto } from './RoverPhoto'

export default ({rover, photos = [], filter, filterHandler, loading, sol}) => {
  const renderPhotos = (photos) => {
    if (loading) return <p>Loading...</p>
    else {
      let filterSet = new Set(filter)
      if (filterSet.size === 0) filterSet.add('CHEMCAM')
      let filtered = photos.filter(photo => ( filterSet.has(photo.camera.name)))
      if (filtered.length > 0) {
        return (
            filtered.map((photo, index) => (
              <div key={index} className="column is-3">
                <RoverPhoto photo={photo} />
              </div>
            ))
        )
      } else {
        return (
          <div key={filter} className="column is-3">
            <p>NO images of {filter}</p>
          </div>
        )
      }
    }
  }

  const style = {
    card: {
      borderRadius: '.5em',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '18vh',
      marginTop: '-5em'
    },
    manifest: {
      marginTop: '-4em'
    },
    photocolumns: {
      marginTop: '2em',
      marginBottom: '5em'
    }
  }

  return (
    <section className="container has-text-grey-lighter ">
      <div className="columns">
        <div className="column is-3">
          <div className="card is-hidden-mobile"
            style={
              {...style.card,
                backgroundImage: `url(${rover.bg})`}
              }>
          </div>
        </div>
        <div className="column" style={{...style.manifest}}>
          <div className="content">
            <p className="title is-spaced is-3 has-text-white">{rover.name}</p>
            <p className="subtitle is-tight has-text-grey is-6"><span className="subtitle has-text-warning is-5">Data: </span>
              Landed: {rover.landing_date} | Mission length: {rover.max_sol} Sol | Total photos: {rover.slides.length}
            </p>
            <p className="subtitle is-tight has-text-grey is-6"><span className="subtitle has-text-warning is-5">Manifest: </span>
              {rover.manifest}
            </p>
          </div>
        </div>
      </div>
      <div className="content">
        <p className="subtitle is-tight is-5 has-text-grey">Images: {photos.length}</p>
        <div className="buttons has-addons">
          <span className="button disabled is-dark is-small has-text-white is-outlined">{loading || 'Filter by Camera: '}</span>
          <span className="button disabled has-text-warning is-dark is-small has-text-white is-outlined"
            onClick={()=>filterHandler('all')}>All</span>
          {rover.cameras.map(el=>(
              <span key={el} className="button is-dark is-small"
                onClick={()=>filterHandler(el)}>{el}</span>)
          )}
        </div>
      </div>
      <div className="columns is-multiline" style={style.photocolumns}>
        {photos && renderPhotos(photos)}
      </div>
    </section>
  )
}
