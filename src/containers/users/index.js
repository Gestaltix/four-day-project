import { connection } from '../../helpers/mapStateToProps.js';
import MiniUser from '../../components/miniUser';
import Me from '../me';
import { setUsers, changeUser } from '../../Store/actions';
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
        this.props.dispatch(changeUser(id))
    }

    componentDidMount = () => {
        this.props.dispatch(setUsers())
    }
}

const connectedUsers = connection(Users)

export default connectedUsers