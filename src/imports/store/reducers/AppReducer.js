import fetchReducer from "./FetchReducer";
import filtersReducer from "./FiltersReducer";
import paginationReducer from "./PaginationReducer";
import { combineReducers } from "redux";

//combine the 3 reducers to some specified keys
const appReducer = combineReducers({
  fetch: fetchReducer,
  pagination: paginationReducer,
  filters: filtersReducer
});

export default appReducer;
