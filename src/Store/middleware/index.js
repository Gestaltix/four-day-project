const customMiddleWare = store => next => action => {
    console.log("Middleware triggered:", action);
    switch (action.type) {

    }
    next(action);
}

export default customMiddleWare;