import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import {
	InMemoryCache,
	IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';

// const fragmentMatcher = new IntrospectionFragmentMatcher({
// 	introspectionQueryResultData
// });

const cache = () => {
	if (typeof window === 'undefined' || !window.__APOLLO_STATE__) {
		return new InMemoryCache({
			// fragmentMatcher,
			freezeResults: true
		});
	}
	return new InMemoryCache({
		// fragmentMatcher,
		freezeResults: true
	}).restore(
		window.__APOLLO_STATE__ // eslint-disable-line
	);
};

const httpLink = (isServer, opts) =>
	createHttpLink({
		fetch: isServer && opts.fetch,
		uri: 'https://bahnql.herokuapp.com/graphql'
		// fetchOptions: {
		// 	credentials: isServer ? 'same-origin' : 'include'
		// },
		// credentials: isServer ? 'same-origin' : 'include'
	});

function clientFactory() {
	let _client;

	return (isServer = false, opts = {}) => {
		if (!_client || isServer) {
			_client = new ApolloClient({
				ssrMode: isServer,
				connectToDevTools: true,
				link: httpLink(isServer, opts),
				cache: cache(isServer)
			});
		}
		return _client;
	};
}

const createClient = clientFactory();

export default createClient;
