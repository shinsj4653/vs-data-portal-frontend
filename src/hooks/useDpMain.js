import { useQuery } from 'react-query';
import { fetchDatasetSearchResult } from '../api/dpMainApi';

export const useDatasetSearch = (datasetName) => {
	return useQuery(['datasetSearch', datasetName], () => fetchDatasetSearchResult(datasetName));
};
