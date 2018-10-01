import "../../setups/setup_enzyme.js";
import React from "react";

import { shallow , mount } from "enzyme";
import toJSON from 'enzyme-to-json';

import SelectList from "containers/SelectList";

describe("<SelectList />" , () => {
  const onChange = jest.fn();
  const initialProps = [
    {
      title: "Dropdownlist without fisrt element",
      options: ["option1","option2","option3","option4","option5"],
      onChange: onChange
    },
    {
      title: "Dropdownlist with fisrt element",
      firstElement: "Select an option",
      options: ["option1","option2","option3","option4","option5"],
      onChange: onChange
    }
  ];

  let wrapper = shallow(<SelectList {...initialProps[0]} />);

  it("should match the snapshot without firstElement" ,() => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  })

  wrapper = shallow(<SelectList {...initialProps[1]} />);
  it("should match the snapshot with firstElement" ,() => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  })

  it("should pass the index as an argument on tha change event",()=> {
    const event = {
      preventDefault(){},
      target: { value: 3 }
    }

    wrapper.find("select").simulate('change', event);
    expect(onChange).toBeCalledWith(3);
  })
});
