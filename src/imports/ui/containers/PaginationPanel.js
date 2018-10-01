import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import * as actionCreators from "actions/actionCreators";
import * as selectors from "store/stateSelectors";
// a hyperlink used as button to load more indexes in descending order.
export const LeftDoubleArrow = ({ displayedIndexes , startIndex , loadLeftPaginationIndexes }) => (
  <a
    href=""
    onClick = { (e) => { e.preventDefault(); loadLeftPaginationIndexes( startIndex , displayedIndexes ); }}
  >
    {"<<"}
  </a>
)

// a hyperlink used as button to load more indexes in ascending order.
export const RightDoubleArrow = ({ displayedIndexes , startIndex , pagesNumber , loadRightPaginationIndexes }) => (
  <a
    href=""
    onClick = { (e) => { e.preventDefault(); loadRightPaginationIndexes( startIndex , pagesNumber , displayedIndexes); }}
  >
    {">>"}
  </a>
)

//a hyperlink representin displayed indexes that noone is the active one, on click passes index as param
export const Index = ({ onChange ,index }) => (
  <a
    href=""
    onClick = { (e) => { e.preventDefault(); onChange(index); } }
  >
    { index }
  </a>
)

//the only active link represent the displayed page index.
export const ActiveIndex = ({ index }) => (
  <a
    href=""
    className="active"
    onClick = { (e) => { e.preventDefault(); }}
  >
    { index }
  </a>
)

// a function that stores all the generated indexes in an array and returns them wrapped in a div.
export const pageIndexes = ({ displayedIndexes , pageIndex , pagesNumber , startIndex , switchPage } ) => {
  let indexes=[];
  for( let i=0; i< displayedIndexes; i++ ){
    let newIndex = startIndex + i;
    if( newIndex <= pagesNumber) {

      if( newIndex === pageIndex )
        indexes.push( <ActiveIndex key={i}  index={ newIndex } /> );
      else
        indexes.push( <Index key={i} onChange= { switchPage } index={ newIndex } /> );
    }
  }

  return <div>{indexes}</div>;
}

export const _PaginationPanel = (props) => (
  <div className="pagination">
    <LeftDoubleArrow {...props} />
    { pageIndexes(props) }
    <RightDoubleArrow  {...props}/>
  </div>
)

const mapStateToProps = (state) =>({
  pageIndex: selectors.getPageIndex(state),
  pagesNumber: selectors.getPagesNumber(state),
  startIndex: selectors.getStartIndex(state),
  displayedIndexes: selectors.getDisplayedIndexes(state)
});

const mapDispatchToProps = {
  loadLeftPaginationIndexes: actionCreators.loadLeftPaginationIndexes,
  loadRightPaginationIndexes: actionCreators.loadRightPaginationIndexes,
  switchPage: actionCreators.switchPage
};

const PaginationPanel = connect(mapStateToProps,mapDispatchToProps)(_PaginationPanel);

PaginationPanel.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  pagesNumber: PropTypes.number.isRequired,
  startIndex: PropTypes.number.isRequired,
  displayedIndexes: PropTypes.number.isRequired,
  loadLeftPaginationIndexes: PropTypes.func.isRequired,
  loadRightPaginationIndexes: PropTypes.func.isRequired,
  switchPage: PropTypes.func.isRequired
};

export default PaginationPanel;
