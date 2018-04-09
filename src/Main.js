import React from "react";
import { connect } from "react-redux";
import { loadUsers } from "./Actions";

import Sidebar from "./Components/Sidebar";
import Error from "./Components/Error";
import Map from "./Components/Map";

const Main = props => {
  console.log(props);
  return (
    <div className="App">
      {props.hasError ? (
        <Error />
      ) : (
        <div>
          <Sidebar />
          {props.users && <Map />}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = {
  loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
