import {
  observable,
  computed,
  autorun,
  action,
} from "mobx";


export default class AppState{
  @observable count=0
  @observable name = "jingjing"
  @computed get msg(){
    return `${this.name} say count is ${this.count}`
  }
  @action add(){
    return this.count+=1;
  }
  @action changeName(newName){
    return this.name=newName
  }
}
