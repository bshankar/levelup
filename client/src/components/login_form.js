import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import axios from 'axios'

class LoginRegisterForm extends Component {

  state = {errorMsg: ''}
  
  register () {
    const username = this.usernameRegister.value
    const password = this.passwordRegister.value
    const confirmPassword = this.confirmPassword.value

    let errorMsg = ''
    if (!this.isValidUser(username)) errorMsg = 'Username cannot be empty or a number'
    else if (!this.isValidPass(password)) errorMsg = 'Password cannot be empty'
    else if (password !== confirmPassword) errorMsg = 'Passwords don\'t match'
    else if (errorMsg === '') {
      // register on the server
    }
    this.setState({...this.state, errorMsg: errorMsg})
  }

  login () {
    const username = this.usernameLogin.value
    const password = this.passwordLogin.value
    const errorMsg = this.checkUsername(username) ||
                     this.checkPassword(password) ||
                     this.tryServerLogin(username, password)

    this.setState({...this.state, errorMsg: errorMsg})
  }

  checkUsername (username) {
    return username !== '' && isNaN(username) ? '' :'Username cannot be empty or a number'
  }

  checkPassword (password, confirmPassword) {
    return password !== '' ? '' : 'Password cannot be empty'
  }

  tryServerLogin (username, password) {
    const formObj = this
    const errorMsg = ''

    axios.post('/login', {
      username: username,
      password: password
    }).then(function (response) {
      if (response.data === 'ok') {
        // login
      } else formObj.setState({...formObj.state, errorMsg: response.data})
    }).catch(function (error) {
      formObj.setState({...formObj.state, errorMsg: error.message})
    })
  }

  render () {
    return (
      <div>
      <Grid container>

      <Grid item xs={6}>
      <form ref={el => this.registerForm = el}>
      <Typography type="headline">Register</Typography>
      <TextField label="username" inputRef={el => this.usernameRegister = el} />
      <TextField label="password" inputRef={el => this.passwordRegister = el} type="password" />
      <TextField label="confirm password"
        inputRef={el => this.confirmPassword = el}
        type="password" />
      <Button raised onClick={this.register.bind(this)}>Register</Button>
      </form>
      </Grid>

      <Grid item xs={6}>
      <form ref={el => this.loginForm = el}>
      <Typography type="headline">Login</Typography>
      <TextField label="username" inputRef={el => this.usernameLogin = el} />
      <TextField label="password" inputRef={el => this.passwordLogin = el} type="password" />
      <Button raised onClick={this.login.bind(this)}>Login</Button>
      </form>
      </Grid>

      </Grid>
      <Typography type="title" style={{margin: "2em", color: "red"}}> {this.state.errorMsg} </Typography> 
      </div>
    )
  }
}

export default LoginRegisterForm
