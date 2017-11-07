import React, { Component } from 'react'

class BottomButtons extends Component {
  render () {
    return (
      <div style={{position: 'relative', right: '0.5em', bottom: '0.5em'}}>
        <button className="btn waves-effect waves-light btn-flat">Comments
        </button>
      </div>
    )
  }
}

export default BottomButtons
