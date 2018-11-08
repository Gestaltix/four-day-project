import { createStore } from 'redux';

const reducer = (state = {
    token: null,
    id: null,
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
            console.log('in the reducer')
            newState.id = null;
            newState.token = null;
            return newState
        default:
            return state
    }
}

const store = createStore(reducer)

export default store;