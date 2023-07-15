import {
  START_FETCHING_PAYMENTS,
  SUCCESS_FETCHING_PAYMENTS,
  ERROR_FETCHING_PAYMENTS,
  SET_KEYWORD,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchPayments = debounce(getData, 1000);

export const startFetchingPayments = () => {
  return {
    type: START_FETCHING_PAYMENTS,
  };
};

export const successFetchingPayments = ({ payments }) => {
  return {
    type: SUCCESS_FETCHING_PAYMENTS,
    payments,
  };
};

export const errorFetchingPayments = () => {
  return {
    type: ERROR_FETCHING_PAYMENTS,
  };
};

export const fetchPayments = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingPayments());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        keyword: getState().payments.keyword,
      };

      let res = await debouncedFetchPayments('/cms/payments', params);

      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(
        successFetchingPayments({
          payments: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingPayments());
    }
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};