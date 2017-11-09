import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import TextField from 'material-ui/TextField'

class SideBar extends Component {
  render () {
    return (
      <Drawer type="permanent" >
        <TextField label="Search" style={{marginLeft: '1em', marginRight: '1em'}}></TextField>
      </Drawer>
    )
  }
}

export default SideBar
