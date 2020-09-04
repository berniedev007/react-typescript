import * as React from "react";
import { hot } from "react-hot-loader";

const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";
import C1 from './C1';
import C2 from './C2';
import C3 from './C3';
import C4 from './C4';
import C5 from './C5';


class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <div className="app">
        <C1 timeRange="10" />
        <C2 timeRange="20" />
        <C3 timeRange="30" />
        <C4 timeRange="40" />
        <C5 timeRange="50" />
      </div>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
