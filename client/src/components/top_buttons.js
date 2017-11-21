import React, { Component } from 'react'
import Button from 'material-ui/Button'

class TopButtons extends Component {
  render () {
    return (
      <div style={{position: 'relative', right: '0.5em', top: '0.5em'}}>
        <Button>All Trophies (0)</Button>
        <Button>Level 0</Button>
        <Button onClick={this.props.logout}>Logout</Button>
      </div>
    )
  }
}

export default TopButtons
