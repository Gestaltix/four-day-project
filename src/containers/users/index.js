import { connection } from '../../helpers/mapStateToProps.js';
import MiniUser from '../../components/miniUser';
import Me from '../me';
import React, { Component } from 'react';
import './index.css';

class Users extends Component {
    render() {
        return <div>
            <Me />
            {this.props.users ?
                <div>
                    <ul className='usersUl'>{this.props.users.map(user => {
                        return <MiniUser user={user} key={user._id} handleClick={this.handleClick} />
                    })}</ul>
                </div>
                :
                <p>Loading...</p>}
        </div>
    }

    handleClick = (id) => {
        this.props.dispatch({
            special: true,
            type: 'changeUser',
            method: 'POST',
            endpoint: `users/${id}/follow`
        })
    }

    componentDidMount = () => {
        this.props.dispatch({
            special: true,
            type: 'setUsers',
            method: 'GET',
            endpoint: 'users',
        })
    }
}

const connectedUsers = connection(Users)

export default connectedUsers