export const login = (email, password) => {
    return {
        special: true,
        type: 'login',
        method: 'POST',
        endpoint: 'login',
        body: {
            // email: email,
            // password: password
            email: 'fake3@email.com',
            password: 'password'
        }
    }
}

export const register = (email, password) => {
    return {
        special: true,
        type: 'login',
        method: 'POST',
        endpoint: 'users',
        body: {
            email: email,
            password: password
        },
    }
}

export const setUser = (id) => {
    return {
        special: true,
        type: 'setUser',
        method: 'GET',
        endpoint: `users/${id}`
    }
}

export const changeUserPost = (id) => {
    return {
        special: true,
        type: 'changeUserPost',
        method: 'POST',
        endpoint: `blitzs/${id}/like`,
    }
}

export const changeUserUser = id => {
    return {
        special: true,
        type: 'changeUserUser',
        method: 'POST',
        endpoint: `users/${id}/follow`
    }
}

export const changeUser = id => {
    return {
        special: true,
        type: 'changeUser',
        method: 'POST',
        endpoint: `users/${id}/follow`
    }
}

export const setUsers = () => {
    return {
        special: true,
        type: 'setUsers',
        method: 'GET',
        endpoint: 'users',
    }
}

export const setFeed = () => {
    return {
        special: true,
        type: 'setFeed',
        method: 'GET',
        endpoint: 'feed',
    }
}

export const changePost = (id) => {
    return {
        special: true,
        type: 'changePost',
        method: 'POST',
        endpoint: `blitzs/${id}/like`,
    }
}