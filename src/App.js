import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import Home from './Home';
// import HookPage from './HookPage';
// import MemoPage from './MemoPage';
import './App.css';

const HookPage = loadable(() => import('./HookPage'));
const MemoPage = loadable(() => import('./MemoPage'));

const App = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/hook-page" component={HookPage} />
		<Route exact path="/hook-memo" component={MemoPage} />
	</Switch>
);

export default App;
