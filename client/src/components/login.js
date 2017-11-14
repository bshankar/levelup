import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Typography from 'material-ui/Typography'

class LoginRegisterForm extends Component {

  render () {
    return (
      <Grid container>

      <Grid item xs={6}>
      <form>
      <Typography type="headline">Register</Typography>
      <TextField label="username" />
      <TextField label="password" />
      <TextField label="confirm password" />
      <Button raised>Register</Button>
      </form>
      </Grid>

      <Grid item xs={6}>
      <form>
      <Typography type="headline">Login</Typography>
      <TextField label="username" />
      <TextField label="password" />
      <Button raised>Login</Button>
      </form>
      </Grid>

      </Grid>
    )
  }
}

export default LoginRegisterForm
