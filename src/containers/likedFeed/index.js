import { connection } from '../../helpers/mapStateToProps.js';
import { Redirect } from 'react-router-dom';
import Post from '../../components/post';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NewPost from '../../components/newPost/index.js';
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
                    <NewPost token={this.props.token} />
                    <ul className='feedList'>
                        {this.state.feed.map((blitz) => {
                            return blitz.isLiked ? <Post blitz={blitz} key={uuid()} token={this.props.token} /> : null
                        })}
                    </ul>
                    <Link to='/users/5a02dbd10f1bde000488f228'>Link to Users</Link>
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

const connectedFeed = connection(LikedFeed)

export default connectedFeed