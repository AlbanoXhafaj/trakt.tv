import "../../setups/setup_enzyme.js";
import React from "react";

import { shallow , mount } from "enzyme";
import toJSON from 'enzyme-to-json';

import Title from "containers/Title";

describe("<Title />" ,() => {
  const title = "Title";

  const wrapper = shallow(<Title>{ title }</Title>);

  it("render without problem", () => {
    expect(wrapper.length).toBe(1);
  })

  it("should match the snapshot", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  })
});
