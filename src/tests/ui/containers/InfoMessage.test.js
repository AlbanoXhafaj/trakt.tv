import "../../setups/setup_enzyme.js";
import React from "react";

import { shallow , mount } from "enzyme";
import toJSON from 'enzyme-to-json';

import InfoMessage from "containers/InfoMessage";

describe("<InfoMessage />" ,() => {
  const message = "Message";

  const wrapper = shallow(<InfoMessage>{ message }</InfoMessage>);

  it("render without problem", () => {
    expect(wrapper.length).toBe(1);
  })

  it("should match the snapshot", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  })
});
