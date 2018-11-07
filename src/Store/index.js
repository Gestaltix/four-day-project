import { createStore } from 'redux';

const reducer = (state = {
    token: null,
    id: null,
}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case 'changeToken':
            newState.token = action.token
            newState.id = action.id
            return newState
        default:
            return state
    }
}

const store = createStore(reducer)

export default store;