import React from "react";
import PropTypes from 'prop-types';
// a centered div with a text displaying an info
const InfoMessage = ({ children }) => (
  <div className="infoMessage">
    <h3>
      { children }
    </h3>
  </div>
)

InfoMessage.propTypes = {
  children: PropTypes.string.isRequired
};

export default InfoMessage;
