import React from "react";
import Title from "containers/Title";
import ManagementPanel from "containers/ManagementPanel";
import { fetchStatus } from "reducers/FetchReducer";
import * as realApp from "../App";

//Mocks the real function which returns different containers depending on the props
const mockGetBodyContainer = () => <div className="bodyContainer"></div>;

//A mock component in order to test the lifecycle events
class App extends React.Component{

  mockShouldFetch(){
    realApp.shouldFetch(this.props);
  };

  componentDidUpdate(){
    this.mockShouldFetch();
  }

  componentDidMount(){
   this.mockShouldFetch();
  }

  render(){
    return(
      <div className="app" >
        <Title>{ this.props.title }</Title>
        { mockGetBodyContainer() }
        <ManagementPanel />
      </div>
    )
  }
}

//Export the original function of the component for testing
export const getBodyContainer = (props) => realApp.getBodyContainer(props);

export default App;
