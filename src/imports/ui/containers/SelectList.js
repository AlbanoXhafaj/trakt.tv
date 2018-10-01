import React from "react";
import PropTypes from 'prop-types';

//DropdownList generate by an array of strings
//title - describes the dropwdownlist user
//options - array of strings, elements of the list
//onChange - function that will accept as a parametre the index of the element
//fistElement - the first element of the list like "select options below"

const SelectList = ({ title, options , onChange , firstElement = null }) => (
  <div className="inline">
    <span> { title }: </span>
    <select onChange = { (e) => onChange( parseInt(e.target.value, 10) ) } >
      {
        firstElement
          ? <option value="-1"> { firstElement } </option>
          :null
      }
      {
        //create <option> tags with index as value
        options.map( (option,index) => (
          <option
            key= { index }
            value = { index }
          >
            { option }
          </option>
        ))
      }
    </select>
  </div>
);

SelectList.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  fistElement: PropTypes.string
};

export default SelectList;
