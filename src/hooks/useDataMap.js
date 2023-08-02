import { useQuery } from 'react-query';
import { fetchDataMapAllDataset, fetchDataMapMain, fetchDataMapSub } from '../api/dataMapApi';

export const useDataMapMain = () => {
	return useQuery('dataMapMain', fetchDataMapMain);
};

export const useDataMapSub = () => {
	return useQuery('dataMapSub', fetchDataMapSub);
};

export const useDataMapAllDataset = () => {
	return useQuery('dataMapAllDataset', fetchDataMapAllDataset);
};

