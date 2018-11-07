import { connection } from '../../helpers/mapStateToProps';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
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
        <Redirect to='/me'></Redirect>
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

    const headers = new Headers({
      "Content-type": "application/json"
    })

    const body = JSON.stringify({
      email: 'fake4@email.com',
      password: 'password'
    })

    const options = {
      method: 'POST',
      body: body,
      headers: headers
    }

    fetch('https://propulsion-blitz.herokuapp.com/api/login', options)
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({
          type: 'changeToken',
          token: data.token,
          id: data._id
        })
      })
  }
}

const connectedLogin = connection(Login)

export default connectedLogin;
