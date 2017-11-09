import React, { Component } from 'react'
import List, {ListItem, ListItemText} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Button from 'material-ui/Button'

class Comments extends Component {

  commentToJSX (c) {
    return <ListItem button>
      <ListItemText primary={c.name} secondary={c.comment} />
      </ListItem>
  }

  render () {
    const commentList = this.props.currentNode
          .comments
          .map(this.commentToJSX)

    return (
        <form id="comment_form">
        <FormControl fullwidth>
        <TextField id="textfield_name" label="name" />
        <TextField id="textfield_name" label="comment" />
        </FormControl>
        <br/>
        <Button raised>Submit</Button>
        <List>
        {commentList}
        </List>
        </form>
    )
  }
}

export default Comments
