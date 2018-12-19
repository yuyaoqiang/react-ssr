import {
  observable,
  computed,
  autorun,
  action,
} from "mobx";


class AppState{
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
const appState = new AppState();
autorun(()=>{
  console.log(appState.msg);
})

// setInterval(() => {
//   appState.add();
// }, 1000);

export default appState;
