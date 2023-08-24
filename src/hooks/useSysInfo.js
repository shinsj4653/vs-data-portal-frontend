import { useQuery } from 'react-query';
import { fetchServiceSystemInfo } from '../api/sysInfoApi';

export const useServiceSystemInfo = (serviceName) => {
    return useQuery(['serviceSystemInfo', serviceName], () => fetchServiceSystemInfo(serviceName));
  };
  