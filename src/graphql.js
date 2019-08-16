import gql from 'graphql-tag';

export const COUNTRY_FRAGMENT = gql`
	fragment countryFragment on Country {
		code
		name
		continent
	}
`;

export const QUERY_BAHN = gql`
	query Bahn {
		stationWithEvaId(evaId: 8000105) {
			name
			location {
				latitude
				longitude
			}
			picture {
				url
			}
		}
	}
`;
