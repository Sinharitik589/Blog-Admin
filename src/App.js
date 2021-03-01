import React from 'react'
import './App.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from "./reducer"
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import thunk from "redux-thunk"

const store = createStore(reducers, [], applyMiddleware(thunk));
const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;
