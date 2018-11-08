import { connection } from '../../helpers/mapStateToProps.js';
import Me from '../me';
import React, { Component } from 'react';
import Post from '../../components/post';
import './index.css';
import NewPost from '../../components/newPost/index.js';

class Feed extends Component {
    render() {
        return <div>
            <Me />
            {this.props.feed ?
                <ul className='feedList'>
                    <NewPost />
                    {this.props.feed.map((post) => {
                        return <Post post={post} key={post._id} handleClick={this.handleClick} />
                    })}
                </ul>
                :
                <p>Loading...</p>}
        </div>
    }

    handleClick = (id) => {
        this.props.dispatch({
            special: true,
            type: 'changePost',
            method: 'POST',
            endpoint: `blitzs/${id}/like`,
        })
    }

    componentDidMount = () => {
        this.props.dispatch({
            special: true,
            type: 'setFeed',
            method: 'GET',
            endpoint: 'feed',
        })
    }
}

const connectedFeed = connection(Feed)

export default connectedFeed