import React from "react";
import { Route, Redirect } from "react-router-dom";
import TopicDtail from "../views/topic-details";
import TopicList from "../views/topic-list";

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="/"/>,
  <Route path="/list" component={TopicList}  key="list"/>,
  <Route path="/dtail" component={TopicDtail} key="detail"/>
];
