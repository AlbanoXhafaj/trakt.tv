//Client Id from the trakt.tv API
const clientId = "e50a21847866d95949214e0f461e8ce23a29a487a58e62b84068178c4f3276a2";

//AppKey from the Omdb where we take images src's
export const omdbAppKey = "59467d78";

//Required headers for the request
const headers = new Headers({
  "Content-type": "application/json",
  "trakt-api-key": clientId,
  "trakt-api-version": "2"
});

//Set required info for the request
const init = {
  method: "GET",
  headers: headers
}

//Extracts the total number of pages from response headers
export const extractPagesNumber = (response) => {
  const searchHeader = "x-pagination-page-count";

  let pagesNumber;

  for( let pair of response.headers.entries()) {
    if( pair[0] === searchHeader ) {
      pagesNumber = parseInt(pair[1],10);
      break;
    }
  }

  return pagesNumber;
}

//Extracts shows and adding them a poster property
//cause trakt Api doesn't offer images anymore
export const extractShows = (shows) =>(
  shows.map( show => {

    show = show.show || show;    // 2 different response structures offered by the API
    let imageUrl = "http://img.omdbapi.com/?i="+show.ids.imdb+"&apikey="+omdbAppKey;

    return {
      ...show,
      poster: imageUrl
    };
  })
);

// Creates a new Promise that fetches the request
// and returns desired data
const httpCall = (url) => {
  const request = new Request( url , init );

  return fetch(request).then( async(response) => {

    if(!response.ok) throw new Error(response.status); //if response status is not 200 ,ex.404 we throw error in order to reject the promise

    let data = await response.json(); //wait from the json parsing

    return {
      pagesNumber: extractPagesNumber(response),
      shows: extractShows(data)
    }
  });
}

export const queriedUrl = (url , page ,itemLimit) => {

  page = page>0 ? page : 1;                                             //checkes and corrects the inputs
  itemLimit = itemLimit>0 ? itemLimit : 10;

  const query = "extended=full&page="+page+"&limit="+itemLimit;          //basic query for all trakt.tv url's
  let queriedUrl =  url.includes('?')? url+"&" : url+"?"                 //if a query allready exist we just append the query
  queriedUrl += query;

  return queriedUrl;
}

//Calculates the new api url and returns the result of the fetching
const getShows = async( url , page , itemLimit ) => await httpCall( queriedUrl(url ,page,itemLimit) );

//An object with all the methods for fetching (in our case only 1)
const traktTvApi = {
  getShows: ( url , page = 1 , itemLimit = 10 ) => getShows( url , page , itemLimit )
};

export default traktTvApi;
