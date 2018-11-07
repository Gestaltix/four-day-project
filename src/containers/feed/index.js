import React, { Component } from 'react';
import { connection } from '../../helpers/mapStateToProps.js'
import Post from '../../components/post'
import { Link } from 'react-router-dom'

class Feed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feed: null,
        }
    }
    render() {
        return <Link to='/users/2' >This is the link</Link>
    }
    componentDidMount = () => {
        const headers = new Headers({
            Authorization: 'Bearer ' + this.props.token
        })
        console.log(this.props.token)
        const options = {
            method: "GET",
            headers: headers
        }

        fetch('https://propulsion-blitz.herokuapp.com/api/feed', options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    feed: data
                })
            })
    }
}

const connectedFeed = connection(Feed)

export default connectedFeed