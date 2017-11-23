import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Drawer from 'material-ui/Drawer'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import axios from 'axios'

import LeftBar from './components/left_bar'
import RightBar from './components/right_bar'
import TopButtons from './components/top_buttons'
import BottomButtons from './components/bottom_buttons'
import LoginRegisterForm from './components/login_form'

import createProgressGraph from './lib/draw_graph'
import {openUserHome, closeSession, postGraph} from './lib/axios_utils'
import {tryUnlockingNexts, handleStatusClick, getStrippedGraph} from './lib/graph_logic'
import {getComment, addComment} from './lib/form_utils'
import './App.css'

class App extends Component {
  
  state = {
    graph: null,
    currentNode: null,
    mode: 'readonly',
    idCounter: 0
  }

  constructor (props) {
    super(props)
    this.createProgressGraph = createProgressGraph.bind(this)
    this.openUserHome = openUserHome.bind(this)
    this.closeSession = closeSession.bind(this)
    this.postGraph = postGraph.bind(this)
    this.handleStatusClick = handleStatusClick.bind(this)
    this.tryUnlockingNexts = tryUnlockingNexts.bind(this)
    this.getStrippedGraph = getStrippedGraph.bind(this)
    this.getComment = getComment.bind(this)
    this.addComment = addComment.bind(this)
    this.openUserHome()
  }

  componentDidMount () {
    if (this.node !== undefined)
      this.createProgressGraph()
  }

  setMode (mode) {
    this.setState({mode: mode})
  }

  render () {
    const currentNode = this.state.currentNode
    const mainContainerClass = 'col ' + (currentNode !== null ? 's6' : 's10')

    let mainContainerJsx = <Typography type="title">Loading...</Typography>
    if (this.state.loggedin === null) mainContainerJsx = <LoginRegisterForm afterLogin={this.openUserHome} />
    else if (this.state.loggedin !== undefined) mainContainerJsx = <div><TopButtons logout={this.closeSession} />
      <svg ref={node => this.node = node} width={500} height={560} ></svg>
      <BottomButtons mode={this.state.mode} setMode={this.setMode.bind(this)} /></div>
    
    return (
      <Grid container>
        <Grid item xs={3}>
          <LeftBar open={this.state.loggedin} />
        </Grid>
      
        <Grid item xs={5}>
          {mainContainerJsx}
        </Grid>

        <Grid item xs={4}>
          <Drawer type="persistent" anchor="right" open={currentNode !== null || this.state.mode === 'edit_raw'}>
            <RightBar
              currentNode={this.state.currentNode}
              graph={this.state.graph}
              mode={this.state.mode}
              addComment={this.addComment}
              handleStatusClick={this.handleStatusClick}
              getStrippedGraph={this.getStrippedGraph} />
          </Drawer>
        </Grid>
      </Grid>
    )
  }
}

export default App
