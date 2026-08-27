import React from 'react'
import {NavLink} from 'react-router-dom'
const style= {
  paddingTop: '10em',
  paddingBottom: '3em'
}

export default (props) => {
  return (
    <footer className="footer" style={style}>
      <div className="content has-text-centered has-text-light">
        <p className="title is-2">&lt;/&gt;</p>
        <p className="subtitle has-text-light is-5">
          Nasa Api Front - by <a href="https://www.linkedin.com/in/pablo-anttila-bb84a24/">Pablo Anttila</a>
          <br />
          <NavLink to="./about" >About this website</NavLink>
        </p>
        <p>
          You can browse the source code at <a href="https://github.com/papplo/nasa-api-front">github</a>, the readme gets you up and going in under 5 minutes.
        </p>

        <p>The website content
          is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
      </div>
    </footer>
  )
}
