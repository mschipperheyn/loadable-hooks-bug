import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { loadableReady } from '@loadable/component';
import createClient from './apolloClient';

loadableReady(() => {
	hydrate(
		<ApolloProvider client={createClient()}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ApolloProvider>,
		document.getElementById('root')
	);
});

if (module.hot) {
	module.hot.accept();
}
