import { fetchActionTypes , filtersActionTypes , paginationActionTypes } from "./actionTypes";

// ACTIONS FOR FETCH REDUCER

//Fetch promise resolves successfully
export const  dataFetched = ( pagesNumber , shows ) =>({
  type: fetchActionTypes.DATA_FETCHED,
  pagesNumber,
  shows
});

//Fetch promise is rejected
export const fetchingError = () => ({
  type: fetchActionTypes.FETCHING_ERROR
});

//Fetch another resource
export const fetchNewResource = () => ({
  type: fetchActionTypes.FETCH_NEW_RESOURCE
});

//Fetching started
export const startFetching = () =>({
  type: fetchActionTypes.START_FETCHING
});

// ACTIONS FOR PAGINATION REDUCER

//Switch page index like page: "2"
export const switchPage = (pageIndex) => ({
  type: paginationActionTypes.SWITCH_PAGE,
  pageIndex
});

//Load more indexes in pagination panel
export const loadNewPageIndexes = startIndex => ({
  type: paginationActionTypes.LOAD_NEW_PAGE_INDEXES,
  startIndex
});

export const showDefaultPage = () => ({
  type: paginationActionTypes.SHOW_DEFAULT_PAGE
});

// ACTIONS FOR FILTERS REDUCER

//set new sort filter
export const setSortFilter = sortFilter => ({
  type: filtersActionTypes.SET_SORT_FILTER,
  sortFilter
});

//set new period filter
export const setPeriodFilter = periodFilter => ({
  type: filtersActionTypes.SET_PERIOD_FILTER,
  periodFilter
});

//set new grid size filter
export const setGridSizeFilter = gridSizeFilter => ({
  type: filtersActionTypes.SET_GRID_SIZE_FILTER,
  gridSizeFilter
});

//set new searching text
export const setSearchFilter = searchFilter => ({
  type: filtersActionTypes.SET_SEARCH_FILTER,
  searchFilter
});
