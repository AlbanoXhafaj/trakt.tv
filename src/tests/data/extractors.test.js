import "../setups/setup_enzyme.js";
import React from "react";

import { getBodyContainer } from "components/App";
import { extractPagesNumber , extractShows, queriedUrl, omdbAppKey } from "api/TraktTvAPI";
import { filters, getUrl , getTitle } from "reducers/FiltersReducer";
import {fetchStatus } from "reducers/FetchReducer";


//Mocks and imports needed for the presantational data extractor test
jest.mock("containers/ErrorSign",() => () => (<div><span>error</span></div>));
jest.mock("containers/LoadingProcess",() => () => (<div><span>loading</span></div>));
jest.mock("containers/InfoMessage",() => ({children}) => (<div><span>{children}</span></div>));
jest.mock("containers/Table",() => () => (<div><span>table</span></div>));
jest.mock("containers/PaginationPanel",() => () => (<div><span>pagination</span></div>));

import ErrorSign from "containers/ErrorSign";
import LoadingProcess from "containers/LoadingProcess";
import InfoMessage from "containers/InfoMessage";
import Table from "containers/Table";
import PaginationPanel from "containers/PaginationPanel";

describe("data extractors" , () => {

  it("url extractor works",() => {
    const filtersCombinations = [
      {
        filters: {
          sortFilter: filters.sortFilters.getFilter(0),
          periodFilter: filters.periodFilters.getFilter(0),
          searchFilter: filters.searchFilter.getFilter()
        },
        url: "https://api.trakt.tv/shows/popular"
      },
      {
        filters: {
          sortFilter: filters.sortFilters.getFilter(2),
          periodFilter: filters.periodFilters.getFilter(1),
          searchFilter: filters.searchFilter.getFilter()
        },
        url: "https://api.trakt.tv/shows/watched/monthly"
      },
      {
        filters: {
          sortFilter: filters.sortFilters.getFilter(2),
          periodFilter: filters.periodFilters.getFilter(3),
          searchFilter: filters.searchFilter.getFilter("friends")
        },
        url: "https://api.trakt.tv/search/show,title?fields=title&query=friends"
      }
    ];

    filtersCombinations.forEach( combination => {
      const url = getUrl(combination.filters);

      expect(url).toEqual(combination.url);
    });
  });

  it("title extractor works",() => {
    const filtersCombinations = [
      {
        filters: {
          sortFilter: filters.sortFilters.getFilter(0),
          periodFilter: filters.periodFilters.getFilter(0),
          searchFilter: filters.searchFilter.getFilter()
        },
        title: "Popular Shows"
      },
      {
        filters: {
          sortFilter: filters.sortFilters.getFilter(2),
          periodFilter: filters.periodFilters.getFilter(1),
          searchFilter: filters.searchFilter.getFilter()
        },
        title: "Monthly Most Watched Shows"
      },
      {
        filters: {
          sortFilter: filters.sortFilters.getFilter(2),
          periodFilter: filters.periodFilters.getFilter(3),
          searchFilter: filters.searchFilter.getFilter("friends")
        },
        title: "Searched Shows"
      }
    ];

    filtersCombinations.forEach( combination => {
      const title = getTitle( combination.filters);

      expect(title).toEqual(combination.title);
    });
  });

  it("presantational data extractor works", () => {
    const propsCombinations = [
      {
        fetchStatus: fetchStatus.newFetch,
        shows: [],
        bodyContainer: <InfoMessage>No shows found.</InfoMessage>
      },
      {
        fetchStatus: fetchStatus.fetching,
        shows: [],
        bodyContainer: <LoadingProcess />
      },
      {
        fetchStatus: fetchStatus.error,
        shows: [],
        bodyContainer: <ErrorSign />
      },
      {
        fetchStatus: fetchStatus.complete,
        shows: [
          { id: 1, title: "Show 1" }
        ],
        bodyContainer: (
          <div className="center" >
            <Table />
            <PaginationPanel />
          </div>
        )
      }
    ];


    propsCombinations.forEach( combination => {
      const bodyContainer = getBodyContainer( combination );

      expect(bodyContainer).toEqual(combination.bodyContainer);
    });

  })

  it("pages number extractor works" , () => {
    const pagesNumber = 30;
    const headersIterator = new Map([
      ["items-count", "10"],
      ["x-pagination-page-count", String(pagesNumber)]
    ]);

    const extractedPagesNumber = extractPagesNumber({ headers: headersIterator });

    expect(extractedPagesNumber).toEqual(pagesNumber);
  });

  it("shows extractor works" , () => {
    const shows = [
      {
        ids: { imdb: 1 },
        title: "Show 1"
      },
      {
        show: {
          ids: { imdb: 2},
          title: "Show 2"
        }
      }
    ];

    const expectedShows = [
      {
        ids: { imdb: 1 },
        title: "Show 1",
        poster: "http://img.omdbapi.com/?i=1&apikey="+omdbAppKey
      },
      {
        ids: { imdb: 2 },
        title: "Show 2",
        poster: "http://img.omdbapi.com/?i=2&apikey="+omdbAppKey
      }
    ];

    expect(extractShows(shows)).toEqual(expectedShows);
  });

  it("queried url extractor" , () => {
    const data = [
      {
        page: 5,
        itemLimit: 20,
        url: "https://api.trakt.tv/shows/watched/monthly"
      },
      {
        page: -5,
        itemLimit: -10,
        url: "https://api.trakt.tv/search/show,title?fields=title&query=friends"
      }
    ];

    const expectedUrl = [
      "https://api.trakt.tv/shows/watched/monthly?extended=full&page=5&limit=20",
      "https://api.trakt.tv/search/show,title?fields=title&query=friends&extended=full&page=1&limit=10"
    ];

    data.forEach( (data,index) =>
      expect(
        queriedUrl(data.url, data.page, data.itemLimit)
      ).toEqual(expectedUrl[index])
    );
  });
})
