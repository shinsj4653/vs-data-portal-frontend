import { useQuery } from 'react-query';
import { fetchDatasetSearchResult } from '../api/dpMainApi';

export const useDatasetSearch = (keyword, pageNo, amountPerPage) => {
	return useQuery(['datasetSearch', keyword], () => fetchDatasetSearchResult(keyword, pageNo, amountPerPage));
};
