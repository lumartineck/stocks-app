import { stocksConstants } from '../_constants';

export function stocks(state = {}, action) {
  switch (action.type) {
    case stocksConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case stocksConstants.GETALL_SUCCESS:
      return {
        items: action.stocks
      };
    case stocksConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}