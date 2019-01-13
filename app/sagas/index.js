import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import {
  getRestaurantsSuccess,
  updateRecentSearches
} from '../actions';
import constants from '../constants';
import { getRestaurantsData } from '../services';

function* getRestaurants (action) {
  const { restaurants, keywords } = yield call(getRestaurantsData, action.size);
  yield put(getRestaurantsSuccess(restaurants, keywords));
}

function* getRecentSearchesSession (action) {
  let searches = sessionStorage.getItem('recent-searches') ?
    sessionStorage.getItem('recent-searches').split(', ') : [];
  searches.slice(0, action.limit);
  yield put(updateRecentSearches(searches));
}

function* updateRecentSearchesSession (action) {
  let searches = sessionStorage.getItem('recent-searches') ?
    sessionStorage.getItem('recent-searches').split(', ') : [];
  if(searches.indexOf(action.searchText) <= -1) {
    searches.splice(0, 0, action.searchText);
    sessionStorage.setItem('recent-searches', searches.join(', '));
    yield put(updateRecentSearches(searches));
  }
}

export function* sagas() {
  yield takeLatest(constants.GET_RESTAURANTS, getRestaurants);
  yield takeLatest(constants.GET_RECENT_SEARCHES, getRecentSearchesSession);
  yield takeLatest(constants.UPDATE_RECENT_SEARCHES_SESSION, updateRecentSearchesSession);
}
