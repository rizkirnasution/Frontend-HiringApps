import { createStore, applyMiddleware } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./reducers";

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };

    if (state.listWorker.length) {
      nextState.listWorker = state.listWorker;
    }
    if (state.listRecruiter.length) {
      nextState.listRecruiter = state.listRecruiter;
    }

    return nextState;
  } else {
    return rootReducers(state, action);
  }
};

const store = createStore(
  masterReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const initStore = () => {
  return store;
};

export const wrapper = createWrapper(initStore);
