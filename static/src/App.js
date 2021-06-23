import React, { Component } from 'react';
import { useRoutes } from 'hookrouter';
import axios from 'axios';

import * as Session from './Utils/Session';

import Home from './Components/Home.js';
import Login from './Components/Login';
import Account from './Components/Account';
import PageError from './Components/Error';

import './styles/main.scss';

const App = () => {
	let isLogged = Session.isLoggedIn();
	const routes = {
		'/': () => <Home logged={isLogged}/>,
		'/account': () => <Account logged={isLogged} />,
		'/login': () => <Login />
	};
	const Router = useRoutes(routes);
	return (
		<div>
			{Router || PageError}
		</div>
	);
};

export default App;
