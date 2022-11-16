import { combineReducers } from "redux";
import listWorkerReducer from "./listWorker";
import listRecruiterReducer from "./listRecruiter";
import detailUserReducer from "./detailUser";

const rootReducers = combineReducers({
  listWorker: listWorkerReducer,
  listRecruiter: listRecruiterReducer,
  detailUser: detailUserReducer,
});

export default rootReducers;
