import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Drawer from 'material-ui/Drawer'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'

import * as d3 from 'd3'
import SideBar from './components/sidebar'
import TopButtons from './components/top_buttons'
import BottomButtons from './components/bottom_buttons'
import Comments from './components/comments'
import LoginRegisterForm from './components/login_form'

import graph from './data/javascript'
import './App.css'

class App extends Component {
  
  state = {
    graph: graph,
    currentNode: null,
    loggedin: false
  }

  constructor(props) {
    super(props)
    this.state.graph.nodes = this.state.graph.nodes.map(n => ({...n, comments: [
      { name: "Mukesh", comment: "Master Javascript first dude. Everything else is bullshit" },
      { name: "Ani", comment: "This site is too dope fam" },
      { name: "P4v4n", comment: "If I can fly and become invisible that would be the best!"}
    ]}))
  }
  
  createProgressGraph () {
    const svg = d3.select(this.node)
    const width = +svg.attr('width')
    const height = +svg.attr('height')
    const appObj = this
    const color = d3.scaleOrdinal()
                    .domain(['root', 'locked', 'unlocked', 'progress', 'completed'])
                    .range(['#FF9800', '#607D8B', '#CDDC39', '#4CAF50', '#9E9E9E'])

    const simulation = d3.forceSimulation()
                         .force('link', d3.forceLink().distance(10).strength(0.5))
                         .force('collision', d3.forceCollide(48))
                         .force('charge', d3.forceManyBody())
                         .force('center', d3.forceCenter(width / 2, height / 2))

    const nodes = this.state.graph.nodes
    const nodeById = d3.map(nodes, function (d) { return d.id })
    const links = this.state.graph.links
    const bilinks = []

    links.forEach(function (link) {
      const s = link.source = nodeById.get(link.source)
      const t = link.target = nodeById.get(link.target)
      const i = {} // intermediate node
      nodes.push(i)
      links.push({source: s, target: i}, {source: i, target: t})
      bilinks.push([s, i, t])
    })

    const link = svg.selectAll('.link')
                    .data(bilinks)
                    .enter().append('path')
                    .attr('class', 'link')

    const node = svg.selectAll('.node')
                    .data(nodes.filter(function (d) { return d.id }))
                    .enter().append('text')
                    .attr('class', 'node')
                    .text(d => d.id)
                    .attr('font-size', d => d.weight + 'px')
                    .attr('fill', function (d) { return color(d.status) })
                    .on('mouseover', mouseOver)
                    .on('mouseout', mouseOut)
                    .on('click', function (d) {
                      if (appObj.state.currentNode !== d)
                        appObj.setState({...appObj.state, currentNode: d})
                    })

    simulation.nodes(nodes).on('tick', ticked)
    simulation.force('link').links(links)

    // Define the div for the tooltip
    const tooltipDiv = d3.select('body').append('div')
                         .attr('class', 'tooltip')
                         .style('opacity', 0)

    function ticked () {
      link.attr('d', positionLink)
      node.attr('transform', positionNode)
    }

    function positionLink (d) {
      return 'M' + d[0].x + ',' + d[0].y +
        'S' + d[1].x + ',' + d[1].y +
        ' ' + d[2].x + ',' + d[2].y
    }

    function positionNode (d) {
      return 'translate(' + d.x + ',' + d.y + ')'
    }

    function mouseOver (d) {
      tooltipDiv.transition()
        .duration(400)
        .style('opacity', 0.9)

      const statusToIcons = {
        'root': '<i class="material-icons">launch</i>',
        'locked': '<i class="material-icons">block</i>',
        'unlocked': '<i class="material-icons">event</i>',
        'progress': '<i class="material-icons">mode_edit</i>',
        'completed': '<i class="material-icons">done</i>'
      }

      const toolTipHtml = '<p/>' + statusToIcons[d.status] + '</h6>' + '<p>' + d.description + '</p></div>'

      tooltipDiv.html(toolTipHtml)
                .style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY - 28) + 'px')
    }

    function mouseOut (d) {
      tooltipDiv.transition()
                .duration(500)
                .style('opacity', 0)
    }
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
  
  componentDidMount () {
    if (this.node !== undefined)
      this.createProgressGraph()
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
    <BottomButtons /></div> : <LoginRegisterForm />

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