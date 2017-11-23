import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import TextField from 'material-ui/TextField'
import List, {ListItem, ListItemText} from 'material-ui/List'
import Button from 'material-ui/Button'

class SideBar extends Component {
  render () {
    return (
      <Drawer type="persistent" open={this.props.open}>
        <TextField label="Search" style={{marginLeft: '1em', marginRight: '1em'}}></TextField>
        <List style={{marginTop: '1em'}}>
          <ListItem button>JavaScript</ListItem>
          <ListItem button>Clojure</ListItem>
          <ListItem button>Python</ListItem>
          <Button raised style={{margin: '1em'}}>add new</Button>
        </List>
      </Drawer>
    )
  }
}

export default SideBar
