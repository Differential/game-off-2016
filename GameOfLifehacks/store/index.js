import { createStore, combineReducers } from 'redux'

import game from './game';

const reducer = combineReducers({
  game
});

const store = createStore(reducer);

export default store;