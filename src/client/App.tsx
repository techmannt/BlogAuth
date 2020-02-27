import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Edit from './pages/Edit';
import DisplayBlog from './pages/DisplayBlog';
import Donate from './pages/Donate';

class App extends React.Component<IAppProps, IAppState> {

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/edit/:id" component={Edit} />
					<Route exact path="/details/:id" component={DisplayBlog} />
					<Route exact path="/donate" component={Donate} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export interface IAppProps { }

export interface IAppState { }

export default App;
