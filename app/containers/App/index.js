import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Map, List } from 'immutable';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  getRestaurants,
  sortRestaurants,
  filterRestaurants,
  removeFilter,
  updateSearchSuggestions,
  toggleOverlay,
  getRecentSearches,
  updateRecentSearchesSession
} from '../../actions';
import {
  selectRestaurants,
  selectRecentSearches,
  selectSearchKeywords,
  selectOverlay,
  selectAppliedFilters,
  selectRestaurantsLimit,
  selectRecentsLimit,
} from '../../selectors';
import Filters from '../../components/Filters';
import RestaurantList from '../../components/RestaurantList';

class App extends React.PureComponent{
  static propTypes = {
    restaurants: PropTypes.instanceOf(List)
  }

  componentDidMount() {
    this.props.getRecentSearches(this.props.recentsLimit);
    this.props.getRestaurants(this.props.restaurantsLimit);
  }

  render() {
    return (
      <div>
        <Filters
          filterRestaurants={this.props.filterRestaurants}
          removeFilter={this.props.removeFilter}
          recentSearches={this.props.recentSearches}
          searchKeywords={this.props.searchKeywords}
          updateSearchSuggestions={this.props.updateSearchSuggestions}
          sortRestaurants={this.props.sortRestaurants}
          toggleOverlay={this.props.toggleOverlay}
          overlayStatus={this.props.overlayStatus}
          appliedFilters={this.props.appliedFilters}
          recentsLimit={this.props.recentsLimit}
          updateRecentSearchesSession={this.props.updateRecentSearchesSession}
        />
        <RestaurantList
          restaurants={this.props.restaurants}
          overlayStatus={this.props.overlayStatus}
          toggleOverlay={this.props.toggleOverlay}
        />
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  restaurants: selectRestaurants(),
  restaurantsLimit: selectRestaurantsLimit(),
  recentSearches: selectRecentSearches(),
  searchKeywords: selectSearchKeywords(),
  overlayStatus: selectOverlay(),
  appliedFilters: selectAppliedFilters(),
  recentsLimit: selectRecentsLimit(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getRestaurants,
  sortRestaurants,
  filterRestaurants,
  removeFilter,
  updateSearchSuggestions,
  toggleOverlay,
  getRecentSearches,
  updateRecentSearchesSession,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
