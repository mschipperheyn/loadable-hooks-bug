import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import path from 'path';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ChunkExtractor } from '@loadable/server';
import fetch from 'node-fetch';
import createClient from './apolloClient';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const webStatsFile = path.resolve(process.cwd(), 'build/loadable-stats.json');

const server = express();
server
	.disable('x-powered-by')
	.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
	.get('/*', async (req, res) => {
		try {
			const client = createClient(true, { req, fetch });

			const context = {};
			const extractor = new ChunkExtractor({
				statsFile: webStatsFile,
				entrypoints: ['client']
			});

			const TheApp = () => (
				<ApolloProvider client={client}>
					<StaticRouter context={context} location={req.url}>
						<App />
					</StaticRouter>
				</ApolloProvider>
			);

			await getDataFromTree(extractor.collectChunks(<TheApp />));

			const initialApolloState = client.extract();

			const jsx = extractor.collectChunks(<TheApp />);
			const scriptTags = (extractor && extractor.getScriptTags()) || '';
			const markup = renderToString(jsx);
			if (context.url) {
				res.redirect(context.url);
			} else {
				res.status(200).send(
					`<!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
						assets.client.css
							? `<link rel="stylesheet" href="${assets.client.css}">`
							: ''
					}
          ${
						process.env.NODE_ENV === 'production'
							? `<script src="${assets.client.js}" defer></script>`
							: `<script src="${assets.client.js}" defer crossorigin></script>`
					}
          <script>
          window.__APOLLO_STATE__=${JSON.stringify(initialApolloState).replace(
						/</g,
						'\\u003c'
					)};
          </script>
      </head>
      <body>
          <div id="root">${markup}</div>
          ${scriptTags}
      </body>
  </html>`
				);
			}
		} catch (err) {
			throw err;
		}
	});

export default server;
