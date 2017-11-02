import React, { Component } from 'react'
import { Layer, Text, Stage, Arrow, Line } from 'react-konva'

const statusToColors = {
  'locked': 'grey',
  'unlocked': 'lightgreen'
}

class GraphNode extends Component {
  state = { status: 'locked' }

  render() {
    return (
      <Text
        x={this.props.x}
        y={this.props.y}
        text={this.props.text}
        fontSize={this.props.size}
        fill={statusToColors[this.state.status]}
      />
    )
  }
}

class GraphEdge extends Component {
  render() {
    return (
      <Line
        pointerLength={10}
        pointerWidth={10}
        strokeWidth={this.props.thickness}
        points={this.props.points}
        fill={'lightgrey'}
        stroke={'lightgrey'} />
    )
  }
}

class ProgressGraph extends Component {
  render() {
    return (
      <Stage width={700} height={700}>
        <Layer>
        <GraphNode x={350} y={100} text={'Js'} size={64} />
        <GraphNode x={350} y={200} text={'Eloquent'} size={28} />
        <GraphNode x={250} y={200} text={'Hrk'} size={22} />
        <GraphNode x={200} y={250} text={'Node'} size={18} />
        <GraphNode x={300} y={250} text={'Ejs'} size={22} />
        <GraphNode x={400} y={250} text={'ES6'} size={18} />
        <GraphNode x={500} y={250} text={'Project'} size={35} />
        <GraphNode x={350} y={320} text={'Big Project'} size={38} />

        <GraphNode x={100} y={450} text={'Frontend'} size={48} />
        <GraphNode x={250} y={410} text={'HTML/CSS'} size={18} />
        <GraphNode x={200} y={360} text={'React'} size={25} />

        <GraphNode x={500} y={450} text={'DBMS'} size={48} />
        <GraphNode x={510} y={400} text={'Redis'} size={25} />
        <GraphNode x={400} y={400} text={'MongoDB'} size={18} />

        <GraphEdge points={[380, 150, 300, 200]} />
        <GraphEdge points={[380, 150, 400, 200]} />
        </Layer>
      </Stage>
    )
  }
}

export default ProgressGraph
