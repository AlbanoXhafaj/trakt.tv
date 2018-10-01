import "../../setups/setup_enzyme.js";
import React from "react";

import { shallow , mount } from "enzyme";
import toJSON from 'enzyme-to-json';

import { _ManagementPanel } from "containers/ManagementPanel";

describe("<ManagementPanel />" , () => {

  const sortFilters = [
    {
      value: "Trending",
      url: "https://api.trakt.tv/shows/trending",
      needPeriodParameter: false
    },
    {
      value: "Most Watched",
      url: "https://api.trakt.tv/shows/watched/",
      needPeriodParameter: true
    }
  ];

  const initialProps = (sortFilter) => ({
    searchText: "Spiderman",
    sortFilter: sortFilter,
    setSortFilter: jest.fn(),
    setGridSizeFilter: jest.fn(),
    setPeriodFilter: jest.fn(),
    setSearchFilter: jest.fn()
  });


  it("should match snapshot" , () => {
    const wrapper = shallow(<_ManagementPanel { ... initialProps(sortFilters[0]) } />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should match snapshot" , () => {
    const wrapper = shallow(<_ManagementPanel { ... initialProps(sortFilters[1]) } />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });


});
