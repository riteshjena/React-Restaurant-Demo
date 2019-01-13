import {
  GET_RESTAURANTS,
  GET_RESTAURANTS_SUCCESS,
  SORT_RESTAURANTS,
  FILTER_RESTAURANTS,
  REMOVE_FILTER,
  UPDATE_SUGGESTIONS,
  TOGGLE_OVERLAY,
  GET_RECENT_SEARCHES,
  UPDATE_RECENT_SEARCHES,
  UPDATE_RECENT_SEARCHES_SESSION
} from '../constants';

export function getRestaurants(size) {
  return {
    type: GET_RESTAURANTS,
    size,
  };
}

export function getRestaurantsSuccess(restaurants, keywords) {
  return {
    type: GET_RESTAURANTS_SUCCESS,
    restaurants,
    keywords,
  };
}

export function sortRestaurants(sortBy) {
  return {
    type: SORT_RESTAURANTS,
    sortBy,
  };
}

export function filterRestaurants(filterText) {
  return {
    type: FILTER_RESTAURANTS,
    filterText,
  };
}

export function updateSearchSuggestions(filterText) {
  return {
    type: UPDATE_SUGGESTIONS,
    filterText,
  };
}

export function toggleOverlay(status) {
  return {
    type: TOGGLE_OVERLAY,
    status,
  };
}

export function removeFilter(filterText, filterIndex) {
  return {
    type: REMOVE_FILTER,
    filterText,
    filterIndex,
  };
}

export function getRecentSearches(limit) {
  return {
    type: GET_RECENT_SEARCHES,
    limit,
  };
}

export function updateRecentSearches(recentSearches) {
  return {
    type: UPDATE_RECENT_SEARCHES,
    recentSearches,
  };
}

export function updateRecentSearchesSession(searchText, limit) {
  return {
    type: UPDATE_RECENT_SEARCHES_SESSION,
    searchText,
    limit,
  };
}
