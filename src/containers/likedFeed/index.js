import { connection } from '../../helpers/mapStateToProps.js';
import NewPost from '../../components/newPost/index.js';
import Me from '../me';
import { changePost, setFeed } from '../../Store/actions';
import { Redirect } from 'react-router-dom';
import Post from '../../components/post';
import React, { Component } from 'react';
const uuid = require('uuid/v4');

class LikedFeed extends Component {
    render() {
        return <div>
            <Me />
            {this.props.feed !== 'unauthorized' ?
                this.props.feed ?
                    <ul className='feedList'>
                        <NewPost />
                        {this.props.feed.map((post) => {
                            return post.isLiked ? <Post post={post} key={uuid()} handleClick={this.handleClick} /> : null
                        })}
                    </ul>
                    :
                    <p>Loading...</p>
                :
                <Redirect to='/' />}
        </div>
    }

    handleClick = (id) => {
        this.props.dispatch(changePost(id))
    }

    componentDidMount = () => {
        this.props.dispatch(setFeed())
    }
}

const connectedLikedFeed = connection(LikedFeed)

export default connectedLikedFeed;