import { useQuery } from 'react-query';
import { fetchMetaDataMainDataset, fetchMetaDataSubDataset } from '../api/metaDataApi';

export const useMetadataMainDataSet = (serviceName) => {
	return useQuery('metaDataMainDataSet', fetchMetaDataMainDataset(serviceName));
};

export const useMetadataSubDataSet = (serviceName) => {
	return useQuery('metaDataSubDataSet', fetchMetaDataSubDataset(serviceName));
};
