import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import PlanetReducer from './reducers/planet';

const store = createStore(
  combineReducers({
    planets: PlanetReducer,
  }),
  {}, // initial state
  compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
);

export default store;
