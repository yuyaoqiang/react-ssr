import AppStateClass from "./appStore";

export const AppState = AppStateClass;

export default {
  AppState
};
export const createStoreMap = () => {
  return {
    appState: new AppState()
  };
};
