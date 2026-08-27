import React from 'react';
import { default as NavBar } from '../navbar/NavBar';
import marsRender from '../../static/mars-render-bg.jpg';

export default (props) => {

  let classes = ['hero', 'is-bold'];
  classes.push(
    props.full
    ? 'is-fullheight'
    : 'is-normal'
  );
  classes.push(
    props.light
    ? 'is-light'
    : 'is-dark is-main-background'
  );

  const style = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.6) 0%, rgba(0,0,0,0.1) 50%, rgba(9, 10, 14, 1) 100%), url(${props.bg || marsRender})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return (
    <section className={classes.join(' ')} style={style}>
      <NavBar
        title="Look into space"
        />
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
          {props.title}
          </h1>
          <h2 className="subtitle">
          {props.subtitle ||''}
          </h2>
          {props.children}
        </div>
      </div>
      <div className="hero-foot">
        <nav className="tabs">
          <div className="container">

          </div>
        </nav>
      </div>
    </section>
  )
}
