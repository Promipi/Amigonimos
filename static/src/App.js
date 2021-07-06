import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "babel-polyfill"
import Home from './Components/Home';
import Login from './Components/Login';
import PageError from './Components/Error';
import Register from './Components/Register';
import UserContext from './Context/UserContext';

import './styles/main.scss';

const App = () => {

	return (
		<Router>
			<UserContext>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/profile" component={Home}/>
					<Route exact path="/login" component={Login}/>
					<Route path="/page/:page" component={Home}/>
					<Route path="/post/:id" component={Home}/>
					<Route exact path="/add" component={Home}/>
					<Route path="/register" component={Register} />
					<Route path="/*" component={PageError}/>
				</Switch>
			</UserContext>
		</Router>
	);
};

export default App;
