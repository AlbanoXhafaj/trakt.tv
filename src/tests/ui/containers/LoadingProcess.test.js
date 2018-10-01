import "../../setups/setup_enzyme.js";
import React from "react";

import { shallow , mount } from "enzyme";
import toJSON from 'enzyme-to-json';

import LoadingProcess from "containers/LoadingProcess";

describe("<LoadingProcess />" , () => {

  const wrapper = shallow(<LoadingProcess />);

  it("should match with the snapshot" , () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  })

});
