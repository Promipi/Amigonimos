import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';

import "babel-polyfill"

import * as Session from './Utils/Session';

import Home from './Components/Home';
import Login from './Components/Login';
import Account from './Components/Account';
import PageError from './Components/Error';

import './styles/main.scss';

const App = () => {
	let isLogged = Session.isLoggedIn();

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home logged={isLogged}/>
				</Route>
				<Route exact path="/account">
					<Account logged={isLogged} />
				</Route>
				<Route exact path="/login">
					<Login logged={isLogged} />
				</Route>
				<Route path="/page/:page">
					<Home logged={isLogged} />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
