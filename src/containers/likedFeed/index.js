import { connection } from '../../helpers/mapStateToProps.js';
import NewPost from '../../components/newPost/index.js';
import Me from '../me';
import { Redirect } from 'react-router-dom';
import Post from '../../components/post';
import React, { Component } from 'react';
const uuid = require('uuid/v4');

class LikedFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feed: null,
        }
    }
    render() {
        return this.state.feed !== 'unauthorized' ?
            this.state.feed ?
                <div>
                    <Me />
                    <NewPost token={this.props.token} />
                    <ul className='feedList'>
                        {this.state.feed.map((blitz) => {
                            return blitz.isLiked ? <Post blitz={blitz} key={uuid()} /> : null
                        })}
                    </ul>
                </div>
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

        fetch('https://propulsion-blitz.herokuapp.com/api/feed', options)
            .then(res => res.status === 401 ? 'unauthorized' : res.json())
            .then(data => {
                this.setState({
                    feed: data
                })
            })
    }
}

const connectedLikedFeed = connection(LikedFeed)

export default connectedLikedFeed;