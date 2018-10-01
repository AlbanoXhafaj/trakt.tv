import "../../setups/setup_enzyme.js";
import React from "react";

import { shallow , mount } from "enzyme";
import toJSON from 'enzyme-to-json';

import { _Table } from "containers/Table";

describe("<Table />", () => {
  const initialProps = {
    shows: [
      {
        ids: { trakt: "1"},
        title: "Show 1",
        poster: "Show1.jpg",
        rating: 7.56732,
        year: 1990,
        aired_episodes: 5
      },
      {
        ids: { trakt: "2"},
        title: "Show 2",
        poster: "Show2.jpg",
        rating: 8.3431,
        year: 2011,
        aired_episodes: 17
      },
      {
        ids: { trakt: "3"},
        title: "Show 3",
        poster: "Show3.jpg",
        rating: 6.87932,
        year: 2003,
        aired_episodes: 32
      }
    ],
    columnCount: 3
  }

  const wrapper = shallow(<_Table {...initialProps} />);

  it("should match the snapshot" , () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
