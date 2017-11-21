import * as d3 from 'd3'

function createProgressGraph () {
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

export default createProgressGraph
