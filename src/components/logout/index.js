import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { connection } from '../../helpers/mapStateToProps';

class Logout extends Component {
    render() {
        return this.props.token ?
            <Button onClick={this.logoutHandler}>Log Out</Button>
            :
            <Redirect to='/' />
    }

    logoutHandler = () => {
        localStorage.clear()
        this.props.dispatch({
            type: 'logout'
        })
    }
}

const connectedLogout = connection(Logout);

export default connectedLogout;