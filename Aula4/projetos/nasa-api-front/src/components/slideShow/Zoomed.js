import React from 'react'
import { default as Hero } from '../hero/Hero'

export default ({image, back}) => {
  return (
    <section className="zoomed-image">
      <Hero
      title=""
      subtitle=""
      full
      bg=""
      >
      <img src={image.hdurl} style={{minWidth: '100%'}} alt="zoomed"/>
      <article className="message" style={{backgroundColor: '#121C29'}}>
        <div className="message-body" style={{borderColor: '#60DAFB'}}>
          <a className="button" onClick={()=>back()}>Go Back</a>
          <p className="title has-text-light">{image.title}</p>
          <p className="has-text-grey-light">{image.explanation}</p>
        </div>
      </article>


      </Hero>
    </section>
  )
}
