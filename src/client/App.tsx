import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Edit from './pages/Edit';
import DisplayBlog from './pages/DisplayBlog';
import Donate from './pages/Donate';
import Add from './pages/Add';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

class App extends React.Component<IAppProps, IAppState> {

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/edit/:id" component={Edit} />
					<Route exact path="/details/:id" component={DisplayBlog} />
					<Route exact path="/donate" component={Donate} />
					<Route exact path="/addentry" component={Add} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/profile" component={Profile} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export interface IAppProps { }

export interface IAppState { }

export default App;
