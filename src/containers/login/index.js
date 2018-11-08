import { connection } from '../../helpers/mapStateToProps';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
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
            <form onSubmit={this.handleRegistration}>
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

  handleRegistration = (e) => {
    e.preventDefault()
    const headers = new Headers({
      "Content-type": "application/json"
    })

    const body = JSON.stringify({
      email: this.state.email,
      password: this.state.password
    })

    const options = {
      method: 'POST',
      body: body,
      headers: headers
    }
    fetch('https://propulsion-blitz.herokuapp.com/api/users', options)
      .then(res => res.json())
      .then(data => { console.log(data) })
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
      // Use the two lines below to test the login
      // email: this.state.email,
      // password: this.state.password
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
        localStorage.setItem('token', data.token);
        this.props.dispatch({
          type: 'setId',
          id: data._id
        })
        this.props.dispatch({
          type: 'setToken',
          token: data.token
        })
      })
  }
}

const connectedLogin = connection(Login)

export default connectedLogin;
