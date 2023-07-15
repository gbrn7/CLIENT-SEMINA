import {
  START_FETCHING_CATEGORIES,
  SUCCESS_FETCHING_CATEGORIES,
  ERROR_FETCHING_CATEGORIES,
  SET_KEYWORD,
  SET_PAGE,
} from './constants';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  data: [],
  keyword: '',
  page: 1,
  limit: 10,
  pages: 1,
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_CATEGORIES:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_CATEGORIES:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_CATEGORIES:
      return {
        ...state,
        status: statuslist.success,
        data: action.categories,
        pages: action.pages,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    default:
      return state;
  }
}
