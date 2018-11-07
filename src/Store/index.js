import { createStore } from 'redux';

const reducer = (state = {
    token: null,
}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case 'changeToken':
            newState.token = action.token
            console.log(newState)
            return newState
        default:
            return state
    }
}

const store = createStore(reducer)

export default store;