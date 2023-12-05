import { useQuery } from 'react-query';
import { fetchDatasetSearchResult, fetchSearchRank } from '../api/dpMainApi';

export const useDatasetSearch = (keyword, pageNo, amountPerPage) => {
	return useQuery(['datasetSearch', keyword], () => fetchDatasetSearchResult(keyword, pageNo, amountPerPage));
};

export const useSearchRank = () => {
	return useQuery(['searchRank'], () => fetchSearchRank());
};