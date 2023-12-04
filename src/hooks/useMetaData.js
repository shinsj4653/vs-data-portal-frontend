import { useQuery } from 'react-query';
import { fetchMetaDataMainDataset, fetchMetaDataSubDataset, fetchMetaDataTableInfo, fetchMetaDataTableSearch, fetchMetaTableColumnInfo, fetchMetaDataTotalSearch, fetchAutoCompleteSearchWords } from '../api/metaDataApi';

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

export const useMetadataTableInfo = (serviceName, mainCategoryName, subCategoryName, pageNo, amountPerPage) => {
	return useQuery(['metaDataTableInfo', subCategoryName], () => fetchMetaDataTableInfo(serviceName, mainCategoryName, subCategoryName, pageNo, amountPerPage), {
		staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 유효
		suspense: true,
	});
};

export const useMetadataTableSearch = (searchCondition, keyword, pageNo, amountPerPage) => {
	return useQuery(['metaDataTableSearch', keyword], () => fetchMetaDataTableSearch(searchCondition, keyword, pageNo, amountPerPage), {
		staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 유효
		suspense: true,
	});
};	

export const useMetadataTableColumnInfo = (tableId) => {
	return useQuery(['metaDataTableColumn', tableId], () => fetchMetaTableColumnInfo(tableId), {
		staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 유효
	});
};	

export const useMetadataAutoSearch = (index, searchConditions, keyword) => {
	return useQuery(['metaDataAutoSearch', keyword], () => fetchAutoCompleteSearchWords(index, searchConditions, keyword), {
		staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 유효
	});
}