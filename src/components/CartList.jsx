import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartList extends Component {
  render() {
    const { title, thumbnail, price, addItem, removeItem,
      reduceItem, item, i } = this.props;
    return (
      <div>
        <div data-testid="shopping-cart-product-name" />
        <h4>{title}</h4>
        <button type="button" onClick={ removeItem }> Remover </button>
        <img src={ thumbnail } alt={ title } />
        <h3>{price}</h3>
        <button type="button" onClick={ addItem }> Adidionar + </button>
        <button type="button" onClick={ () => reduceItem(item, i) }> Diminuir - </button>
      </div>
    );
  }
}

CartList.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  i: PropTypes.number,
}.isRequired;

export default CartList;
