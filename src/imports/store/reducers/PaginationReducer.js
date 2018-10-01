import { paginationActionTypes } from "../actions/actionTypes";

export const initialState = {
  pageIndex: 1,
  startIndex: 1,
  displayedIndexes: 10
};

const paginationReducer = ( state = initialState , action ) => {
  switch( action.type ){
    case paginationActionTypes.SWITCH_PAGE:
    return {
      ...state,
      pageIndex: action.pageIndex                          //new page index
    };
    case paginationActionTypes.LOAD_NEW_PAGE_INDEXES:
    return {
      ...state,
      startIndex: action.startIndex                       //new start index for pagination
    };
    case paginationActionTypes.SHOW_DEFAULT_PAGE:
    return initialState;
    default:
    return state;
  }
};

export default paginationReducer;
