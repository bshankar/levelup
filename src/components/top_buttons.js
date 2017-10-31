import React, { Component } from 'react'

class TopButtons extends Component {
  render () {
    return (
      <div style={{position: 'absolute', right: '0.5em', top: '0.5em'}}>
        <button className="btn waves-effect waves-light btn-flat">Logout
        </button>
      </div>
    )
  }
}

export default TopButtons
