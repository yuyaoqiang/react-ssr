import React from "react";
import axios from "axios";

export default class TestApi extends React.Component {
  constructor() {
    super();
  }
  getTopics() {
    axios
      .get("api/topics")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }
  login() {
    axios
      .post("api/user/login", {
        accessToken: "5f388527-1d03-45e5-a81d-8efa18aaf1f9"
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }
  getMackAll() {
    axios
      .post("/api/message/mark_all?needAccessToken=true")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    console.log(123);
    return (
      <div>
        <button onClick={this.getTopics}>列表</button>
        <button onClick={this.login}>登录</button>
        <button onClick={this.getMackAll}>mackAll</button>
      </div>
    );
  }
}
