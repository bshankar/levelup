import React, { Component } from 'react'

class TopButtons extends Component {
  render () {
    return (
        <div style={{position: 'relative', right: '0.5em', top: '0.5em'}}>
        <button className="btn waves-effect waves-light btn-flat">All Trophies (0)</button>
        <button className="btn waves-effect waves-light btn-flat">Level 0</button>
        <button className="btn waves-effect waves-light btn-flat">Logout</button>
      </div>
    )
  }
}

export default TopButtons
