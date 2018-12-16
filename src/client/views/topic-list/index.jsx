import React from "react";
import {
  inject,
  observer
} from "mobx-react";
@inject("appState")
@observer
export default class TopicList extends React.Component {
  constructor(){
    super();
    this.changeName= this.changeName.bind(this);
  }
  changeName(even){
    this.props.appState.changeName(even.target.value)
  }
  componentDidMount() {}

  render() {
    return <div>
      <input type="text" onChange={this.changeName}/>
      {this.props.appState.msg}</div>;
  }
}
