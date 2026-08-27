import React from 'react'

import {default as Slide} from './Slide'

export default ({ photoSet, loader, zoomed }) => {

  const renderArray = (photoSet) => {
    return photoSet.map((photo,index) => (
    <div key={index} className="column is-one-quarter">
      <Slide photo={photo} width="256" handleZoom={(photo)=>zoomed(photo)}/>
    </div>
    ))
  }

  return (
    <div className="">
    <div className="container">
      <nav className="level is-mobile">
        <div className="level-left">
          <p className="level-item has-text-centered">{photoSet.length} Images </p>
        </div>
        <div className="lever-rigth">
          <a className="has-text-centered button is-dark"
            onClick={()=>loader()}>
            Load more
          </a>
        </div>
      </nav>

    <div className="columns is-multiline ">
        {renderArray(photoSet)}
    </div>
  </div>
  </div>
  )
}
