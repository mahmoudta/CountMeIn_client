import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactRouter from './Router/router';
import { setAuthorizationToken } from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

if (localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<ReactRouter />
		</Provider>
	</Router>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
