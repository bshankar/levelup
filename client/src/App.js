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
import './App.css'

class App extends Component {
  
  state = {
    graph: null,
    currentNode: null,
    loggedin: null
  }

  constructor (props) {
    super(props)
    this.createProgressGraph = createProgressGraph.bind(this)
  }

  componentDidMount () {
    if (this.node !== undefined)
      this.createProgressGraph()
  }

  getComment (nameRef, commentRef) {
    const name = nameRef.value
    const comment = commentRef.value
    return {name: name, comment: comment}
  }

  addComment (nameRef, commentRef, formRef) {
    const c = this.getComment(nameRef, commentRef)
    if (c.name !== '' && c.comment !== '') {
      this.state.currentNode.comments.unshift(c)
      this.setState({graph: this.state.graph})
    }
    formRef.reset()
  }

  tryUnlockingNexts() {
    const i = this.state.graph.nodes.indexOf(this.state.currentNode)
    this.state.graph.edges[i].filter(n => this.state.graph.nodes[n].status === 'locked')
      .filter(k => this.state.graph.deps[k].reduce((res, e) => res && this.state.graph.nodes[e].status === 'finished', true))
      .map(v => {
        this.state.graph.nodes[v].status = 'unlocked'
        this.setState({graph: this.state.graph})
      })
  }

  handleStatusClick() {
    const i = this.state.graph.nodes.indexOf(this.state.currentNode)
    switch (this.state.graph.nodes[i].status) {
    case 'unlocked':
      this.state.graph.nodes[i].status = 'progress'
      this.setState({graph: this.state.graph})
      break
    case 'progress':
      this.state.graph.nodes[i].status = 'finished'
      this.setState({graph: this.state.graph})
      this.tryUnlockingNexts(i)
      break
    default:
      break
    }
  }

  openUserHome (user) {
    const appObj = this
    axios.get('/users/' + user + '/graph/javascript').then(function (res) {
      appObj.setState({graph: res.data, loggedin: user})
      appObj.createProgressGraph()
    }).catch(function (err) {
      throw err
    })
  }

  render () {
    const currentNode = this.state.currentNode
    const mainContainerClass = 'col ' + (currentNode !== null ? 's6' : 's10')
    
    const rightBarJsx = currentNode !== null ? <div style={{margin: '0.5em'}}>
          <Typography type="title"> {currentNode.id} </Typography>
          <p/>    
          <Typography type="body1"> {currentNode.description} </Typography>
          <p/><p/>
          <Button onClick={this.handleStatusClick.bind(this)}> {currentNode.status} </Button>
          <Divider light />
          <Typography type="title"> Comments </Typography>
          <Comments currentNode={currentNode} addComment={this.addComment.bind(this)} />
          </div> : <p/>

    const mainContainerJsx = this.state.loggedin ?  <div><TopButtons />
      <svg ref={node => this.node = node} width={500} height={560} ></svg>
      <BottomButtons /></div> : <LoginRegisterForm afterLogin={this.openUserHome.bind(this)} />

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
