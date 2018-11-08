

const customMiddleWare = store => dispatch => action => {
    console.log(action)
    if (!action.special) {
        return dispatch(action)
    }
    const headers = new Headers({
        'content-type': 'application/json'
    })
    const options = {
        headers: headers,
        body: JSON.stringify(action.body),
        method: action.method,
    }
    fetch(`https://propulsion-blitz.herokuapp.com/api/${action.endpoint}`, options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch({
                type: action.type,
                data: data
            })
        })
}

export default customMiddleWare;