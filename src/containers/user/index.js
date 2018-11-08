import { connection } from '../../helpers/mapStateToProps.js';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Me from '../me';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Post from '../../components/post';
import './index.css';

class User extends Component {
    render() {
        return (
            <div>
                <Me />
                {this.props.user !== 'unauthorized' ?
                    this.props.user ?
                        <Paper className='userPaper'>
                            <img src={this.props.user.avatar} alt='avatar' className='userImg'></img>
                            <h3>{this.props.user.username}</h3>
                            <Button onClick={this.clickHandler}>
                                {this.props.user.isFollowed ?
                                    'Unfollow' : 'Follow'}
                            </Button>
                            <ul className='userBlitzs'>
                                {this.props.user.blitzs.map(post => {
                                    return <Post post={post} key={post._id} />
                                })}
                            </ul>
                        </Paper>
                        :
                        <p>Loading...</p>
                    :
                    <Redirect to='/' />}
            </div>
        )
    }

    componentDidMount = () => {
        const headers = new Headers({
            Authorization: 'Bearer ' + this.props.token
        })
        const options = {
            headers: headers
        }
        fetch(`https://propulsion-blitz.herokuapp.com/api/users/${this.props.match.params.id}`, options)
            .then(res => res.status === 401 ? 'unauthorized' : res.json())
            .then(data => {
                this.props.dispatch({
                    type: 'setUser',
                    user: data
                })
            })
    }

    clickHandler = () => {
        const headers = new Headers({
            Authorization: 'Bearer ' + this.props.token
        })
        console.log(headers)
        const options = {
            headers: headers,
            method: 'POST'
        }
        fetch(`https://propulsion-blitz.herokuapp.com/api/users/${this.state.user._id}/follow`, options)
            .then(res => res.json())
            .then(data => {
                data === 'unauthorized' ?
                    this.props.dispatch({
                        type: 'setUser',
                        user: 'unauthorized'
                    }) :
                    this.props.dispatch({
                        type: 'changeUser',
                        user: { ...this.state.user, isFollowed: data.isFollowed }
                    })
            })
    }
}

const connectedUser = connection(User)

export default connectedUser;