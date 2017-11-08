import React, { Component } from 'react'
import * as d3 from 'd3'
import SideBar from './components/sidebar'
import TopButtons from './components/top_buttons'
import BottomButtons from './components/bottom_buttons'
import graph from './data/javascript'
import './App.css'

class App extends Component {

  state = {
    graph: graph,
    currentNode: null
  }

  createProgressGraph () {
    const svg = d3.select(this.node)
    const width = +svg.attr('width')
    const height = +svg.attr('height')
    const appObj = this
    const color = d3.scaleOrdinal(d3.schemeCategory20)

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
          .on('click', function (d) { appObj.setState({...appObj.state, currentNode: d}) } )

    node.append('title').text(function (d) { return d.id })

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
        .duration(200)
        .style('opacity', 0.9)

      const toolTipHtml = '<div><p>Status:</p><h6>' + d.status + '</h6>' +
            '<p></p><p>Description:</p><p>' + d.description + '</p></div>'

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
  
  componentDidMount () {
    this.createProgressGraph()
  }

  render () {
    const currentNode = this.state.currentNode

    const mainContainerClass = 'col ' + (currentNode !== null ? 's6' : 's10')

    const rightBarHtml = (currentNode !== null) ?
          <div>
            <h3> {currentNode.id}</h3>
            <p/>
            <p> {currentNode.description} </p>
            <p/>
            <h5> Comments </h5>
          </div> :
          <p/>
    
    return (
      <div className="row">
        <SideBar />
        
        <div className={mainContainerClass}>
          <TopButtons />
          <svg ref={node => this.node = node} width={500} height={500} ></svg>        
          <BottomButtons />
        </div>

        <div className="col s4">
        {rightBarHtml}
        </div>        
      </div>
    )
  }
}

export default App
