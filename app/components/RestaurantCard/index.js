import React from 'react';
import PropTypes from 'prop-types';
import { MdStars, MdClear } from 'react-icons/md';

class RestaurantCard extends React.PureComponent{
  static propTypes = {}

  render() {
    return (
      <div className='col-xs-12 col-sm-3 restaurant-card'>
        {
          this.props.data &&
          <div className='card'>
            <div className='card-header'>
            <div className='card-image-wrapper'>
              <img className='card-image' src={this.props.data.get('image')} alt='Restaurant Image'/>
            </div>
            </div>
            <div className='card-content-wrapper'>
              <p className='restaurant-name'>{this.props.data.get('name')}</p>
              <p className='cuisines-name'>{this.props.data.get('cuisines')}</p>
              <hr/>
            </div>
            <div className='card-footer-wrapper'>
              <MdStars className='rating-icon'/>
              <span className='restaurant-rating'>{this.props.data.get('rating', 'NA')}</span>
              <span className='restaurant-eta'>{this.props.data.get('deliveryTime', 'NA')} Mins</span>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default RestaurantCard;
