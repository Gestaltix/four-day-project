import { connection } from '../../helpers/mapStateToProps';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { login, register } from '../../Store/actions';
import { Redirect, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import './index.css';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      value: 0,
    }
  }

  changeEmail = (e) => {
    this.setState({
      email: e.currentTarget.value
    })
  }
  changePassword = (e) => {
    this.setState({
      password: e.currentTarget.value
    })
  }

  render() {
    return (
      !this.props.token ?

        <div>
          <Paper className='loginPaper'>
            <form onSubmit={this.submitLogin}>
              <TextField label='Email' value={this.state.email} onChange={this.changeEmail}></TextField>
              <TextField label='Password' value={this.state.password} onChange={this.changePassword}></TextField>
              <div><Button type='form'>Log In</Button></div>
            </form>
          </Paper>
          <Paper className='loginPaper'>
            <form onSubmit={this.submitRegistration}>
              <TextField label='Email' value={this.state.email} onChange={this.changeEmail}></TextField>
              <TextField label='Password' value={this.state.password} onChange={this.changePassword}></TextField>
              <div><Button type='form'>Register</Button></div>
            </form>
          </Paper>
        </div>
        :
        <Redirect to='/feed'></Redirect>
    );
  }

  submitLogin = (e) => {
    e.preventDefault()
    this.props.dispatch(login(this.state.email, this.state.password))
  }

  submitRegistration = (e) => {
    e.preventDefault();
    this.props.dispatch(register(this.state.email, this.state.password))
  }
}

const connectedLogin = connection(Login)

export default withRouter(connectedLogin);
