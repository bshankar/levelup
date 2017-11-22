import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import { FormControl, FormHelperText } from 'material-ui/Form'

import Comments from './comments'
import StatusListMenu from './selected_menu'

class RightBar extends Component {

  render () {
    const currentNode = this.props.currentNode
    let rightBarJsx = <p/>
    if (currentNode !== undefined && currentNode !== null) {
      if (this.props.mode === 'readonly') {
        rightBarJsx = <div style={{margin: '0.5em'}}>
                        <Typography type="title"> {currentNode.id} </Typography>
                        <p/>
                        <Typography type="body1"> {currentNode.description} </Typography>
                        <p/><p/>
                        <Button onClick={this.props.handleStatusClick}> {currentNode.status} </Button>
                        <Divider light />
                        <Typography type="title"> Comments </Typography>
                        <Comments currentNode={currentNode} addComment={this.props.addComment} />
                      </div>
      } else {
        rightBarJsx = <form style={{"margin": "0.7em"}}>
                        <FormControl fullwidth>
                          <TextField label="title" value={currentNode.id}></TextField>
                          <TextField label="weight" value={currentNode.weight}></TextField>
                          <TextField label="description" value={currentNode.description} multiline margin="normal"></TextField>
                        </FormControl>
                        <br/>
                        <StatusListMenu currentNode={currentNode} />
                        <Button raised>save</Button>
                        <Divider light style={{"margin": "1em"}} />
                        <div style={{"marginTop": "0.5em"}}>
                          <Button>add child</Button>
                          <Button>delete</Button>
                        </div>
                      </form>
      }
    }
    return rightBarJsx
  }
}

export default RightBar
