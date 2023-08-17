import { useQuery, useMutation } from 'react-query';
import { fetchMetaDataMainDataset, fetchMetaDataSubDataset, fetchMetaDataTableInfo, fetchMetaDataTableSearch } from '../api/metaDataApi';

export const useMetadataMainDataSet = (serviceName) => {
	return useQuery(['metaDataMainDataSet', serviceName], () => fetchMetaDataMainDataset(serviceName), {
		staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 유효
	}); 
};

export const useMetadataSubDataSet = (serviceName, mainCategoryName) => {
	return useQuery(['metaDataSubDataSet', mainCategoryName], () => fetchMetaDataSubDataset(serviceName, mainCategoryName), {
		staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 유효
	});
};

export const useMetadataTableInfo = (serviceName, mainCategoryName, subCategoryName) => {
	return useQuery(['metaDataTableInfo', subCategoryName], () => fetchMetaDataTableInfo(serviceName, mainCategoryName, subCategoryName), {
		staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 유효
	});
};

export const useMetadataTableSearch = (serviceName, searchCondition, tableKeyword, pageNo, amountPerPage) => {
	return useQuery(['metaDataTableSearch', tableKeyword], () => fetchMetaDataTableSearch(serviceName, searchCondition, tableKeyword, pageNo, amountPerPage), {
		staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 유효
	});
};	