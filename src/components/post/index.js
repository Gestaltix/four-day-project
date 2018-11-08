import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blitz: this.props.blitz
        }
    }
    render() {
        return this.state.blitz !== 'unauthorized' ?
            this.state.blitz.content ?
                <li><Paper className='postContainer'>
                    <img
                        src={this.state.blitz._user.avatar}
                        className='postAvatar' alt='Avatar' />
                    <p><Link to={`/users/${this.state.blitz._user._id}`} ><Button>Profile</Button></Link></p>
                    <p>{this.state.blitz.content}</p>
                    <Button onClick={this.handleClick}>{this.state.blitz.isLiked ? 'Unlike' : 'Like'}</Button>
                </Paper></li >
                :
                null
            :
            <Redirect to='/' />
    }
    componentDidMount = () => {
    }
    handleClick = () => {
        const headers = {
            Authorization: 'Bearer ' + localStorage.token
        }
        const options = {
            headers: headers,
            method: 'POST'
        }
        fetch(`https://propulsion-blitz.herokuapp.com/api/blitzs/${this.props.blitz._id}/like`, options)
            .then(res => res.status === 401 ? 'unauthorized' : res.json())
            .then(data => {
                this.setState({
                    blitz: data
                })
            })
    }
}

export default Post;