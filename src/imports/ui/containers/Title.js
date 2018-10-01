import React from "react";
import PropTypes from 'prop-types';

//It accepts the title of page as children
const Title = ({ children }) => (
  <div id="header">
    <h1>{ children }</h1>
  </div>
);

Title.propTypes = {
  children: PropTypes.string.isRequired
};

export default Title;
