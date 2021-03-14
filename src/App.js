import React from 'react'
import './App.css';
import { Route } from 'react-router-dom'

import Home from './layouts/Home'
import Results from './layouts/Results'

const App = () => {

  return (
  <>
    <Route exact path='/' component={Home} />
    <Route exact path='/results' component={Results} />
  </>
  );
}

export default App;
