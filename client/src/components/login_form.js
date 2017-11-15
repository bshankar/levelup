import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

class LoginRegisterForm extends Component {

  state = {loginErrorMsg: ''}

  
  register () {
    
  }

  login () {
    const username = this.usernameLogin.value
    const password = this.passwordLogin.value
    let errorMsg = ''
    if (!this.isValidUser(username)) errorMsg = 'Username cannot be empty or a number'
    else if (!this.isValidPass(password)) errorMsg = 'Password cannot be empty'
    else {
      const data = [username, password]

      fetch('/login', {method: "POST", body: data}).then(res => {
        console.log(res)
        if (res.ok) console.log(res)
        else errorMsg = 'Error in response'
      }, e => errorMsg = 'Server not found')
    }
    this.setState({...this.state, loginErrorMsg: errorMsg})
  }

  isValidUser (username) {
    return username !== '' && isNaN(username)
  }

  isValidPass (password) {
    return password !== ''
  }

  onChangeConfirmPassword () {
    
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
        type="password"
        onChange={this.onChangeConfirmPassword} />
      <Button raised onClick={this.register}>Register</Button>
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
      <Typography type="title" style={{margin: "2em", color: "red"}}> {this.state.loginErrorMsg} </Typography> 
      </div>
    )
  }
}

export default LoginRegisterForm
