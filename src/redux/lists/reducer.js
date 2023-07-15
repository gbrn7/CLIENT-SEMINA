import {
  START_FETCHING_LISTS_CATEGORIES,
  SUCCESS_FETCHING_LISTS_CATEGORIES,
  ERROR_FETCHING_LISTS_CATEGORIES,
  START_FETCHING_LISTS_TALENTS,
  SUCCESS_FETCHING_LISTS_TALENTS,
  ERROR_FETCHING_LISTS_TALENTS,
  START_FETCHING_LISTS_EVENTS,
  SUCCESS_FETCHING_LISTS_EVENTS,
  ERROR_FETCHING_LISTS_EVENTS,
  START_FETCHING_LISTS_ROLES,
  ERROR_FETCHING_LISTS_ROLES,
  SUCCESS_FETCHING_LISTS_ROLES,
} from './constants';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  categories: [],
  statusCategories: statuslist.idle,
  talents: [],
  statusTalents: statuslist.idle,
  events: [],
  statusEvents: statuslist.idle,
  roles: [],
  statusRoles: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_LISTS_CATEGORIES:
      return { ...state, statusCategories: statuslist.process };

    case ERROR_FETCHING_LISTS_CATEGORIES:
      return { ...state, statusCategories: statuslist.error };

    case SUCCESS_FETCHING_LISTS_CATEGORIES:
      return {
        ...state,
        statusCategories: statuslist.success,
        categories: action.categories,
      };

    case START_FETCHING_LISTS_TALENTS:
      return { ...state, statusTalents: statuslist.process };

    case ERROR_FETCHING_LISTS_TALENTS:
      return { ...state, statusTalents: statuslist.error };

    case SUCCESS_FETCHING_LISTS_TALENTS:
      return {
        ...state,
        statusTalents: statuslist.success,
        talents: action.talents,
      };

    case START_FETCHING_LISTS_EVENTS:
      return { ...state, statusEvents: statuslist.process };

    case ERROR_FETCHING_LISTS_EVENTS:
      return { ...state, statusEvents: statuslist.error };

    case SUCCESS_FETCHING_LISTS_EVENTS:
      return {
        ...state,
        statusEvents: statuslist.success,
        events: action.events,
      };


    case START_FETCHING_LISTS_ROLES:
      return { ...state, statusRoles: statuslist.process };

    case ERROR_FETCHING_LISTS_ROLES:
      return { ...state, statusRoles: statuslist.error };

    case SUCCESS_FETCHING_LISTS_ROLES:
      return {
        ...state,
        statusRoles: statuslist.success,
        roles: action.roles,
      };

    default:
      return state;
  }
}
