import { connection } from '../../helpers/mapStateToProps.js';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Me from '../me';
import React, { Component } from 'react';
import Post from '../../components/post';
import './index.css';

class User extends Component {
    render() {
        return (
            <div>
                <Me />
                {this.props.user ?
                    <Paper className='userPaper'>
                        <img src={this.props.user.avatar} alt='avatar' className='userImg'></img>
                        <h3>{this.props.user.username}</h3>
                        <Button onClick={this.clickHandler}>
                            {this.props.user.isFollowed ?
                                'Unfollow' : 'Follow'}
                        </Button>
                        <ul className='userBlitzs'>
                            {this.props.user.blitzs.map(post => {
                                return <Post post={post} key={post._id} handleClick={this.postClickHandler} />
                            })}
                        </ul>
                    </Paper>
                    :
                    <p>Loading...</p>}
            </div>
        )
    }

    componentDidMount = () => {
        this.props.dispatch({
            special: true,
            type: 'setUser',
            method: 'GET',
            endpoint: `users/${this.props.match.params.id}`
        })
    }

    postClickHandler = (id) => {
        this.props.dispatch({
            special: true,
            type: 'changeUserPost',
            method: 'POST',
            endpoint: `blitzs/${id}/like`,
        })
    }

    clickHandler = () => {
        this.props.dispatch({
            special: true,
            type: 'changeUserUser',
            method: 'POST',
            endpoint: `users/${this.props.user._id}/follow`
        })
    }
}

const connectedUser = connection(User)

export default connectedUser;