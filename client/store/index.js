import {createStore, combineReducers, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import products from './products';
import categories from './categories';
import orders from './orders';

const reducer = combineReducers({
  products,
  categories,
  orders
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed:true})));
const store = createStore(reducer, middleware);

export default store;
export * from './products';
export * from './categories';
export * from './orders';