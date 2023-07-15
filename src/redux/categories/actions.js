import {
  START_FETCHING_CATEGORIES,
  SUCCESS_FETCHING_CATEGORIES,
  ERROR_FETCHING_CATEGORIES,
  SET_KEYWORD,
  SET_PAGE,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchCategories = debounce(getData, 1000);

// START
export const startFetchingCategories = () => {
  return {
    type: START_FETCHING_CATEGORIES,
  };
};

// SUCCESS
export const successFetchingCategories = ({ categories, pages }) => {
  return {
    type: SUCCESS_FETCHING_CATEGORIES,
    categories,
    pages,
  };
};

export const errorFetchingCategories = () => {
  return {
    type: ERROR_FETCHING_CATEGORIES,
  };
};

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingCategories());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 3000);

      let params = {
        page: getState().categories?.page || 1,
        limit: getState().categories?.limit || 10,
        keyword: getState().categories.keyword,
      };

      // console.log('sebelum fetch categories');

      let res = await debouncedFetchCategories('/cms/categories', params);

      dispatch(
        successFetchingCategories({
          categories: res.data.data.categories,
          pages: res.data.data.pages
        })
      );
    } catch (error) {
      dispatch(errorFetchingCategories());
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

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};
