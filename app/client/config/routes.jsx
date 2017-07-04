import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';

import App from '../containers/App';
import Q1Page from '../containers/Q1Page';
import Q2Page from '../containers/Q2Page';

export default (
	<Route>
		<Route path='/' component={App}>
			<IndexRoute component={Q1Page} />
			<Route path='q2' component={Q2Page}/>
        </Route>
	</Route>
);