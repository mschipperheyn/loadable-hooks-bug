import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BAHN } from './graphql';

const MemoPage = () => {
	const { data, loading, error } = useQuery(QUERY_BAHN);
	if (loading) return 'Loading';
	if (error) return 'Error';
	return <div>{data.stationWithEvaId.name}</div>;
};

export default React.useMemo(MemoPage);
