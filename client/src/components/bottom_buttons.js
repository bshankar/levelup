import React, { Component } from 'react'
import Button from 'material-ui/Button'

class BottomButtons extends Component {
  render () {
    let buttons = <div>
                    <Button onClick={() => this.props.setMode('edit')}>edit</Button>
                    <Button onClick={() => this.props.setMode('edit_raw')}>edit raw</Button>
                    <Button>comments</Button>
                  </div>

    if (this.props.mode === 'edit') {
      buttons = <div>
                  <Button>(+) node</Button>
                  <Button>(+) edge</Button>
                  <Button>(-) node</Button>
                  <Button>(-) edge</Button>
                  <Button>save</Button>
                  <Button onClick={() => this.props.setMode('readonly')}>done</Button>
                </div>
    } else if (this.props.mode === 'edit_raw') {
      buttons = <Button onClick={() => this.props.setMode('readonly')}>done</Button>
    }

    return (
      <div>
        {buttons}
      </div>
    )
  }
}

export default BottomButtons
