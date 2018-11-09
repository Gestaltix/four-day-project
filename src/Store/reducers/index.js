import { combineReducers } from 'redux';

const authentication = (state = {
    id: null,
    token: null,
    feed: null,
    user: null,
    users: null,
}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'login':
            localStorage.setItem("token", action.data.token)
            newState.id = action.data._id
            newState.token = action.data.token
            return newState
        case 'setToken':
            newState.token = action.token
            return newState
        case 'logout':
            newState = {
                id: null,
                token: null,
                feed: null,
                user: null,
                users: null,
            }
            return newState
        default:
            return state
    }
}

const users = (state = {
    user: null,
    token: null,
}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'changeUser':
            newState.users = newState.users.map((user) => {
                return user._id === action.data._id ? action.data : user;
            })
            return newState;
        case 'changeUserUser':
            newState.user = { ...newState.user, ...action.data }
            return newState;
        case 'setUsers':
            newState.users = action.data;
            return newState;
        case 'setUser':
            newState.user = action.data;
            return newState;
        case 'changeUserPost':
            newState.user.blitzs = newState.user.blitzs.map((blitz) => {
                return blitz._id === action.data._id ? action.data : blitz;
            })
            return newState
        default:
            return state
    }
}

const feed = (state = {
    feed: null,
}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case 'setFeed':
            newState.feed = action.data;
            return newState;
        case 'changePost':
            newState.feed = newState.feed.map((post) => {
                return post._id === action.data._id ? action.data : post;
            })
            return newState
        default:
            return state
    }
}


export default combineReducers({ feed: feed, users: users, auth: authentication })