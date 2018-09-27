import React from 'react'
import { Route } from 'react-router-dom'
import About from './About'
import Explore from './Explore'

const Scenes = () => (
  <div>
    <Route exact path="/" component={Explore} />
    <Route path="/about" component={About} />
  </div>
)

export default Scenes
