import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "babel-polyfill"
import Home from './Pages/Home';
import Login from './Pages/Login';
import PageError from './Pages/Error';
import Register from './Pages/Register';
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
					<Route path="/post/page/:page" component={Home}/>
					<Route path="/post/:id" component={Home}/>
					<Route path="/tips" component={Home} />
					<Route path="/tips/page/:page" component={Home} />
					<Route exact path="/add" component={Home}/>
					<Route exact path="/profile/:id" component={Home}/>
					<Route path="/register" component={Register} />
					<Route path="/*" component={PageError}/>
				</Switch>
			</UserContext>
		</Router>
	);
};

export default App;
