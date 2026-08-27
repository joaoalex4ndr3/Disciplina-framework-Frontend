import React from 'react'

const style = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  fontSize: '0.75rem',
  textAlign: 'left',
  width: '100%',
  padding: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
}

export default (props) => {
  const {camera, earth_date, img_src} = props.photo;
  return (
    <div className="card">
      <div className="card-image" style={{overflow:'hidden'}}>
        <figure className="image zoomable-figure is-3by3">
          <img src={img_src} alt="rover" />
        </figure>
      </div>
      <div className="card-content" style={style}>
          <p className="title is-6 has-text-light">{camera.full_name}</p>
          <p className="subtitle is-6 has-text-grey-light">{earth_date}</p>
      </div>
    </div>
  )
}
