import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class SideBar extends Component {
  render () {
    return (
      <div className="col s2">
        <input class="input" type="text" placeholder="Search"/>
      </div>
    )
  }
}

class TopButtons extends Component {
  render () {
    return (
      <div style={{position: 'absolute', right: '0.5em', top: '0.5em'}}>
        <button class="btn waves-effect waves-light btn-flat">Logout
        </button>
      </div>
    )
  }
}

class BottomButtons extends Component {
  render () {
    return (
      <div style={{position: 'absolute', right: '0.5em', bottom: '0.5em'}}>
        <button class="btn waves-effect waves-light btn-flat">Comments
        </button>
      </div>
    )
  }
}

class MainContainer extends Component {
  render () {
    return (
      <div className="col s9">
        <TopButtons />
        <BottomButtons />
      </div>
    )
  }
}

class App extends Component {
  render () {
    return (
      <div class="row">
        <SideBar />
        <MainContainer />
      </div>
    )
  }
}

export default App
