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
        case 'setId':
            newState.id = action.id
            return newState
        case 'setToken':
            newState.token = action.token
            return newState
        case 'logout':
            newState.id = null;
            newState.token = null;
            newState.users = null;
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
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(customMiddleWare))

export default store;