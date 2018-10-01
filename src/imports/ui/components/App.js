import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import Title from "containers/Title";
import ErrorSign from "containers/ErrorSign";
import LoadingProcess from "containers/LoadingProcess";
import InfoMessage from "containers/InfoMessage";
import Table from "containers/Table";
import PaginationPanel from "containers/PaginationPanel";
import ManagementPanel from "containers/ManagementPanel";

import * as actionCreators from "actions/actionCreators";
import * as selectors from "store/stateSelectors";
import { fetchStatus  as FetchStatus } from "reducers/FetchReducer";


//A component that checks for fetched every time after render,
//in order to dispatch actions after renders and while rendering,
//because may cause an unexpected behaviour from the application
export class _App extends React.Component{

  componentDidUpdate(){
    shouldFetch(this.props);
  }

  componentDidMount(){
   shouldFetch(this.props);
  }

  render(){
    return(
      <div className="app" >
        <Title>{ this.props.title }</Title>
        { getBodyContainer(this.props) }
        <ManagementPanel />
      </div>
    )
  }
}

//Controls if we should fetch new data, is so we fetch
export const shouldFetch = ( {fetchStatus , pageIndex , url , nrItems , fetchData } ) => {
  if( fetchStatus === FetchStatus.newFetch ) fetchData( url , pageIndex , nrItems );
}

//Extracts data needed for the display from the props
export const getBodyContainer = ( { fetchStatus , shows } ) => {

  const NoShows = !shows || shows.length === 0 ? true : false;

  if(fetchStatus === FetchStatus.fetching )  return <LoadingProcess />;
  if( fetchStatus === FetchStatus.error ) return <ErrorSign />;
  if( NoShows ) return <InfoMessage>No shows found.</InfoMessage>;

   return (
    <div className="center" >
      <Table />
      <PaginationPanel />
    </div>
  )
}

const mapStateToProps = (state) => ({
  fetchStatus: selectors.getFetchStatus(state),
  shows: selectors.getShows(state),
  pageIndex: selectors.getPageIndex(state),
  nrItems: selectors.getNrItems(state),
  url: selectors.getUrl(state),
  title: selectors.getTitle(state)
});


const mapDispatchToProps = {
  fetchData: actionCreators.fetchData
};

const App = connect( mapStateToProps , mapDispatchToProps)(_App);

App.propTypes = {
  fetchStatus: PropTypes.string.isRequired,
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageIndex: PropTypes.number.isRequired,
  nrItems: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired
};

export default App;
