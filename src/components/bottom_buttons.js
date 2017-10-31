import React, { Component } from 'react'

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

export default BottomButtons
