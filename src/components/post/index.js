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
            post: this.props.post
        }
    }
    render() {
        return this.state.post !== 'unauthorized' ?
            this.state.post.content ?
                <li><Paper className='postContainer'>
                    <img
                        src={this.state.post._user.avatar}
                        className='postAvatar' alt='Avatar' />
                    <p><Link to={`/users/${this.state.post._user._id}`} ><Button>Profile</Button></Link></p>
                    <p>{this.state.post.content}</p>
                    <Button onClick={this.handleClick}>{this.state.post.isLiked ? 'Unlike' : 'Like'}</Button>
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
        fetch(`https://propulsion-post.herokuapp.com/api/posts/${this.props.post._id}/like`, options)
            .then(res => res.status === 401 ? 'unauthorized' : res.json())
            .then(data => {
                this.setState({
                    post: data
                })
            })
    }
}

export default Post;