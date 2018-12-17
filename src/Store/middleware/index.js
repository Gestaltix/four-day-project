const customMiddleWare = store => dispatch => action => {
    if (!action.special) {
        return dispatch(action)
    }

    const headers = new Headers({
        Authorization: localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null,
        'content-type': 'application/json'
    })
    const options = {
        headers: headers,
        body: JSON.stringify(action.body),
        method: action.method,
    }
    fetch(`https://propulsion-blitz.herokuapp.com/api/${action.endpoint}`, options)
        .then(res => res.status === 401 ? null : res.json())
        .then(data => {
            if (data === null) {
                return null
            }
            dispatch({
                type: action.type,
                data: data
            })
        })
}

export default customMiddleWare;