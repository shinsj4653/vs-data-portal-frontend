import { useQuery } from 'react-query';
import { fetchOrgChartMain, fetchServiceInfo,  } from '../api/orgChartApi';

export const useOrgChartMain = () => {
  return useQuery('orgChartMain', fetchOrgChartMain);
};

export const useSercviceInfo = () => {
    return useQuery('serviceInfo', fetchServiceInfo);
  };