import React, { Component } from 'react';

class Post extends Component {
    render() {
        return <p>{this.props.content}</p>
    }
}

export default Post;