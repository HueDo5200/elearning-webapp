import { createStore, applyMiddleware} from "redux";
import {composeWithDevlTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
const middleware = [thunk];
const store = createStore(
   rootReducer,
  applyMiddleware(...middleware)
)
export default store;
