import thunk from "redux-thunk";
import configureStore from 'redux-mock-store'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

//Dispatches the action creator and return the actions from store
const dispatchAction = ( action , asynchronous = false) => {
  store.clearActions();
  let dispatchActions = store.dispatch(action);
  if(asynchronous) return  dispatchActions.then(() =>store.getActions());

  return store.getActions();
}

//For each actions check if has the expected payload
const actionMatch = ( actions , expectedActions) => {
   actions.forEach( (action,index) =>
    expect(action).toEqual(expectedActions[index])
  );
};

//Waits for the actions to finish and does the tests
const testSuccess = (action , expectedActions , asynchronous) => {
  const actions = dispatchAction(action , asynchronous);

  if( asynchronous )return (async () => actionMatch( await actions , expectedActions ))();

  return actionMatch(actions, expectedActions);
}

//Object with one method test with has an optional parameter for asynchronous actionCreators
//If asynchronous you should 1)return the async function or promise from action creators
//2) the test must be an async function that awaits actionCreatorTester
const actionCreatorTester = {
  test: (action , expectedActions , asynchronous = false ) =>
    testSuccess(action , expectedActions , asynchronous)
};

export default actionCreatorTester;
