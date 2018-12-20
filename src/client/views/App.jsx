import React from "react";
import Routes from "../config/router";

export default class App extends React.Component {
  render() {
    return [<div key="banner">你好晶晶宝宝宝</div>, <Routes key="routes"/>];
  }
}
