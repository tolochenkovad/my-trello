import { useSelector } from 'react-redux';
import { AppStore } from '../types';

export const useCheckStatus = (action: string, id?: string | number) => {
  const statusData = useSelector((state: AppStore) => {
    const actionType = id
      ? `${action}/id${id}`
      : action;

    return state.statuses[actionType];
  });

  const data: {
    isError: boolean;
    isLoading: boolean;
  } = {
    isError: false,
    isLoading: false,
  };

  if (statusData) {
    switch (statusData.status) {
      case 'ERROR':
        data.isError = true;
        data.isLoading = false;
        break;
      case 'LOADING':
        data.isError = false;
        data.isLoading = true;
        break;
      default:
        data.isError = false;
        data.isLoading = false;
        break;
    }

    return data;
  }

  return data;
};

export default { useCheckStatus };
