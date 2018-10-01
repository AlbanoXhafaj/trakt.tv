import React from "react";
import PropTypes from 'prop-types';

import SelectList from "containers/SelectList";
import SearchPanel from "containers/SearchPanel";

import * as actionCreators from "actions/actionCreators";
import { filters } from "reducers/FiltersReducer";
import * as selectors from "store/stateSelectors";
import { connect } from "react-redux";

//Creates 2 SelectLists, 1 SearchPanel and if needed 1 extra Select List for the period filters
export const _ManagementPanel = ({ sortFilter, searchText , setSortFilter , setPeriodFilter, setGridSizeFilter , setSearchFilter }) => (
  <fieldset>
    <legend>Management Panel</legend>
    <SelectList
      title="Sort"
      options = { filters.sortFilters.getValues()  }
      onChange = { setSortFilter }
    />
    {
      sortFilter.needPeriodParameter
        ? <SelectList
            title="Period"
            options = { filters.periodFilters.getValues() }
            onChange = { setPeriodFilter }
          />
        : null
    }
    <SearchPanel onChange = { setSearchFilter } text = { searchText }/>
    <SelectList
      title="Grid Size"
      options = { filters.gridSizeFilters.getValues() }
      onChange = { setGridSizeFilter }
    />
  </fieldset>
);

export const mapStateToProps = (state) =>({
  sortFilter: selectors.getSortFilter(state),
  searchText: selectors.getSearchText(state)
});

export const mapDispatchToProps = {
  setSortFilter: actionCreators.setSortFilter,
  setPeriodFilter: actionCreators.setPeriodFilter,
  setGridSizeFilter: actionCreators.setGridSizeFilter,
  setSearchFilter: actionCreators.setSearchFilter
};

const ManagementPanel = connect(mapStateToProps,mapDispatchToProps)(_ManagementPanel);

ManagementPanel.propTypes = {
  sortFilter: PropTypes.exact({
    url: PropTypes.string,
    value: PropTypes.string,
    needPeriodParameter: PropTypes.bool
  }).isRequired,
  searchText: PropTypes.string.isRequired,
  searchFilter: PropTypes.func.isRequired,
  setPeriodFilter: PropTypes.func.isRequired,
  setGridSizeFilter: PropTypes.func.isRequired,
  setSearchFilter: PropTypes.func.isRequired
};

export default ManagementPanel;
