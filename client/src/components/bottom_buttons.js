import React, { Component } from 'react'
import Button from 'material-ui/Button'

class BottomButtons extends Component {
  render () {
    const buttons = this.props.mode === 'readonly'
      ? <div>
          <Button onClick={() => this.props.setMode('edit')}>edit</Button>
          <Button>comments</Button>
        </div>
      : <div>
          <Button>add node</Button>
          <Button>add edge</Button>
          <Button>save</Button>
          <Button onClick={() => this.props.setMode('readonly')}>done</Button>  
        </div>

    return (
      <div>
        {buttons}
      </div>
    )
  }
}

export default BottomButtons
