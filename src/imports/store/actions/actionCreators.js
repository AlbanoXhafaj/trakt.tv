import  traktTvApi from "api/TraktTvAPI";
import * as actions from "./actions";
import { filters } from "reducers/FiltersReducer";

/*Sets FetchStatus to fetching , starts fetching from the api
  addsdispatches corresponding action when resolves or rejects */
export const fetchData = ( url , pageIndex , nrItems ) => (
  dispatch => {
    dispatch(actions.startFetching());

  return traktTvApi.getShows( url , pageIndex , nrItems ).then(
      ({ pagesNumber , shows }) => dispatch(actions.dataFetched( pagesNumber , shows )),
      (error) => dispatch( actions.fetchingError() )
    );
  }
);

//Loads descending indexes by subtracting the start
export const loadLeftPaginationIndexes = ( startIndex , displayedIndexes ) => (
  dispatch => {                                  //example
    let newStartIndex =                          //display 10 indexes, number of pages 25
      startIndex - displayedIndexes > 1          //current index a)5 , b)18
        ? startIndex - displayedIndexes          // a) 5-10 < 1 return 1
        : 1;                                     // b) 18-10 > 1 return 8

    return dispatch( actions.loadNewPageIndexes(newStartIndex) );
  }
);

//Loads ascending indexes by subtracting the start
/*example
  display 10 indexes , number of pages 25
  In order always to display 10 last indexes the inequation is:
  startIndex + displayedIndexes < pagesNumber - displayedIndexes that is equal to
  startIndex + 2 * displayedIndexes < pagesNumber

  a) 7, b)3
  a) 7 + 10 < 25 - 10 <=> 7 + 20 < 25 return 25 - 10;
  b) 3 + 10 < 25 - 10 <=> 3 + 20 < 25 return 3 + 10;
*/
export const loadRightPaginationIndexes = ( startIndex , pagesNumber, displayedIndexes ) => (
  dispatch => {
    let newStartIndex =
      startIndex + 2 * displayedIndexes < pagesNumber
        ? startIndex + displayedIndexes
        : pagesNumber - displayedIndexes > 0
            ? pagesNumber - displayedIndexes
            : 1;

    return dispatch( actions.loadNewPageIndexes(newStartIndex) );
  }
)

//Switches page and loads the new page
export const switchPage = (newPageIndex) =>(
  dispatch => {
    dispatch(actions.switchPage( newPageIndex ));
    dispatch(actions.fetchNewResource());
  }
);

//Sets new filter and load new resource
export const setSortFilter = ( index ) => (
  dispatch => {
    const filter = filters.sortFilters.getFilter(index);
    dispatch(actions.setSortFilter(filter));
    dispatch(actions.showDefaultPage());
    dispatch(actions.fetchNewResource());
  }
)

//Sets new filter and load new resource
export const setPeriodFilter = ( index ) => (
  dispatch => {
    const filter = filters.periodFilters.getFilter(index);
    dispatch(actions.setPeriodFilter(filter));
    dispatch(actions.showDefaultPage());
    dispatch(actions.fetchNewResource());
  }
)

//Sets new filter and load new resource
export const setGridSizeFilter = ( index ) => (
  dispatch => {
    const filter = filters.gridSizeFilters.getFilter(index);
    dispatch(actions.setGridSizeFilter(filter));
    dispatch(actions.showDefaultPage());
    dispatch(actions.fetchNewResource());
  }
)

//Sets new filter and load new resource
export const setSearchFilter = ( searchText ) => (
  dispatch => {
    const filter = filters.searchFilter.getFilter(searchText); // trim() is optional
    dispatch(actions.setSearchFilter(filter));
    dispatch(actions.showDefaultPage());
    dispatch(actions.fetchNewResource());
  }
);
