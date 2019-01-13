import { combineReducers } from 'redux';
import restaurantsReducer from './restaurantsReducer';

export const reducers = combineReducers({
  restaurantApp: restaurantsReducer,
});
