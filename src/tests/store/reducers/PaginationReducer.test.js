import deepFreeze from 'deep-freeze';
import { paginationActionTypes } from "actions/actionTypes";
import paginationReducer,{ initialState } from "reducers/PaginationReducer";


describe("pagination Reducer" , () => {

  const initState = {
    pageIndex: 1,
    startIndex: 1,
    displayedIndexes: 10
  };

  it("initialState is correct and returned" , () => {

    expect(initialState).toEqual(initState);

    const action = {};

    deepFreeze(initialState);
    deepFreeze(action);

    const updatedState = paginationReducer( initialState , action );

    expect(updatedState).toEqual(initialState);
  });

  it("default state success" , () => {
    const state = "default";

    const action = {};

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = paginationReducer( state , action );

    expect(updatedState).toEqual(state);
  })

  it("SWITCH_PAGE success" , () => {

    const state = initState;

    const action = {
      type: paginationActionTypes.SWITCH_PAGE,
      pageIndex: 5
    }

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = paginationReducer( state , action );

    const expectedState = {
      ...initState,
      pageIndex: 5
    };

    expect(updatedState).toEqual(expectedState);
  });

  it("LOAD_NEW_PAGE_INDEXES success" , () => {
    const state = initState;

    const action = {
      type: paginationActionTypes.LOAD_NEW_PAGE_INDEXES,
      startIndex: 9
    };

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = paginationReducer( state , action );

    const expectedState = {
      ...initState,
      startIndex: 9
    };

    expect(updatedState).toEqual(expectedState);
  })

  it("SHOW_DEFAULT_PAGE success" ,() => {
    const state = {
      pageIndex: 4,
      startIndex: 6,
      displayedIndexes: 10
    };

    const action = {
      type: paginationActionTypes.SHOW_DEFAULT_PAGE
    }

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = paginationReducer( state , action );

    const expectedState = initState;

    expect(updatedState).toEqual(expectedState);
  })

  it("default state success" , () => {
    const state = "default";

    const action = {};

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = paginationReducer( state , action );

    expect(updatedState).toEqual(state);
  })
});
