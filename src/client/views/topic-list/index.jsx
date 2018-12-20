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
  componentDidMount() {}
  asyncBootstrap(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        this.props.appState.count= 3;
        resolve(true)
      },100)
    })
  }
  changeName(even){
    this.props.appState.changeName(even.target.value)
 }
  render() {
    return <div>
      <input type="text" onChange={this.changeName}/>
      {this.props.appState.msg}
      </div>;
  }
}
