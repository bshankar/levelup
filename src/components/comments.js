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
        <form ref={form => { this.form = form }}>
          <FormControl fullwidth>
            <TextField label="name" inputRef={name => { this.name = name }} fullwidth />
            <TextField label="comment" inputRef={comment => { this.comment = comment }} margin="normal" multiline />
          </FormControl>
          <br/>
          <Button raised onClick={() => this.props.addComment(this.name, this.comment, this.form)}>Submit</Button>
          <List>
            {commentList}
          </List>
        </form>
    )
  }
}

export default Comments
