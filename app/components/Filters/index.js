import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MdSearch, MdClear, MdExpandMore } from 'react-icons/md';

class Filters extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      showSuggestions: this.props.overlayStatus,
      searchKeywords: this.props.searchKeywords.filter(keyword => !keyword.get('hidden'))
    };
    this.updateSearchSuggestions = _.debounce(this.props.updateSearchSuggestions, 1000).bind(this);
  }

  static propTypes = {}

  componentWillReceiveProps (nextProps) {
    this.setState((state) => ({
      searchKeywords: nextProps.searchKeywords.filter(keyword => !keyword.get('hidden')),
      showSuggestions: nextProps.overlayStatus
    }));
  }

  enableSuggestions = () => {
    this.props.toggleOverlay(true);
    this.setState({ showSuggestions: true });
  }

  updateSuggestionsHandler = (e) => {
    e.persist();
    this.updateSearchSuggestions(e.target.value);
  }

  filterRestaurants = (filterText) => (e) => {
    this.setState({ showSuggestions: false } );
    this.props.toggleOverlay(false);
    this.props.filterRestaurants(filterText);
    this.props.updateRecentSearchesSession(filterText, this.props.recentsLimit)
  }

  sortRestaurants = (e) => {
    this.props.sortRestaurants(e.target.value);
  }

  removeFilter = (filterText, filterIndex) => (e) => this.props.removeFilter(filterText, filterIndex);

  render() {
    return (
      <div className='row paddingAllTen'>
        <div className='filter-wrapper paddingAllTen'>
          <div className='col-xs-12 col-sm-6 search-text-wrapper'>
            <div>
              <input
                autoComplete='off'
                name='search-restaurants'
                onChange={this.updateSuggestionsHandler}
                onClick={this.enableSuggestions}
                placeholder='Search your favourite restaurants'/>
            </div>
            {
              this.state.showSuggestions &&
              <div className='card search-keywords'>
                {
                  this.state.searchKeywords && this.state.searchKeywords.map(keyword => (
                    <a href='#' onClick={this.filterRestaurants(keyword.get('text'))} className='search-keyword custom-anchor'>{keyword.get('text')}</a>
                  ))
                }
                {
                  this.props.recentSearches && this.props.recentSearches.size > 0 &&
                  <p className='recents-header'>Recent Searches</p>
                }
                {
                  this.props.recentSearches && this.props.recentSearches.map(searchText => (
                    <a href='#' onClick={this.filterRestaurants(searchText)} className='search-keyword custom-anchor'>{searchText}</a>
                  ))
                }
              </div>
            }
          </div>
          <div className='col-xs-5 col-sm-1 offset-xs-7 offset-sm-5 sort-wrapper'>
            <select name='sort-restaurants' onChange={this.sortRestaurants}>
              <option disabled selected>Sort Restaurants</option>
              <option value='rating'>By Rating</option>
              <option value='deliveryTime'>By Delivery Speed</option>
            </select>
          </div>
          {
            this.props.appliedFilters.size > 0 &&
            <div className='col-xs-12 col-sm-12 applied-filters-wrapper'>
              {
                this.props.appliedFilters.map((filterText, i) => (
                  <div className='filter-chip'>
                    <div className='chip-text'>{ filterText }</div>
                    <a
                      className='custom-anchor remove-filter'
                      href='#'
                      onClick={this.removeFilter(filterText, i)}
                    >
                      <MdClear />
                    </a>
                  </div>
                ))
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Filters;
