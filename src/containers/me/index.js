import { connection } from '../../helpers/mapStateToProps';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { Component } from 'react';
import Logout from '../../components/logout';
import './index.css'

class Me extends Component {
    render() {
        return this.props.token ?
            <Paper className='mePaper' square={true} elevation={10}>
                <Link to='/feed'><Button>Feed</Button></Link>
                <Link to='/likedfeed'><Button>Liked Posts</Button></Link>
                <Link to='/users'><Button>Users</Button></Link>
                <Logout />
            </Paper>
            :
            <Redirect to='/' />
    }
}

const connectedMe = connection(Me)

export default connectedMe;