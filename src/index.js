import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose ,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import {BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import  thunk from 'redux-thunk'
import authReducers from './store/reducers/auth';
import orderReducers from './store/reducers/order';

const composeEnhancers =process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null|| compose;
const rootReducer=combineReducers({
  burgerBuilder:burgerBuilderReducer,
  order:orderReducers,
  auth:authReducers
})
const store=createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk)
))
const app=(
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
 
)
ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
