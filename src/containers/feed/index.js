import { connection } from '../../helpers/mapStateToProps.js';
import Me from '../me';
import React, { Component } from 'react';
import { changePost, setFeed } from '../../Store/actions';
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
                    {this.props.feed.map((post) => { // right here
                        return <Post post={post} key={post._id} handleClick={this.handleClick} />
                    })}
                </ul>
                :
                <p>Loading...</p>}
        </div>
    }

    handleClick = (id) => {
        this.props.dispatch(changePost(id))
    }

    componentDidMount = () => {
        console.log('from the feed', localStorage)
        console.log('from the feed props', this.props)
        this.props.dispatch(setFeed())
    }
}
const connectedFeed = connection(Feed)

export default connectedFeed