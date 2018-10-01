import { fetchActionTypes } from "../actions/actionTypes";

export const fetchStatus = {
  newFetch: "newFetch",
  fetching: "fetching",
  error: "error",
  complete: "complete"
};

export const initialState = {
  status: fetchStatus.newFetch,
  data: {
    pagesNumber: 0,
    shows: []
  }
}

const fetchReducer = (state = initialState, action) => {
  switch(action.type){
    case fetchActionTypes.DATA_FETCHED:   //when the data is fetched and page load
    return {
      status: fetchStatus.complete,
      data:{
        pagesNumber: action.pagesNumber,
        shows: action.shows
      }
    }
    case fetchActionTypes.FETCHING_ERROR: //when couldn't fetch data from api from an unhandable reason
    return {
      ...state,
      status: fetchStatus.error
    }
    case fetchActionTypes.START_FETCHING:
    return {
      ...state,
      status: fetchStatus.fetching
    }
    case fetchActionTypes.FETCH_NEW_RESOURCE:   // initial state that idicates loading from the api
    return initialState;
    default:
    return state;
  }
}

export default fetchReducer;
