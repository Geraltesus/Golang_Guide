import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Guide from './Guide';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/signup" component={Signup} />
				<Route path="/login" component={Login} />
				<Route path="/guide" component={Guide} />
				<Route path="/" exact component={Login} />
			</Routes>
		</Router>
	);
};

export default App;