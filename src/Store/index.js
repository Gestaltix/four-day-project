import { createStore, applyMiddleware } from 'redux';
import customMiddleWare from './middleware';

const reducer = (state = {
    token: null,
    id: null,
    users: null,
    user: null,
    feed: null,
}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case 'login':
            newState.id = action.data._id
            newState.token = action.data.token
            return newState
        case 'setToken':
            newState.token = action.token
            return newState
        case 'logout':
            newState.id = null;
            newState.token = null;
            newState.users = null;
            newState.feed = null;
            newState.user = null;
            return newState
        case 'setUsers':
            newState.users = action.users;
            return newState;
        case 'setUser':
            newState.user = action.user;
            return newState;
        case 'setFeed':
            newState.feed = action.feed;
            return newState;
        case 'changePost':
            newState.feed = newState.feed.map((post) => {
                return post._id === action.post._id ? action.post : post;
            })
            return newState
        case 'changeUser':
            newState.users = newState.users.map((user) => {
                return user._id === action.user._id ? action.user : user;
            })
            return newState;
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(customMiddleWare))

export default store;