import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import './index.css'

class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }

    render() {
        return (
            <Paper className='newPostPaper'>
                <form onSubmit={this.submitHandler}>
                    <TextField variant='outlined' label='Content' value={this.state.content} onChange={this.changeContent} fullWidth></TextField>
                    <div><Button type='form'>BLITZ</Button></div>
                </form>
            </Paper>
        );
    }
    changeContent = (e) => {
        this.setState({
            content: e.currentTarget.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        const headers = new Headers({
            'content-type': 'application/json',
            Authorization: 'Bearer ' + localStorage.token
        })

        const body = JSON.stringify(this.state)

        const options = {
            method: 'POST',
            body: body,
            headers: headers
        }

        fetch('https://propulsion-blitz.herokuapp.com/api/blitzs/', options)
    }
}

export default NewPost;