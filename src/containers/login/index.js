import React, { Component } from 'react';
import { connection } from '../../helpers/mapStateToProps'
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      accessToken: null
    }
  }

  render() {
    return (
      !this.props.token ?
        <form onSubmit={this.submitLogin}>
          <TextField label='Email'></TextField>
          <TextField label='Password'></TextField>
          <div><Button type='form'>Log In</Button></div>
        </form> :
        <Redirect to='/feed'></Redirect>
    );
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
  submitLogin = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      body: {
        username: 'fake4@email.com',
        password: 'password'
      }
    }
    fetch('https://propulsion-blitz.herokuapp.com/api/login', options)
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({
          type: 'changeToken',
          token: data.token,
        })
      })
  }
}

const connectedLogin = connection(Login)

export default connectedLogin;
