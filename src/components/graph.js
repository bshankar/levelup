import React, { Component } from 'react'
import * as d3 from 'd3'
import graph from '../data/javascript'

class ProgressGraph extends Component {
  constructor (props) {
    super(props)
    this.createProgressGraph = this.createProgressGraph.bind(this)
  }

  componentDidMount () {
    this.createProgressGraph()
  }

  componentDidUpdate () {
    this.createProgressGraph()
  }

  createProgressGraph () {
    const svg = d3.select(this.node)
    const width = +svg.attr('width')
    const height = +svg.attr('height')

    const color = d3.scaleOrdinal(d3.schemeCategory20)

    const simulation = d3.forceSimulation()
          .force('link', d3.forceLink().distance(10).strength(0.5))
          .force('collision', d3.forceCollide(48))
          .force('charge', d3.forceManyBody())
          .force('center', d3.forceCenter(width / 2, height / 2))

    const nodes = graph.nodes
    const nodeById = d3.map(nodes, function (d) { return d.id })
    const links = graph.links
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
          .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended))

    node.append('title').text(function (d) { return d.id })

    simulation.nodes(nodes).on('tick', ticked)
    simulation.force('link').links(links)

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

    function dragstarted (d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged (d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    function dragended (d) {
      if (!d3.event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }
  }

  render () {
    return <svg ref={node => this.node = node} width={500} height={500} ></svg>
  }
}

export default ProgressGraph
