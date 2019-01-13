import { fromJS } from 'immutable';
import {
  GET_RESTAURANTS_SUCCESS,
  SORT_RESTAURANTS,
  FILTER_RESTAURANTS,
  UPDATE_SUGGESTIONS,
  TOGGLE_OVERLAY,
  REMOVE_FILTER,
  UPDATE_RECENT_SEARCHES,
} from '../constants';

const initialState = fromJS({
  recentsLimit: 5,
  restaurantsLimit: 20,
  overlay: false,
  restaurants: [],
  keywords: [],
  appliedFilters: [],
  recentSearches: [],
});

const restaurantsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_RESTAURANTS_SUCCESS:
      return state.set('restaurants', fromJS(action.restaurants))
        .set('keywords', fromJS(action.keywords));
    case TOGGLE_OVERLAY:
      return state.set('overlay', action.status);
    case SORT_RESTAURANTS: {
      const sorted = state.get('restaurants').sort((r1, r2) => {
        if (parseInt(r1.get(action.sortBy)) > parseInt(r2.get(action.sortBy)))
          return action.sortBy === 'rating' ? -1 : 1;
        if (parseInt(r1.get(action.sortBy)) < parseInt(r2.get(action.sortBy)))
          return action.sortBy === 'rating' ? 1 : -1;
        return 0;
      });

      return state.set('restaurants', sorted);
    }
    case FILTER_RESTAURANTS: {
      const appliedFilters = state.get('appliedFilters').push(action.filterText);
      const filtered = state.get('restaurants').map(restaurant => {
        if(restaurant.get('keywords').includes(action.filterText))
          return restaurant.set('hidden', false);
        if (appliedFilters.size === 1)
          return restaurant.set('hidden', true);
        return restaurant;
      });

      return state.set('restaurants', filtered)
        .set('appliedFilters', appliedFilters);
    }
    case REMOVE_FILTER: {
      const appliedFilters = state.get('appliedFilters').delete(action.filterIndex);
      const filtered = state.get('restaurants').map(restaurant => {
        if (appliedFilters.size === 0)
          return restaurant.set('hidden', false);
        if (appliedFilters.toSet().intersect(restaurant.get('keywords').toSet()).size === 0)
          return restaurant.set('hidden', true);
        return restaurant;
      });

      return state.set('restaurants', filtered)
        .set('appliedFilters', appliedFilters);
    }
    case UPDATE_SUGGESTIONS: {
      const filtered = state.get('keywords').map(keyword => {
        if(action.filterText && keyword.get('text').toLowerCase().includes(action.filterText))
          return keyword.set('hidden', false);
        return keyword.set('hidden', true);
      });

      return state.set('keywords', filtered);
    }
    case UPDATE_RECENT_SEARCHES:
      return state.set('recentSearches', fromJS(action.recentSearches));
    default:
      return state;
  }
}

export default restaurantsReducer;
