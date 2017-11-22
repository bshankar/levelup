import React, { Component } from 'react'
import Button from 'material-ui/Button'

class BottomButtons extends Component {
  render () {
    const buttons = this.props.mode === 'readonly'
          ? <div><Button>edit</Button>
            <Button>comments</Button>
            </div> : <div><Button>save</Button></div>

    return (
      <div>
        {buttons}
      </div>
    )
  }
}

export default BottomButtons
