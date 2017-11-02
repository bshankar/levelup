import React, { Component } from 'react'
import { Layer, Text, Stage, Arrow, Line } from 'react-konva'
import ReactTooltip from 'react-tooltip'

function createNode (title, description, size, status) {
  return {
    title: title,
    description: description,
    size: size,
    status: status
  }
}

function getRequirements(node, graph) {
  
}

const nodes = [
  createNode('JS', 'Javascript journey starts here!', 64, 'root'),
  createNode('EJS', 'Eloquent Javascript chapters 1 to 6', 28, 'unlocked'),
  createNode('HRK', 'Get hackerrank rank in algorithms section below 10k', 22, 'unlocked'),
  createNode('Project', 'Do a simple project', 35, 'locked'),
  createNode(':42', 'Search for the meaning of life', 25, 'locked')
]

const sampleGraph = [[1, 2], [3], [3], [4]]

const statusToColors = {
  'root': 'goldenrod',
  'locked': 'grey',
  'unlocked': 'lightgreen',
  'progress': 'green',
  'finished': 'gold'
}

class GraphNode extends Component {
  state = { status: this.props.node.status }

  handleClick = () => {
    switch (this.state.status) {
    case 'unlocked':
      this.setState({status: 'progress'})
      break
    case 'progress':
      this.setState({status: 'finished'})
      break
    }
  }
  
  render() {
    return (
        <Text
          x={this.props.x}
          y={this.props.y}
          text={this.props.node.title}
          fontSize={this.props.node.size}
          fill={statusToColors[this.state.status]}
          onClick={this.handleClick}
        />
    )
  }
}

class ProgressGraph extends Component {
  render() {
    return (
      <Stage width={700} height={700}>
        <Layer>
        <GraphNode x={350} y={360} node={nodes[0]} />
        <GraphNode x={450} y={280} node={nodes[1]} />
        <GraphNode x={250} y={280} node={nodes[2]} />
        <GraphNode x={320} y={200} node={nodes[3]} />
        <GraphNode x={350} y={120} node={nodes[4]} />
        </Layer>
      </Stage>
    )
  }
}

export default ProgressGraph
