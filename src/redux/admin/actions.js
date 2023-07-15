import {
  START_FETCHING_ADMIN,
  SUCCESS_FETCHING_ADMIN,
  ERROR_FETCHING_ADMIN,
  SET_KEYWORD,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchAdmin = debounce(getData, 1000);

// START
export const startFetchingAdmin = () => {
  return {
    type: START_FETCHING_ADMIN,
  };
};

// SUCCESS
export const successFetchingAdmin = ({ admin }) => {
  return {
    type: SUCCESS_FETCHING_ADMIN,
    admin,
  };
};

export const errorFetchingAdmin = () => {
  return {
    type: ERROR_FETCHING_ADMIN,
  };
};

export const fetchAdmin = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingAdmin());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 3000);

      let params = {
        keyword: getState().admin.keyword,
      };

      // console.log('sebelum fetch admin');

      let res = await debouncedFetchAdmin('/cms/admin', params);

      console.log(res.data.data);

      dispatch(
        successFetchingAdmin({
          admin: res.data.data
        })
      );
    } catch (error) {
      dispatch(errorFetchingAdmin());
    }
  };
};


export const setKeyword = (keyword) => {
  // console.log('first')
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

