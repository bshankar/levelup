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

function nextUniqueId () {
  this.state.idCounter++
  return 'id' + this.state.idCounter
}

function addNode () {
  const newNode = {
    id: nextUniqueId(),
    description: 'some description here',
    weight: 25,
    status: 'locked',
    comments: []
  }
  this.state.graph.nodes.push(newNode)
  this.state.graph.edges.push([])
  this.state.graph.deps.push([])
  this.setState({currentNode: newNode})
}

function addEdge (index1, index2) {
  this.state.graph.edges[index1].push(index2)
  this.state.graph.deps[index2].push(index1)
  this.setState({graph: this.state.graph})
}

function deleteEdge (index1, index2) {
  this.state.graph.edges[index1].splice(index2, 1)
  this.state.graph.deps[index2].splice(index1, 1)
  this.setState({graph: this.state.graph})
}

function addChild () {
  const index1 = this.state.graph.nodes.indexOf(this.state.currentNode)
  addNode()
  const index2 = this.state.graph.nodes.length - 1
  addEdge(index1, index2)
}

function deleteNode () {
  const i = this.state.graph.nodes.indexOf(this.state.currentNode)
  this.state.graph.nodes.splice(i, 1)
  this.state.graph.edges.splice(i, 1)
  this.state.graph.deps.splice(i, 1)
  this.setState({currentNode: null})
}

function getStrippedGraph () {
  return {...this.state.graph, nodes: this.state.graph.nodes
                     .filter(n => n.id !== undefined)
                     .map(n => ({
                       id: n.id,
                       description: n.description,
                       weight: n.weight,
                       status: n.status,
                       comments: n.comments}))}
}

export {
  tryUnlockingNexts,
  handleStatusClick,
  addNode,
  addEdge,
  addChild,
  deleteNode,
  deleteEdge,
  getStrippedGraph
}
