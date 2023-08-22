import { useQuery } from 'react-query';
import { fetchServiceSystemInfo } from '../api/sysInfoApi';

export const useSercviceSystemInfo = (serviceName) => {
    return useQuery(['serviceSystemInfo', serviceName], () => fetchServiceSystemInfo(serviceName));
  };
  