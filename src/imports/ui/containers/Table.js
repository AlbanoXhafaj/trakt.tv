import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";


//It splits the shows array in a matrix[  rows ,columnCount]
const splitInRows = (shows, columnCount) => {
  let rows = [];
  let showsCopy = [ ...shows ];

  while( showsCopy.length > 0 ) rows.push( showsCopy.splice(0,columnCount) );

  return rows;
};

const Row = (shows,index) => (
  <tr key= { index } >
    {
      shows.map( (show,index) => Cell(show,index)) //for every show in row we create a cell
    }
  </tr>
);

const Cell = (show,index) =>(
  <td key={index}>
    <div className="cellTitle">
      <span><b>{ show.title }</b></span>
    </div>
    <div className="cellBody">
      <img src = { show.poster } alt={ show.title +" 's poster"} />
    </div>
    <div className="cellFooter">
      <span>Trakt Id: { show.ids.trakt }</span><br />
      <span>Rating: { Math.round( show.rating * 10) / 10 }</span><br />
      <span>Year: { show.year }</span><br/>
      <span>Episodes: { show.aired_episodes } </span>
    </div>
  </td>
);

export const _Table = ({ shows, columnCount }) => {

  const showsPerRow = splitInRows( shows , columnCount);

  return(
    <table className="center">
      <tbody>
      {
          showsPerRow.map( (row,index) => Row(row,index) ) //for every row we create a Row container
      }
      </tbody>
    </table>
  )
}

const mapStateToProps = (state) => ({
  shows: state.fetch.data.shows,
  columnCount: state.filters.gridSizeFilter.columns
});

const Table = connect( mapStateToProps , null )(_Table);

Table.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columnCount: PropTypes.number.isRequired
};

export default Table;
