import * as realTraktTvAPI from "../TraktTvAPI";

const showsCount = 101;

//Slices shows in pages with number of shows
//equal to itemLimit number
// and returns a show object
const extractData = (pageIndex , itemLimit ) => {

  pageIndex = pageIndex > 0 ? pageIndex : 1;
  itemLimit = itemLimit > 0 ? itemLimit : 10;

  const pagesNumber = Math.ceil( showsCount / itemLimit );

  if( pageIndex > pagesNumber ) return null;

  const firstShowIndex = ( pageIndex - 1 ) * itemLimit + 1;

  let shows = [];
  for(let i = firstShowIndex ; i < firstShowIndex + itemLimit ; i++ )
    shows.push({ id: i, title: "Show "+i });

  return {
    pagesNumber: pagesNumber,
    shows: shows
  };
}

//If response is not null , it resolves returnng the shows, else reject
const getShows = ( url , pageIndex ,itemLimit ) =>{
  return new Promise(function(resolve, reject){
    let response = extractData( pageIndex , itemLimit);
    response ? resolve(response): reject();
  });
};

const traktTvApi = {
  getShows: ( url , pageIndex = 1 , itemLimit = 10 ) => getShows( url , pageIndex , itemLimit )
};

//Exports original functions for testing purposes
export const extractPagesNumber = (response) => realTraktTvAPI.extractPagesNumber(response);
export const extractShows = (shows) => realTraktTvAPI.extractShows(shows);
export const queriedUrl = (url , page ,itemLimit) => realTraktTvAPI.queriedUrl(url,page,itemLimit);
export const omdbAppKey = realTraktTvAPI.omdbAppKey;

export default traktTvApi;
