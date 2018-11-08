import { connection } from '../../helpers/mapStateToProps.js';
import { Redirect } from 'react-router-dom';
import Me from '../me';
import React, { Component } from 'react';
import Post from '../../components/post';
import './index.css';
import NewPost from '../../components/newPost/index.js';
const uuid = require('uuid/v4');

class Feed extends Component {
    render() {
        return <div>
            <Me />
            {this.props.feed !== 'unauthorized' ?
                this.props.feed ?
                    <ul className='feedList'>
                        <NewPost />
                        {this.props.feed.map((post) => {
                            return <Post post={post} key={post._id} handleClick={this.handleClick} />
                        })}
                    </ul>
                    :
                    <p>Loading...</p>
                :
                <Redirect to='/' />}
        </div>
    }

    handleClick = (id) => {
        const headers = new Headers({
            Authorization: 'Bearer ' + this.props.token
        })
        const options = {
            headers: headers,
            method: 'POST'
        }
        fetch(`https://propulsion-blitz.herokuapp.com/api/blitzs/${id}/like`, options)
            .then(res => res.json())
            .then(data => {
                this.props.dispatch({
                    type: 'changePost',
                    post: data
                })
            })
    }

    componentDidMount = () => {
        const headers = new Headers({
            Authorization: 'Bearer ' + this.props.token
        })
        const options = {
            method: "GET",
            headers: headers
        }

        fetch('https://propulsion-blitz.herokuapp.com/api/feed', options)
            .then(res => res.status === 401 ? 'unauthorized' : res.json())
            .then(data => {
                this.props.dispatch({
                    type: 'setFeed',
                    feed: data
                })
            })
    }
}

const connectedFeed = connection(Feed)

export default connectedFeed