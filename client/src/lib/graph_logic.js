function tryUnlockingNexts () {
  const i = this.state.graph.nodes.indexOf(this.state.currentNode)
  this.state.graph.edges[i].filter(n => this.state.graph.nodes[n].status === 'locked')
    .filter(k => this.state.graph.deps[k].reduce((res, e) => res && this.state.graph.nodes[e].status === 'finished', true))
    .map(v => {
      this.state.graph.nodes[v].status = 'unlocked'
      this.setState({graph: this.state.graph})
    })
}

function handleStatusClick () {
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

export {tryUnlockingNexts, handleStatusClick}
