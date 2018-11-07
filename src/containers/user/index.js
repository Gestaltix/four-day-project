import React, { Component } from 'react';
import { connection } from '../../helpers/mapStateToProps.js'

class User extends Component {

    render() {
        return <p>{this.props.match.params.id}</p>
    }

    componentDidMount = () => {
        console.log(this.props.token)
        const headers = new Headers({
            Authorization: 'Bearer ' + this.props.token
        })
        const options = {
            headers: headers
        }
        fetch(`https://propulsion-blitz.herokuapp.com/api/users/5a02dbd10f1bde000488f228`, options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
}

const connectedUser = connection(User)

export default connectedUser;