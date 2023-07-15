import {
  START_FETCHING_ORGANIZERS,
  SUCCESS_FETCHING_ORGANIZERS,
  ERROR_FETCHING_ORGANIZERS,
  SET_KEYWORD,
  SET_PAGE,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchOrganizers = debounce(getData, 1000);

// START
export const startFetchingOrganizers = () => {
  return {
    type: START_FETCHING_ORGANIZERS,
  };
};

// SUCCESS
export const successFetchingOrganizers = ({ organizers, pages }) => {
  return {
    type: SUCCESS_FETCHING_ORGANIZERS,
    organizers,
    pages,
  };
};

export const errorFetchingOrganizers = () => {
  return {
    type: ERROR_FETCHING_ORGANIZERS,
  };
};

export const fetchOrganizers = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingOrganizers());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 3000);

      let params = {
        keyword: getState().organizers.keyword,
        page: getState().organizers?.page || 1,
        limit: getState().organizers?.limit || 10,
      };

      let res = await debouncedFetchOrganizers('/cms/organizers', params);

      dispatch(
        successFetchingOrganizers({
          organizers: res.data.data.organizers,
          pages: res.data.data.pages
        })
      );
    } catch (error) {
      dispatch(errorFetchingOrganizers());
    }
  };
};


export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

