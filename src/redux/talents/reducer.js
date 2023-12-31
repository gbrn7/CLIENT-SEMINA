import {
  START_FETCHING_TALENTS,
  SUCCESS_FETCHING_TALENTS,
  ERROR_FETCHING_TALENTS,
  SET_KEYWORD,
  SET_ROLE,
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
  role: '',
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_TALENTS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_TALENTS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_TALENTS:
      return {
        ...state,
        status: statuslist.success,
        data: action.talents,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    case SET_ROLE:
      return {
        ...state,
        role: action.role,
      };

    default:
      return state;
  }
}
