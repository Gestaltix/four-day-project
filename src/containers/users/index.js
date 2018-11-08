import { connection } from '../../helpers/mapStateToProps.js';
import MiniUser from '../../components/miniUser';
import Me from '../me';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import './index.css';

class Users extends Component {
    render() {
        return <div>
            <Me />
            {this.props.users !== 'unauthorized' ?
                this.props.users ?
                    <div>
                        <ul className='usersUl'>{this.props.users.map(user => {
                            return <MiniUser user={user} key={user._id} />
                        })}</ul>
                    </div>
                    :
                    <p>Loading...</p>
                :
                <Redirect to='/' />}
        </div>
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
            .then(res => { return res.status === 401 ? 'unauthorized' : res.json() })
            .then(data => {
                console.log(data)
                this.props.dispatch({
                    type: 'setUsers',
                    users: data
                })
            })
    }
}

const connectedUsers = connection(Users)

export default connectedUsers