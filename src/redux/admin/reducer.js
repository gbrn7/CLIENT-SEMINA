import {
  START_FETCHING_ADMIN,
  SUCCESS_FETCHING_ADMIN,
  ERROR_FETCHING_ADMIN,
  SET_KEYWORD,
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
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_ADMIN:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_ADMIN:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_ADMIN:
      return {
        ...state,
        status: statuslist.success,
        data: action.admin,
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
