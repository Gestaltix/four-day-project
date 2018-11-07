import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';

class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }

    render() {
        return (
            <Paper>
                <form onSubmit={this.submitHandler}>
                    <TextField label='Content' value={this.state.content} onChange={this.changeContent}></TextField>
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
        e.preventDefault();

        const headers = new Headers({
            Authorization: 'Bearer ' + this.props.token
        })

        const body = JSON.stringify(this.state)

        const options = {
            method: 'POST',
            body: body,
            headers: headers
        }

        fetch('https://propulsion-blitz.herokuapp.com/api/blitzs/', options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
}

export default NewPost;