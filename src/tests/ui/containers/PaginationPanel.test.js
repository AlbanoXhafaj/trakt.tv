import "../../setups/setup_enzyme.js";
import React from "react";

import { shallow , mount } from "enzyme";
import toJSON from 'enzyme-to-json';


import { _PaginationPanel , LeftDoubleArrow , RightDoubleArrow , Index , ActiveIndex , pageIndexes } from "containers/PaginationPanel";

describe("<PaginationPanel />" , () => {
  const loadLeftPaginationIndexes = jest.fn();
  const loadRightPaginationIndexes = jest.fn();
  const switchPage = jest.fn();

  const initialProps = {
    pageIndex: 5,
    pagesNumber: 10,
    startIndex: 1,
    displayedIndexes: 5,
    loadLeftPaginationIndexes: loadLeftPaginationIndexes,
    loadRightPaginationIndexes: loadRightPaginationIndexes,
    switchPage: switchPage
  };

  const paginationPanelWrapper = mount(<_PaginationPanel { ... initialProps } />);

  it("should match snapshot" , () => {
    expect(toJSON(paginationPanelWrapper)).toMatchSnapshot();
  });

  const wrappers = paginationPanelWrapper.children().children();
  it("the fisrt wrapper has the LeftDoubleArrow component" ,() => {
    expect(wrappers.at(0).find(LeftDoubleArrow).length).toBe(1);
  });

  const pageIndexesContainer = mount(pageIndexes(initialProps));
  it("pageIndexes should render" , () => {
    expect(pageIndexesContainer.length).toBe(1);
  })

  it("the second wrapper has the pageIndexes(multiple Index and 1 ActiveIndex component in specified order)" ,() => {

    expect(wrappers.at(1).html()).toBe(pageIndexesContainer.html());

    wrappers.at(1).children().forEach((wrapper,index) => {
      if( index + 1 === initialProps.pageIndex ) expect(wrapper.find(ActiveIndex).length).toBe(1);
      else expect(wrapper.find(Index).length).toBe(1);
    });
  });

  it("the last wrapper has the RightDoubleArrow component" ,() => {
    expect(wrappers.at(2).find(RightDoubleArrow).length).toBe(1);
  });

  it("loadLeftPaginationIndexes called with the needed arguments " ,() => {
    const event = {
      preventDefault(){}
    }

    paginationPanelWrapper.find(LeftDoubleArrow).find("a").simulate("click", event);

    expect(loadLeftPaginationIndexes).toBeCalledWith(
      initialProps.startIndex, initialProps.displayedIndexes
    );
  });

  it("loadRightPaginationIndexes called with the needed arguments " ,() => {
    const event = {
      preventDefault(){}
    }

    paginationPanelWrapper.find(RightDoubleArrow).find("a").simulate("click", event);

    expect(loadRightPaginationIndexes).toBeCalledWith(
      initialProps.startIndex, initialProps.pagesNumber, initialProps.displayedIndexes
    );
  });

  it("switchPage called with the needed arguments " ,() => {
    const event = {
      preventDefault(){}
    }

    paginationPanelWrapper.find(Index).at(0).find("a").simulate("click", event);

    expect(switchPage).toBeCalledWith(initialProps.startIndex);
  });

  it("ActiveIndex onClick does nothing" ,() => {
    const event = {
      preventDefault(){}
    }

    paginationPanelWrapper.find(ActiveIndex).find("a").simulate("click", event);

    expect(switchPage).toHaveBeenCalled();
  });

});
