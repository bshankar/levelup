import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Typography from 'material-ui/Typography'

class LoginRegisterForm extends Component {

  register () {
    
  }

  login () {
    
  }

  onChangeConfirmPassword () {
    
  }

  render () {
    return (
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
      <Button raised onClick={this.login}>Login</Button>
      </form>
      </Grid>

      </Grid>
    )
  }
}

export default LoginRegisterForm
