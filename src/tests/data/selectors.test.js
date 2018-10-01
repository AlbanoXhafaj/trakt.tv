import * as selectors from "store/stateSelectors";
import * as dataExtracors from "reducers/FiltersReducer";

describe("selectors" , () => {
  it("getFetchStatus works" ,() => {
    const status = "status";
    const initialState = {
      fetch: {
        status: status
      }
    };

    expect(selectors.getFetchStatus(initialState)).toEqual(status);
  });

  it("getShows works" ,() => {
    const shows = [ { id:"1" } , { id:"2" } ];
    const initialState = {
      fetch: {
        data: {
          shows: shows
        }
      }
    };

    expect(selectors.getShows(initialState)).toEqual(shows);
  });

  it("getPagesNumber works" ,() => {
    const pagesNumber = 15;
    const initialState = {
      fetch: {
        data: {
          pagesNumber: pagesNumber
        }
      }
    };

    expect(selectors.getPagesNumber(initialState)).toEqual(pagesNumber);
  });

  it("getPageIndex works" ,() => {
    const pageIndex = 7;
    const initialState = {
      pagination:{
        pageIndex: pageIndex
      }
  };

    expect(selectors.getPageIndex(initialState)).toEqual(pageIndex);
  });

  it("getStartIndex works" ,() => {
    const startIndex = 3;
    const initialState = {
      pagination: {
        startIndex: startIndex
      }
    };

    expect(selectors.getStartIndex(initialState)).toEqual(startIndex);
  });

  it("getDisplayedIndexes works" ,() => {
    const displayedIndexes = 20;
    const initialState = {
      pagination: {
        displayedIndexes: displayedIndexes
      }
    };

    expect(selectors.getDisplayedIndexes(initialState)).toEqual(displayedIndexes);
  });

  it("getSortFilter works" ,() => {
    const sortFilter = "sort";
    const initialState = {
      filters:{
        sortFilter: sortFilter
      }
    };

    expect(selectors.getSortFilter(initialState)).toEqual(sortFilter);
  });

  it("getSearchText works" ,() => {
    const searchText = "animal";
    const initialState = {
      filters: {
        searchFilter: {
          searchText: searchText
        }
      }
    };

    expect(selectors.getSearchText(initialState)).toEqual(searchText);
  });

  it("getColumnCount works" ,() => {
    const columnCount = 5;
    const initialState = {
      filters: {
        gridSizeFilter:{
          columns: columnCount
        }
      }
    };

    expect(selectors.getColumnCount(initialState)).toEqual(columnCount);
  });

  it("getNrItems works" ,() => {
    const nrItems = 15;
    const initialState = {
      filters:{
        gridSizeFilter:{
          value: nrItems
        }
      }
    };

    expect(selectors.getNrItems(initialState)).toEqual(nrItems);
  });

  it("getUrl works" ,() => {
    dataExtracors.getUrl = jest.fn();
    const initialState = {
      filters:{
        sortFilter:{},
        periodFilter: {},
        searchFilter: {}
      }
    };
    selectors.getUrl(initialState);
    expect(dataExtracors.getUrl).toBeCalledWith(initialState.filters);
  });

  it("getTitle works" ,() => {
    dataExtracors.getTitle = jest.fn();
    const initialState = {
      filters:{
        sortFilter:{},
        periodFilter: {},
        searchFilter: {}
      }
    };
    selectors.getTitle(initialState);
    expect(dataExtracors.getTitle).toBeCalledWith(initialState.filters);
  });

})
