import axios from 'axios'

function openUserHome () {
  const appObj = this
  axios.get('/dashboard', {withCredentials: true}).then(function (res) {
    if (res.data.user !== undefined) {
      axios.get('/users/' + res.data.user + '/graph/' + res.data.currentGraph,
                {withCredentials: true}).then(function (rres) {
                  console.log(rres.data, res.data.user)
                  appObj.setState({graph: rres.data, loggedin: res.data.user})
                  appObj.createProgressGraph()
                }).catch(function (err) {
                  throw err
                })
    } else appObj.setState({loggedin: null})
  }).catch(function (err) {
    throw err
  })
}

function closeSession () {
  const appObj = this
  axios.get('/logout', {withCredentials: true}).then(function (res) {
    appObj.setState({loggedin: null, mode: 'readonly', currentNode: null})
  }).catch(function (err) {
    throw err
  })
}

function postGraph () {
  const bareGraph = {...this.state.graph, nodes: this.state.graph.nodes
                     .filter(n => n.id !== undefined)
                     .map(n => ({
                       id: n.id,
                       description: n.description,
                       weight: n.weight,
                       status: n.status,
                       comments: n.comments}))}
  
  axios.post('/users/' + this.state.loggedin + '/graph/' + this.state.graph.id,
    bareGraph, {withCredentials: true}).catch(
    function (err) {
      throw err
    }
  )
}

export {openUserHome, closeSession, postGraph}
