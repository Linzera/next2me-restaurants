import React from "react";
import MainRoute from "./routes";
import { Provider } from "react-redux";
import { Store } from "./store";

const App = () => (
  <Provider store={Store}>
    <MainRoute />
  </Provider>
);

export default App;
