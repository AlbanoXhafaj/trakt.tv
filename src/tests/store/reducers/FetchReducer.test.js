import deepFreeze from 'deep-freeze';
import fetchReducer,{ initialState , fetchStatus } from "reducers/FetchReducer";
import { fetchActionTypes } from "actions/actionTypes";

describe("fetch reducer", () => {

  const initState = {
    status: fetchStatus.newFetch,
    data: {
      pagesNumber: 0,
      shows: []
    }
  }

  it("initState is correct and returned" , () => {

    expect(initialState).toEqual(initState);

    const action = {};

    deepFreeze(initialState);
    deepFreeze(action);

    const updatedState = fetchReducer( initState , action );

    expect(updatedState).toEqual(initState);
  });

  it("default state success" , () => {
    const state = "default";

    const action = {};

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = fetchReducer( state , action );

    expect(updatedState).toEqual(state);
  });

  it("DATA_FETCHED success", () => {

    const state = initState;

    const action = {
      type: fetchActionTypes.DATA_FETCHED,
      pagesNumber: 20,
      shows: [
        {
          id: 1,
          title: "Big Bang Theory"
        },
      ]
    }

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = fetchReducer( state , action );

    const expectedState = {
      status: fetchStatus.complete,
      data: {
        pagesNumber: 20,
        shows: [
          {
            id: 1,
            title: "Big Bang Theory"
          }
        ]
      }
    };

    expect(updatedState).toEqual(expectedState);
  });

  it("FETCHING_ERROR success" , () => {
    const state = initState;

    const action = {
      type: fetchActionTypes.FETCHING_ERROR
    };

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = fetchReducer( state , action );

    const expectedState = {
      ...initState,
      status: fetchStatus.error
    };

    expect(updatedState).toEqual(expectedState);

  });

  it("START_FETCHING success" , () => {
    const state = initState;

    const action = {
      type: fetchActionTypes.START_FETCHING
    };

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = fetchReducer( state , action );

    const expectedState = {
      ...initState,
      status: fetchStatus.fetching
    };

    expect(updatedState).toEqual(expectedState);

  });

  it("FETCH_NEW_RESOURCE success" , () => {
    const state = {
      status: fetchStatus.complete,
      data: {
        pagesNumber: 20,
        shows: [
          {
            id: 1,
            title: "Big Bang Theory"
          }
        ]
      }
    };

    const action = {
      type: fetchActionTypes.FETCH_NEW_RESOURCE
    };

    deepFreeze(state);
    deepFreeze(action);

    const updatedState = fetchReducer( state , action );

    const expectedState = initState;

    expect(updatedState).toEqual(expectedState);

  });
})
