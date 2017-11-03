import React, { Component } from 'react'
import { Layer, Text, Rect, Stage } from 'react-konva'

function createNode (title, description, size, status) {
  return {
    title: title,
    description: description,
    size: size,
    status: status
  }
}

const statusToColors = {
  'root': 'goldenrod',
  'locked': 'grey',
  'unlocked': 'lightgreen',
  'progress': 'green',
  'finished': 'gold'
}

class GraphNode extends Component {

  render() {
    return (
        <Text
          x={this.props.x}
          y={this.props.y}
          text={this.props.node.title}
          fontSize={this.props.node.size}
          fill={statusToColors[this.props.node.status]}
          onClick={this.props.onClick}
        />
    )
  }
}

class LegendRect extends Component {
  render() {
    return (
      <Rect
        width={25}
        height={25}
        x={this.props.x}
        y={this.props.y}
        fill={this.props.color}
      />
    )
  }
}

class LegendLabel extends Component {
  render() {
    return (
      <Text
        fontSize={16}
        fill={'dimgrey'}
        x={this.props.x}
        y={this.props.y}
        text={this.props.text}
      />
    )
  }
}

class ProgressGraph extends Component {
  state = { nodes: [
    createNode('JS', 'Javascript journey starts here!', 64, 'root'),
    createNode('EJS', 'Eloquent Javascript chapters 1 to 6', 28, 'unlocked'),
    createNode('HRK', 'Get hackerrank rank in algorithms section below 10k', 22, 'unlocked'),
    createNode('Project', 'Do a simple project', 35, 'locked'),
    createNode(':42', 'Search for the meaning of life', 25, 'locked')
  ]}

  sampleGraph = [[1, 2], [3], [3], [4], []]
  graphDependencies = [[], [0], [0], [1, 2], [3]]

  statusToColors = {
    'root': 'goldenrod',
    'locked': 'grey',
    'unlocked': 'lightgreen',
    'progress': 'green',
    'finished': 'gold'
  }

  tryUnlockingNexts(i) {
    this.sampleGraph[i].filter(n => this.state.nodes[n].status === 'locked')
      .filter(k => this.graphDependencies[k].reduce((res, e) => res && this.state.nodes[e].status === 'finished', true))
      .map(v => this.setState({nodes: [
        ...this.state.nodes.slice(0, v),
        {...this.state.nodes[v], status: 'unlocked'},
        ...this.state.nodes.slice(v + 1)]}))
  }

  handleClick(i) {
    console.log('clicked at ', i)
    switch (this.state.nodes[i].status) {
    case 'unlocked':
      this.setState({nodes: [
        ...this.state.nodes.slice(0, i),
        {...this.state.nodes[i], status: 'progress'},
        ...this.state.nodes.slice(i + 1)]})
      break
    case 'progress':
      this.setState({nodes: [
        ...this.state.nodes.slice(0, i),
        {...this.state.nodes[i], status: 'finished'},
        ...this.state.nodes.slice(i + 1)]})
      this.tryUnlockingNexts(i)
      break
    default:
      break
    }
  }

  render() {
    return (
      <Stage width={700} height={700}>
        <Layer>
          <GraphNode x={350} y={360} node={this.state.nodes[0]} onClick={() => this.handleClick(0)} />
          <GraphNode x={450} y={280} node={this.state.nodes[1]} onClick={() => this.handleClick(1)} />
          <GraphNode x={250} y={280} node={this.state.nodes[2]} onClick={() => this.handleClick(2)} />
          <GraphNode x={320} y={200} node={this.state.nodes[3]} onClick={() => this.handleClick(3)} />
          <GraphNode x={350} y={120} node={this.state.nodes[4]} onClick={() => this.handleClick(4)} />

          <LegendRect x={100} y={600} color={'grey'} />
          <LegendLabel x={133} y={610} text={'locked'}/>
          <LegendRect x={220} y={600} color={'lightgreen'} />
          <LegendLabel x={253} y={610} text={'unlocked'}/>
          <LegendRect x={350} y={600} color={'green'} />
          <LegendLabel x={380} y={610} text={'progress'}/>
          <LegendRect x={470} y={600} color={'gold'} />
          <LegendLabel x={500} y={610} text={'complete'}/>
          <LegendRect x={585} y={600} color={'goldenrod'} />
          <LegendLabel x={615} y={610} text={'start'}/>
        </Layer>
      </Stage>
    )
  }
}

export default ProgressGraph
