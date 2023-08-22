import { useQuery } from 'react-query';
import { fetchOrgChartMain, fetchServiceInfo, fetchServiceByTarget, fetchServiceByMainDataset, fetchServiceSystemInfo } from '../api/orgChartApi';

export const useOrgChartMain = () => {
  return useQuery('orgChartMain', fetchOrgChartMain);
};

export const useServiceByTarget = (targetName) => {
  return useQuery(['serviceByTarget', targetName], () => fetchServiceByTarget(targetName), {
    staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 유효
  });
};

export const useServiceByMainDataset = (mainDataset) => {
  return useQuery(['serviceByMainDataset', mainDataset], () => fetchServiceByMainDataset(mainDataset), {
    staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 유효
  });
};