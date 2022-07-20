import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reducers from "../redux/reducers";
import createSagaMiddleware from "redux-saga";

import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "../redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const composedEnhancers =
  (process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  composeWithDevTools({});

const store = createStore(
  reducers,
  {},
  composedEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
