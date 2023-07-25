import { useQuery } from 'react-query';
import { fetchDataMapMain, fetchDataMapSub } from '../api/dataMapApi';

export const useDataMapMain = () => {
  return useQuery('dataMapsMain', fetchDataMapMain);
};

export const useDataMapSub = () => {
    return useQuery('dataMapsSub', fetchDataMapSub);
  };