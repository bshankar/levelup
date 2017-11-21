import axios from 'axios'

function openUserHome (user) {
  const appObj = this
  axios.get('/users/' + user + '/graph/javascript').then(function (res) {
    appObj.setState({graph: res.data, loggedin: user})
    appObj.createProgressGraph()
  }).catch(function (err) {
    throw err
  })
}

export {openUserHome}
