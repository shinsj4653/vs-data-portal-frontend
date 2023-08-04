import { useQuery, useMutation } from 'react-query';
import { fetchMetaDataMainDataset, fetchMetaDataSubDataset, fetchMetaDataTableInfo } from '../api/metaDataApi';

export const useMetadataMainDataSet = (serviceName) => {
	return useQuery(['metaDataMainDataSet', serviceName], () => fetchMetaDataMainDataset(serviceName)); 
};

export const useMetadataSubDataSet = (serviceName, mainCategoryName) => {
	return useQuery(['metaDataSubDataSet', mainCategoryName], () => fetchMetaDataSubDataset(serviceName, mainCategoryName));
};

export const useMetadataTableInfo = (serviceName, mainCategoryName, subCategoryName, amount, pageNo) => {
	return useQuery(['metaDataTableInfo', subCategoryName, amount, pageNo], () => fetchMetaDataTableInfo(serviceName, mainCategoryName, subCategoryName, amount, pageNo));
};