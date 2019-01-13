import React from 'react';
import PropTypes from 'prop-types';
import RestaurantCard from '../RestaurantCard';

class RestaurantList extends React.PureComponent{
  static propTypes = {}

  toggleOverlay = () => {
    this.props.toggleOverlay(false);
  }

  render() {
    return (
      <div className='row'>
        {
          this.props.overlayStatus &&
          <div className='grid-overlay' onClick={this.toggleOverlay}></div>
        }
        <div className='restaurants-wrapper'>
        {
          this.props.restaurants && this.props.restaurants.filter(restaurant => !restaurant.get('hidden'))
          .map((restaurant, index) => (
            <RestaurantCard
              data={restaurant}
              key={`${restaurant.name}_${index}`}
            />
          ))
        }
        </div>
      </div>
    );
  }
}

export default RestaurantList;
