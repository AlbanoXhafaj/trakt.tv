import { filtersActionTypes } from "../actions/actionTypes";

//Array of objects which has all the necessary info create a call to trakt.api
// like the shows we are looking for "Popular"
// the url of the web service
// the need of a period parametre in the url
const sortFilters = [
  {
    value: "Popular",
    url: "https://api.trakt.tv/shows/popular",
    needPeriodParameter: false
  },
  {
    value: "Trending",
    url: "https://api.trakt.tv/shows/trending",
    needPeriodParameter: false
  },
  {
    value: "Most Watched",
    url: "https://api.trakt.tv/shows/watched/",
    needPeriodParameter: true
  },
  {
    value: "Most Played",
    url: "https://api.trakt.tv/shows/played/",
    needPeriodParameter: true
  },
  {
    value: "Most Collected",
    url: "https://api.trakt.tv/shows/collected/",
    needPeriodParameter: true
  },
  {
    value: "Most Anticipated",
    url: "https://api.trakt.tv/shows/anticipated",
    needPeriodParameter: false
  }
];

//Array of object in order to have a lookalike structure with other filters
//in all objects that we will use for the SelectList containers
const periodFilters = [
  {
    value: "Weekly"
  },
  {
    value: "Monthly"
  },
  {
    value: "Yearly"
  },
  {
    value: "All"
  }
];

//Array of objects that has the info about the total number of items of the grid
//and the number of coolums of te grid
const gridSizeFilters = [
  {
    value: 10,
    columns: 5
  },
  {
    value: 30,
    columns: 6
  },
  {
    value: 50,
    columns: 10
  },
  {
    value: 100,
    columns: 10
  }
];

//returns a function that returns all the values of specified filter
const getValues = (filters) => () => filters.map( filter => filter.value );

//returns a function that returns a filter at a specific index in filters array
const getFilter = (filters) => (index) => ( { ...filters[index] } );

//Object that hold all the needed functions for each filter
export const filters = {
  sortFilters: {
    getValues: getValues(sortFilters),
    getFilter: getFilter(sortFilters)
  },
  periodFilters: {
    getValues: getValues(periodFilters),
    getFilter: getFilter(periodFilters)
  },
  gridSizeFilters: {
    getValues: getValues(gridSizeFilters),
    getFilter: getFilter(gridSizeFilters)
  },
  searchFilter: {
    getFilter: (text = "") => ({
      searchText: text,
      url: "https://api.trakt.tv/search/show,title?fields=title&query="
    })
  }
}


//The initial state of the reducer
export const initialState = {
  sortFilter: filters.sortFilters.getFilter(0),
  periodFilter: filters.periodFilters.getFilter(0),
  gridSizeFilter: filters.gridSizeFilters.getFilter(0),
  searchFilter: filters.searchFilter.getFilter()
}


const filtersReducer = ( state = initialState, action ) => {
  switch(action.type){
    case filtersActionTypes.SET_SORT_FILTER:
    return {
      ...state,
      sortFilter: action.sortFilter,                   //new sort filter
      searchFilter: filters.searchFilter.getFilter()                //clears the search box
    }
    case filtersActionTypes.SET_PERIOD_FILTER:
    return {
      ...state,
      periodFilter: action.periodFilter,              //new period filter
      searchFilter: filters.searchFilter.getFilter()                 //clears the search box
    }
    case filtersActionTypes.SET_GRID_SIZE_FILTER:
    return {
      ...state,
      gridSizeFilter: action.gridSizeFilter           //new grid size filter
    };
    case filtersActionTypes.SET_SEARCH_FILTER:
    return {
      ...state,
      searchFilter: action.searchFilter
    };
    default:
    return state;
  }
}

// functions that acceps all te filters and return the current title of the page
export const getTitle = ( filters ) => {

  if(filters.searchFilter.searchText) return "Searched Shows";
  let title = filters.sortFilter.value + " Shows";
  title = filters.sortFilter.needPeriodParameter
    ? filters.periodFilter.value +" "+ title
    : title;

  return title;
}

//function that accepts all the filters and combine them for the url of the service
export const getUrl = ( filters ) => {
  if( filters.searchFilter.searchText )
    return filters.searchFilter.url + filters.searchFilter.searchText.toLowerCase();  //if search field is not null whatever the value of the sorting is we are using the  search service
  let period = (filters.sortFilter.needPeriodParameter)
    ? filters.periodFilter.value.toLowerCase()
    : "";  //if search is null we save the period parametre if needed

  let url = filters.sortFilter.url + period;

  return url;    //we return the combined url
}

export default filtersReducer;
