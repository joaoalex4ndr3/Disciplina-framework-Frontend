// This is our mock object "rover", used throughout Rover-container to bring up some data, content and images.

import bgRover1 from '../static/rover-1.jpg';
import bgRover2 from '../static/rover-2.jpg';
import bgRover3 from '../static/rover-3.jpg';

// api mocks
export const mockArr = (n,s) => {return Array(n).fill(s)}
export const rovers = [
  {
    id: 111,
    name: 'Curiosity Rover',
    slug: 'curiosity',
    manifest: 'Curiosity set out to answer the question: Did Mars ever have the right environmental conditions to support small life forms called microbes? Early in its mission, Curiositys scientific tools found chemical and mineral evidence of past habitable environments on Mars. It continues to explore the rock record from a time when Mars could have been home to microbial life.',
    landing_date: "2012-08-06",
    launch_date: "2011-11-26",
    status: "active",
    max_sol: 2172,
    start_sol: 2172,
    max_date: "2018-09-15",
    cameras: ["CHEMCAM","MARDI","MAST","FHAZ","NAVCAM","RHAZ"],
    slides: mockArr(341463, 'C'),
    bg: bgRover1
  },
  {
    id: 222,
    name: 'Opportunity Rover',
    slug: 'opportunity',
    manifest: 'Launched in 2003, Opportunity far outlasted her planned 90-day mission. Due to the 2018 dust storms on Mars, Opportunity entered hibernation on June 12, 2018, and it is hoped it will reboot once the atmosphere clears. ',
    landing_date: "2004-01-25",
    launch_date: "2003-07-07",
    status: "active",
    max_sol: 5111,
    start_sol: 5105,
    max_date: "2018-06-11",
    cameras: ["ENTRY","FHAZ","NAVCAM","PANCAM","RHAZ"],
    slides: mockArr(198439,'O'),
    bg: bgRover2
  },
  {
    id: 333,
    name: 'Spirit Rover',
    slug: 'spirit',
    manifest: 'One of two rovers launched in 2003 to explore Mars and search for signs of past life, Spirit far outlasted her planned 90-day mission. Among her myriad discoveries, Spirit found evidence that Mars was once much wetter than it is today and helped scientists better understand the Martian wind.',
    landing_date: "2004-01-04",
    launch_date: "2003-06-10",
    status: "complete",
    max_sol: 2208,
    start_sol: 2190,
    max_date: "2010-03-21",
    cameras: ["ENTRY","FHAZ","NAVCAM","PANCAM","RHAZ"],
    slides: mockArr(124550,'S'),
    bg: bgRover3
  }
];
