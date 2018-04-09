import React, { Component } from "react";
import { Provider } from "react-redux";
import Main from "./Main";
import Store from "./store";
const store = Store;

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
