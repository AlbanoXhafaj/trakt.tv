import React from "react";
import PropTypes from 'prop-types';

// OnChange pass the text of input as parameter
// Input box value equals to the search filters text, needed for wipe out by other actions
const SearchPanel = ( { onChange, text }) => (
  <div className="inline">
    <span>Search:</span>
    <input
      type="text"
      placeholder="keyword..."
      value = { text }
      onChange = { (e) => onChange(e.target.value) }
    />
  </div>
);

SearchPanel.propTypes = {
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default SearchPanel;
