import { getTitle as GetTitle , getUrl as GetUrl } from "reducers/FiltersReducer";

export const getFetchStatus = (state) => state.fetch.status;
export const getShows = (state) => state.fetch.data.shows;
export const getPagesNumber = (state) => state.fetch.data.pagesNumber;

export const getPageIndex = (state) => state.pagination.pageIndex;
export const getStartIndex = (state) => state.pagination.startIndex;
export const getDisplayedIndexes = (state) => state.pagination.displayedIndexes;


export const getUrl = (state) => GetUrl(state.filters);
export const getTitle = (state) => GetTitle(state.filters);
export const getSortFilter = (state) => state.filters.sortFilter;
export const getSearchText = (state) => state.filters.searchFilter.searchText;
export const getColumnCount = (state) => state.filters.gridSizeFilter.columns;
export const getNrItems = (state) => state.filters.gridSizeFilter.value;
