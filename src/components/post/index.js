import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Post extends Component {
    render() {
        return this.props.post !== 'unauthorized' ?
            this.props.post.content ?
                <li><Paper className='postContainer'>
                    <img
                        src={this.props.post._user.avatar}
                        className='postAvatar' alt='Avatar' />
                    <p><Link to={`/users/${this.props.post._user._id}`} ><Button>Profile</Button></Link></p>
                    <p>{this.props.post.content}</p>
                    <Button onClick={this.handleClick}>{this.props.post.isLiked ? 'Unlike' : 'Like'}</Button>
                </Paper></li >
                :
                null
            :
            <Redirect to='/' />
    }
    handleClick = () => {
        this.props.handleClick(this.props.post._id)
    }
}

export default Post;