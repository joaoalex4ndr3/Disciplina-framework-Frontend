# NASA Image and Video Library
A React frontend that consumes the Nasa api, in a mobile first manner. Made as a coding challenge for applying to a front end developer position.
## Getting Started

- Run command ```npm install``` followed by ```npm start```
to get the frontend app served locally at [http://localhost:3000](http://localhost:3000)

- The command ```npm run sass-watch``` will build your main sass-file into a css in watch-mode, for hot reloading of your css.

- The command ```npm run build``` builds the app for production to the ```/build``` folder, which is hidden in your gitignore, why you might not see it in your editor.

### Challenge:

Create a front end to the NASA Image and Video Library JSON API

[https://api.nasa.gov/api.html#Images]()

#### What we expect to see (minimum)


- Mobile first (or only) design
- Using more than one API endpoint
- At least three different views
- A well structured project with code and resources divided into folders and files. E.g. the code for each view should be contained in separate files (one or more per view).
- Using a proper build script (and tools). (Please write instructions on how to build).
- Fullscreen image viewing
- Possibility to view metadata
- Some sorting and/or filtering options for the items
- Built with React



## Developers process

- [x] Create Readme
- [x] Simple app explanation, how to download and build
- [ ] Breakdown of tasks and steps to fulfill specs
- [ ] Wireframe to map out all components and containers
- [ ] Data inflow points
- [ ] Tdd workflow
- [ ] What packages used to solve which problems

#### App Breakdown

- App lives in main route '/' where three views/states can be toggled: (Explore, Photo of the day, Slideshow)
- Explore view is the initial state, where Slideshow links are displayed for 3 different sources, Photo of the day is presented as a date-widget, and if real estate accepts, some news posts.
- Photo of the day is a screen-saver type view which presents the photo of the day. It can be browsed back in time to see previous days.
- Slideshow is a view that cycles 3 sources that mount on the screen and display slideshows from each source.

#### Packages

- Create React App to bootstrap the project and build scripts
- Jest and Enzyme to test components and containers
- TBD fast css framework to get responsive layout and component starting points.


#### Nasa Api endpoints used:
- [Nasa Apod](https://api.nasa.gov/api.html#apod)
- [Mars Rover Photos](https://api.nasa.gov/api.html#MarsPhotos)

#### Artwork courtesy of
- Mars render: https://www.reddit.com/r/blender/comments/5ig8wz/mars_blender_278a_cycles_render/
