import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { Component } from 'react';
import './index.css'

class MiniUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user
        }
    }
    render() {
        return this.state.user !== 'unauthorized' ?
            this.state.user.avatar ?
                <li><Paper className='postContainer'>
                    <img src={this.state.user.avatar} className='miniUserImg' alt='avatar'></img>
                    <p>{this.state.user.username}</p>
                    <Link to={`/users/${this.state.user._id}`} ><Button>Profile</Button></Link>
                    <Button onClick={this.handleClick}>{this.state.user.isFollowed ? 'Unfollow' : 'Follow'}</Button>
                </Paper></li >
                :
                null
            :
            <Redirect to='/' />
    }
    handleClick = () => {
        const headers = {
            Authorization: 'Bearer ' + localStorage.token
        }
        const options = {
            headers: headers,
            method: 'POST'
        }
        fetch(`https://propulsion-blitz.herokuapp.com/api/users/${this.props.user._id}/follow`, options)
            .then(res => res.status === 401 ? 'unauthorized' : res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    user: data
                })
            })
    }
}

export default MiniUser;