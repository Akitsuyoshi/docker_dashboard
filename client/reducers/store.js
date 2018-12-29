import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducer from '.';

let middlewares;
if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger({
    diff: true,
    collapsed: true,
  });
  middlewares = applyMiddleware(thunkMiddleware, loggerMiddleware);
} else {
  middlewares = applyMiddleware(thunkMiddleware);
}

const store = createStore(reducer, middlewares);

export default store;
