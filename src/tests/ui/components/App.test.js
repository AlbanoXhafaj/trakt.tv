import "../../setups/setup_enzyme.js";
import React from "react";
import { shallow , mount } from "enzyme";
import toJSON from 'enzyme-to-json';

import { fetchStatus } from "reducers/FetchReducer";

jest.mock("containers/ManagementPanel" , () => () => <div>ManagementPanel</div>);

import App from "components/App";
import Title from "containers/Title";
import ManagementPanel from "containers/ManagementPanel";
import * as actionCreators from "actions/actionCreators";

actionCreators.fetchData = jest.fn();

describe("App Component", () => {

  const url = "www.works.com";
  const pageIndex = 1;
  const nrItems = 10;

  const initialProps = {
    title: "Shows",
    fetchStatus: fetchStatus.newFetch,
    fetchData: actionCreators.fetchData,
    url,
    pageIndex,
    nrItems
  };

  const wrapper = shallow( <App  { ...initialProps } />);

  const instance = wrapper.instance();

  it("renders without problem",() => {
    expect(wrapper.length).toBe(1);
  })

  it("renders the title", () => {
    expect(wrapper.find(Title).length).toBe(1);
  });

  it("render the body container" ,() => {
    expect(wrapper.find("div.bodyContainer").length).toBe(1);
  });

  it("renders the ManagementPanel", () => {
    expect(wrapper.find(ManagementPanel).length).toBe(1);
  });

  it("check for new fetch on componentDidMount and fetch" ,() => {
    expect(instance.componentDidMount.calledOnce);
    expect(actionCreators.fetchData).toHaveBeenCalledWith(url,pageIndex,nrItems);
  });

  it("checks for the new fetch on componentDidUpdate" ,() => {
    Object.keys(fetchStatus).forEach( key => {
      actionCreators.fetchData.mockClear();

      wrapper.setProps({ fetchStatus: fetchStatus[key] });

      expect(instance.componentDidUpdate.called);

      if(fetchStatus[key] === fetchStatus.newFetch)
        expect(actionCreators.fetchData).toHaveBeenCalledWith(url,pageIndex,nrItems);
      else
        expect(actionCreators.fetchData).not.toHaveBeenCalled();
    })
  });

  it("matches to the snapshot" , () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
