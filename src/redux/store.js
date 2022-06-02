import { legacy_createStore as createStore } from "redux";
import reducers from "../redux/reducers";

import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancers = composeWithDevTools();

const store = createStore(reducers, composedEnhancers);
export default store;
