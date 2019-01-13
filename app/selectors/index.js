import { createSelector } from 'reselect';

const selectResturantState = () => (state) => state.restaurantApp;

const selectRestaurants = () => createSelector(
  selectResturantState(),
  (restaurantsApp) => restaurantsApp.get('restaurants')
);

const selectRecentSearches = () => createSelector(
  selectResturantState(),
  (restaurantsApp) => restaurantsApp.get('recentSearches')
);

const selectSearchKeywords = () => createSelector(
  selectResturantState(),
  (restaurantsApp) => restaurantsApp.get('keywords')
);

const selectOverlay = () => createSelector(
  selectResturantState(),
  (restaurantsApp) => restaurantsApp.get('overlay')
);

const selectAppliedFilters = () => createSelector(
  selectResturantState(),
  (restaurantsApp) => restaurantsApp.get('appliedFilters')
);

const selectRestaurantsLimit = () => createSelector(
  selectResturantState(),
  (restaurantsApp) => restaurantsApp.get('restaurantsLimit')
);

const selectRecentsLimit = () => createSelector(
  selectResturantState(),
  (restaurantsApp) => restaurantsApp.get('recentsLimit')
);

export {
  selectRestaurants,
  selectRecentSearches,
  selectSearchKeywords,
  selectOverlay,
  selectAppliedFilters,
  selectRestaurantsLimit,
  selectRecentsLimit,
};
