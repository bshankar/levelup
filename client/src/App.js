import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Drawer from 'material-ui/Drawer'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import axios from 'axios'

import SideBar from './components/sidebar'
import TopButtons from './components/top_buttons'
import BottomButtons from './components/bottom_buttons'
import Comments from './components/comments'
import LoginRegisterForm from './components/login_form'

import createProgressGraph from './lib/draw_graph'
import {openUserHome, closeSession} from './lib/axios_utils'
import {tryUnlockingNexts, handleStatusClick} from './lib/graph_logic'
import {getComment, addComment} from './lib/form_utils'
import './App.css'

class App extends Component {
  
  state = {
    graph: null,
    currentNode: null,
    mode: 'readonly'
  }

  constructor (props) {
    super(props)
    this.createProgressGraph = createProgressGraph.bind(this)
    this.openUserHome = openUserHome.bind(this)
    this.closeSession = closeSession.bind(this)
    this.handleStatusClick = handleStatusClick.bind(this)
    this.tryUnlockingNexts = tryUnlockingNexts.bind(this)
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
    
    const rightBarJsx = currentNode !== null ? <div style={{margin: '0.5em'}}>
          <Typography type="title"> {currentNode.id} </Typography>
          <p/>    
          <Typography type="body1"> {currentNode.description} </Typography>
          <p/><p/>
          <Button onClick={this.handleStatusClick}> {currentNode.status} </Button>
          <Divider light />
          <Typography type="title"> Comments </Typography>
          <Comments currentNode={currentNode} addComment={this.addComment} />
          </div> : <p/>

    let mainContainerJsx = <Typography type="title">Loading...</Typography>
    if (this.state.loggedin === null) mainContainerJsx = <LoginRegisterForm afterLogin={this.openUserHome} />
    else if (this.state.loggedin !== undefined) mainContainerJsx = <div><TopButtons logout={this.closeSession} />
      <svg ref={node => this.node = node} width={500} height={560} ></svg>
      <BottomButtons mode={this.state.mode} setMode={this.setMode.bind(this)} /></div>
    
    return (
      <Grid container>
        <Grid item xs={3}>
          <SideBar open={this.state.loggedin} />
        </Grid>
      
        <Grid item xs={5}>
          {mainContainerJsx}
        </Grid>

        <Grid item xs={4}>
          <Drawer type="persistent" anchor="right" open={currentNode !== null}>
            {rightBarJsx}
          </Drawer>
        </Grid>
      </Grid>
    )
  }
}

export default App
