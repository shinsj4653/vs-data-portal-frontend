import { useQuery } from 'react-query';
import { fetchDataMapDataSet, fetchDataMapMain, fetchDataMapSub } from '../api/dataMapApi';

export const useDataMapMain = () => {
	return useQuery('dataMapMain', fetchDataMapMain);
};

export const useDataMapSub = () => {
	return useQuery('dataMapSub', fetchDataMapSub);
};

export const useDataMapDataSet = () => {
	return useQuery('dataMapDataSet', fetchDataMapDataSet);
};
