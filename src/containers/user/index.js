import { connection } from '../../helpers/mapStateToProps.js';
import Button from '@material-ui/core/Button';
import Logout from '../../components/logout';
import Paper from '@material-ui/core/Paper';
import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Post from '../../components/post';
import './index.css';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
        }
    }
    render() {
        return (
            this.state.user !== 'unauthorized' ?
                Object.keys(this.state.user).length !== 0 ?
                    <Paper className='userPaper'>
                        <img src={this.state.user.avatar} alt='avatar' className='userImg'></img>
                        <p><Logout /><Link to='/me'><Button>Me</Button></Link></p>
                        <h3>{this.state.user.username}</h3>
                        <Button onClick={this.clickHandler}>
                            {this.state.user.isFollowed ?
                                'Unfollow' : 'Follow'}
                        </Button>
                        <ul className='userBlitzs'>
                            {this.state.user.blitzs.map(blitz => {
                                return <Post blitz={blitz} key={blitz._id} />
                            })}
                        </ul>
                    </Paper>
                    :
                    <p>Loading...</p>
                :
                <Redirect to='/' />
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
                this.setState({
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
                    this.setState({
                        user: 'unauthorized'
                    }) :
                    this.setState({
                        user: { ...this.state.user, isFollowed: data.isFollowed }
                    })
            })
    }
}

const connectedUser = connection(User)

export default connectedUser;