import React, { Component } from 'react'
import SideBar from './components/sidebar'
import MainContainer from './components/main_container'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className="row">
        <SideBar />
        <MainContainer />
      </div>
    )
  }
}

export default App
