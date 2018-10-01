import "../../setups/setup_enzyme.js";
import React from "react";

import { shallow , mount } from "enzyme";
import toJSON from 'enzyme-to-json';

import SearchPanel from "containers/SearchPanel";

describe("<SearchPanel  />", () => {
  const onChange = jest.fn();
  const initialProps = {
      text: "search text",
      onChange: onChange
  };

  let wrapper = shallow(<SearchPanel {...initialProps} />);

  it("should match with the snapshot" , () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should pass the value of the input as an argument on tha change event",()=> {
    const event = {
      preventDefault(){},
      target: { value: initialProps.text }
    }

    wrapper.find("input").simulate('change', event);
    expect(onChange).toBeCalledWith(initialProps.text);
  })
});
