import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckoutList extends Component {
  render() {
    const { title, quantity } = this.props;
    return (
      <div>
        <div>
          {title}
        </div>
        <p>
          {quantity}
        </p>
      </div>
    );
  }
}

CheckoutList.propTypes = {
  title: PropTypes.string,
  quantity: PropTypes.number,
}.isRequired;

export default CheckoutList;
