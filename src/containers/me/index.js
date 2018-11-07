import { connection } from '../../helpers/mapStateToProps';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './index.css'

class Me extends Component {
    render() {
        return this.props.token ?
            <Paper className='mePaper'>
                <Link to='/feed'><Button>To Feed</Button></Link>
                <Link to='/likedfeed'><Button>Liked Posts</Button></Link>
                <Link to='/users'><Button>Users</Button></Link>
            </Paper>
            :
            <Redirect to='/' />
    }
}

const connectedMe = connection(Me)

export default connectedMe;