import React from 'react';
import ReactDOM from 'react-dom';
import Login from './containers/login';
import Feed from './containers/feed';
import User from './containers/user';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './index.css'
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import blue from './themes/blue'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store';
import LikedFeed from './containers/likedFeed'
import Users from './containers/users'

ReactDOM.render(
    <MuiThemeProvider theme={blue}>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/feed' component={Feed} />
                    <Route exact path='/' component={Login} />
                    <Route path='/login' component={Login} />
                    <Route exact path='/likedfeed' component={LikedFeed} />
                    <Route exact path='/users' component={Users} />
                    <Route exact path='/users/:id' component={User} />
                </Switch>
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));
//eslint-disable-next-line
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
