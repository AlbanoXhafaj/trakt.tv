import React from "react";

import "../../setups/setup_enzyme.js";
import { shallow , mount } from "enzyme";
import toJSON from 'enzyme-to-json';

import ErrorSign from "containers/ErrorSign";

describe("<ErrorSign />" , () => {

  const wrapper = shallow(<ErrorSign />);

  it("should match with the snapshot" , () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  })

});
