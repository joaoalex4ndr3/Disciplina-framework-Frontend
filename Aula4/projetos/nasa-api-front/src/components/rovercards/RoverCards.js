import React  from 'react';


export default ({rovers, mini, handler, children}) => {
  const style = {
    card: {
      borderRadius: '.5em',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minWidth: '24vw',
    },
    slideshow : {
      transform: `translateY(${mini? '-10px': '-150px'})`,
    },
    container : {
      overflowScrolling: 'touch',
      WebkitOverflowScrolling: 'touch',
    },
    body: {
      height: `${mini? '15vh':'30vh'}`,
    },
    footer: {
      marginTop: `${mini? '12vh':'5vh'}`,
    },
    title: {

    }
  }

  const displayCards = rovers.map(rover=>(
    <div className="column" key={rover.id}>
      <a onClick={()=>handler(rover)}>
        <div className="card"
          key={rover.id}
          style={{...style.card,  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%), url(${rover.bg})`}}>
          <div className={`card-content has-text-centered has-text-weight-bold is-uppercase rover-${rover.slug}`} style={style.body}>
            <p className={`title has-text-light  ${mini? 'is-7': 'is-4'} `} >{rover.name}</p>
            <p className="subtitle has-text-warning is-7">Status: {rover.status}</p>
          </div>

          {children}

          {mini? null :
            <div className="">
              <p className="title has-text-warning has-text-centered is-5">Sols: {rover.max_sol}</p>
              <footer className="card-footer" style={style.footer}>
                <p className="card-footer-item">
                  <span>
                    {`Cameras: ${rover.cameras.length}`}
                  </span>
                </p>
                <p className="card-footer-item">
                  <span>
                    {`Collected: ${rover.slides.length}`}
                  </span>
                </p>
              </footer>
        </div>
          }
        </div>
      </a>
    </div>
  ))

  return (
    <section style={style.slideshow}>
      <p className="has-text-grey has-text-centered subtitle is-6">Choose a Rover to explore:</p>
      <div className="container has-overflow-x-mobile" style={style.container}>
        <div className="columns is-mobile">
          {rovers && displayCards}
        </div>
      </div>
    </section>
  )
}
