import React from "react";
import { Route, Redirect } from "react-router-dom";
import TopicDtail from "../views/topic-details";
import TopicList from "../views/topic-list";
import TestApi from "../views/test/testApi"
export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="/"/>,
  <Route path="/list" component={TopicList}  key="list"/>,
  <Route path="/detail" component={TopicDtail} key="detail"/>,
  <Route path="/test" component={TestApi} key ="testApi"/>
];
