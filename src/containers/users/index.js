import { connection } from '../../helpers/mapStateToProps.js';
import MiniUser from '../../components/miniUser';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import './index.css';

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: null,
        }
    }
    render() {
        return this.state.users !== 'unauthorized' ?
            this.state.users ?
                <ul className='usersUl'>{this.state.users.map(user => {
                    return <MiniUser user={user} token={this.props.token} key={user._id} />
                })}</ul>
                :
                <p>Loading...</p>
            :
            <Redirect to='/' />
    }
    componentDidMount = () => {
        const headers = new Headers({
            Authorization: 'Bearer ' + this.props.token
        })
        const options = {
            method: "GET",
            headers: headers
        }

        fetch('https://propulsion-blitz.herokuapp.com/api/users', options)
            .then(res => { console.log(res); return res.status === 401 ? 'unauthorized' : res.json() })
            .then(data => {
                console.log(data)
                this.setState({
                    users: data
                })
            })
    }
}

const connectedUsers = connection(Users)

export default connectedUsers