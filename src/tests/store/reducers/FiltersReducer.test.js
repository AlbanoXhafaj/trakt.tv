import deepFreeze from 'deep-freeze';
import { filtersActionTypes } from "actions/actionTypes";
import filtersReducer,{ filters, initialState } from "reducers/FiltersReducer";

describe("filters reducer" , () => {

  const state = {
    sortFilter: filters.sortFilters.getFilter(0),
    periodFilter: filters.sortFilters.getFilter(2),
    gridSizeFilter: filters.gridSizeFilters.getFilter(1),
    searchFilter: filters.searchFilter.getFilter("ace")
  };

  it("initialState is correct and returned" , () => {
    const initState = {
      sortFilter: filters.sortFilters.getFilter(0),
      periodFilter: filters.periodFilters.getFilter(0),
      gridSizeFilter: filters.gridSizeFilters.getFilter(0),
      searchFilter: filters.searchFilter.getFilter("")
    };

    expect(initialState).toEqual(initState);

    const action = {};

    deepFreeze(initialState);
    deepFreeze(action);

    const updatedState = filtersReducer( initialState , action );

    expect(updatedState).toEqual(initialState);
  });

  it("default state success" , () => {
    const state = "default";

    const action = {};

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = filtersReducer( state , action );

    expect(updatedState).toEqual(state);
  });

  it("SET_SORT_FILTER success" , () => {
    const newFilter = filters.sortFilters.getFilter(3);

    const action = {
      type: filtersActionTypes.SET_SORT_FILTER,
      sortFilter: newFilter
    }

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = filtersReducer( state , action );

    const expectedState = {
      ...state,
      sortFilter: newFilter,
      searchFilter: {
        ...state.searchFilter,
        searchText: ""
      }
    }

    expect(updatedState).toEqual(expectedState);
  })

  it("SET_PERIOD_FILTER success" , () => {
    const newFilter = filters.periodFilters.getFilter(3);

    const action = {
      type: filtersActionTypes.SET_PERIOD_FILTER,
      periodFilter: newFilter
    }

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = filtersReducer( state , action );

    const expectedState = {
      ...state,
      periodFilter: newFilter,
      searchFilter: {
        ...state.searchFilter,
        searchText: ""
      }
    }

    expect(updatedState).toEqual(expectedState);
  })

  it("SET_GRID_SIZE_FILTER success" , () => {
    const newFilter = filters.gridSizeFilters.getFilter(3);

    const action = {
      type: filtersActionTypes.SET_GRID_SIZE_FILTER,
      gridSizeFilter: newFilter
    }

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = filtersReducer( state , action );

    const expectedState = {
      ...state,
      gridSizeFilter: newFilter
    }

    expect(updatedState).toEqual(expectedState);
  })

  it("SET_SEARCH_FILTER success" , () => {
    const newFilter = filters.searchFilter.getFilter("battle");

    const action = {
      type: filtersActionTypes.SET_SEARCH_FILTER,
      searchFilter: newFilter
    };

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = filtersReducer( state , action );

    const expectedState = {
      ...state,
      searchFilter: newFilter
    };

    expect(updatedState).toEqual(expectedState);
  })

  it("default state success" , () => {
    const state = "default";

    const action = {};

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = filtersReducer( state , action );

    expect(updatedState).toEqual(state);
  })
});
