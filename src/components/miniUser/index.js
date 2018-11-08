import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { Component } from 'react';
import './index.css'

class MiniUser extends Component {
    render() {
        return this.props.user !== 'unauthorized' ?
            this.props.user.avatar ?
                <li><Paper className='postContainer'>
                    <img src={this.props.user.avatar} className='miniUserImg' alt='avatar'></img>
                    <p>{this.props.user.username}</p>
                    <Link to={`/users/${this.props.user._id}`} ><Button>Profile</Button></Link>
                    <Button onClick={this.handleClick}>{this.props.user.isFollowed ? 'Unfollow' : 'Follow'}</Button>
                </Paper></li >
                :
                null
            :
            <Redirect to='/' />
    }
    handleClick = () => {
        this.props.handleClick(this.props.user._id)
    }
}

export default MiniUser;