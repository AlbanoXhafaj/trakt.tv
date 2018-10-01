import actionCreatorTester from "./ActionCreatorTester";

import { fetchActionTypes , paginationActionTypes , filtersActionTypes } from "actions/actionTypes";
import { fetchStatus } from "reducers/FetchReducer";
import { filters, getUrl } from "reducers/FiltersReducer";

import * as actionCreators from "actions/actionCreators";
import * as actions from "actions/actions";

describe("fetch action creators", () => {

  describe("fetch data", () =>{
    const url ="https://api.trakt.tv/shows/popular";
    const pageIndex = 4;
    const nrItems = 5;

    it("handles changing in fetch status and returs data" , async () => {
      const expectedActions = [
        {
          type: fetchActionTypes.START_FETCHING
        },
        {
          type: fetchActionTypes.DATA_FETCHED,
          pagesNumber: 21,
          shows: [
            { id:16 , title: "Show 16" },
            { id:17 , title: "Show 17" },
            { id:18 , title: "Show 18" },
            { id:19 , title: "Show 19" },
            { id:20 , title: "Show 20" }
          ]
        }
      ];

      expect.assertions(2);
      await actionCreatorTester.test(
        actionCreators.fetchData(url,pageIndex,nrItems) , expectedActions , true
      );
    });
  });

  describe("fetching error", () =>{
    const url ="https://api.trakt.tv/validUrl";
    const pageIndex = 1000;
    const nrItems = 5;

    it("handles changing in fetch status" , async() => {
      const expectedActions = [
        {
          type: fetchActionTypes.START_FETCHING
        },
        {
          type: fetchActionTypes.FETCHING_ERROR
        }
      ];

      expect.assertions(2);
      return await actionCreatorTester.test(
        actionCreators.fetchData(url,pageIndex,nrItems) , expectedActions , true
      );
    });
  });

});

describe("pagination action creators", () => {

  describe("load left pagination indexes" , () => {
    const displayedIndexes = 10;

    it("should set startIndex to 7" ,() => {
      const startIndex = 17;

      const expectedActions = [
        {
          type: paginationActionTypes.LOAD_NEW_PAGE_INDEXES,
          startIndex: 7
        }
      ];

      actionCreatorTester.test(
        actionCreators.loadLeftPaginationIndexes( startIndex , displayedIndexes), expectedActions
      );
    });

    it("should set startIndex to 1" , () => {
      const startIndex = 5;

      const expectedActions = [
        {
          type: paginationActionTypes.LOAD_NEW_PAGE_INDEXES,
          startIndex: 1
        }
      ];

      actionCreatorTester.test(
        actionCreators.loadLeftPaginationIndexes( startIndex , displayedIndexes ) , expectedActions
      );
    })
  });

  describe("load right pagination indexes" , () => {
    const displayedIndexes = 6;
    const pagesNumber = 20;

    it("should set startIndex to 12" ,() => {
      const startIndex = 6;

      const expectedActions = [
        {
          type: paginationActionTypes.LOAD_NEW_PAGE_INDEXES,
          startIndex: 12
        }
      ];

      actionCreatorTester.test(
        actionCreators.loadRightPaginationIndexes( startIndex , pagesNumber , displayedIndexes ) , expectedActions
      );
    });

    it("should set startIndex to 14" , () => {
      const startIndex = 10;

      const expectedActions = [
        {
          type: paginationActionTypes.LOAD_NEW_PAGE_INDEXES,
          startIndex: 14
        }
      ];

      actionCreatorTester.test(
        actionCreators.loadRightPaginationIndexes( startIndex , pagesNumber, displayedIndexes ) , expectedActions
      );
    })
  });

  describe("switch Page", () => {
    const newPageIndex = 10;

    it("should set pageIndex to 10 and fetch from a new resource" , () => {
      const expectedActions = [
        {
          type: paginationActionTypes.SWITCH_PAGE,
          pageIndex: 10
        },
        {
          type: fetchActionTypes.FETCH_NEW_RESOURCE
        }
      ];

      actionCreatorTester.test(
        actionCreators.switchPage(newPageIndex) , expectedActions
      );
    })
  });

});

describe("filters action creators", () =>{
  const showDefaultPageAction = {
    type: paginationActionTypes.SHOW_DEFAULT_PAGE
  };
  const fetchNewResourceAction = {
    type: fetchActionTypes.FETCH_NEW_RESOURCE
  };

  describe("set sort filter" , () => {
    const index = 2;
    const sortFilter = filters.sortFilters.getFilter(index);

    it("should set the new sortFilter and fetch new resource" , () => {
      const expectedActions = [
        {
          type: filtersActionTypes.SET_SORT_FILTER,
          sortFilter: sortFilter
        },
        showDefaultPageAction,
        fetchNewResourceAction
      ];

      actionCreatorTester.test(
        actionCreators.setSortFilter( index ) , expectedActions
      );
    })
  });

  describe("set period filter" , () => {
    const index = 3;
    const periodFilter = filters.periodFilters.getFilter(index);

    it("should set the new periodFilter and fetch from a new resource" , () => {
      const expectedActions = [
        {
          type: filtersActionTypes.SET_PERIOD_FILTER,
          periodFilter: periodFilter
        },
        showDefaultPageAction,
        fetchNewResourceAction
      ];

      actionCreatorTester.test(
        actionCreators.setPeriodFilter( index ) , expectedActions
      );
    })
  });

  describe("set grid filter", () => {
    const index = 1;
    const gridSizeFilter = filters.gridSizeFilters.getFilter(index);

    it("should set the new gridSizeFilter and fetch from a new resource" , () => {
      const expectedActions = [
        {
          type: filtersActionTypes.SET_GRID_SIZE_FILTER,
          gridSizeFilter: gridSizeFilter
        },
        showDefaultPageAction,
        fetchNewResourceAction
      ];

      actionCreatorTester.test(
        actionCreators.setGridSizeFilter( index ) , expectedActions
      );
    })
  });

  describe("set search filter" , () => {
    const searchText = "prison break";
    const searchFilter = filters.searchFilter.getFilter(searchText);

    it("should set the new sortFilter and fetch from a new resource" , () => {
      const expectedActions = [
        {
          type: filtersActionTypes.SET_SEARCH_FILTER,
          searchFilter: searchFilter
        },
        showDefaultPageAction,
        fetchNewResourceAction
      ];

      actionCreatorTester.test(
        actionCreators.setSearchFilter( searchText ) , expectedActions
      );
    });
  });

});
