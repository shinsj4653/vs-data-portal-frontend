import { useQuery } from 'react-query';
import { fetchOrgChartMain, fetchServiceInfo, fetchServiceByTarget, fetchServiceByDataset, fetchServiceSystemInfo } from '../api/orgChartApi';

export const useOrgChartMain = () => {
  return useQuery('orgChartMain', fetchOrgChartMain);
};

export const useServiceByTarget = (targetName) => {
  return useQuery(['serviceByTarget', targetName], () => fetchServiceByTarget(targetName), {
    staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 유효
  });
};

export const useServiceByDataset = (keyword) => {
  return useQuery(['serviceByDataset', keyword], () => fetchServiceByDataset(keyword), {
    staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 유효
  });
};