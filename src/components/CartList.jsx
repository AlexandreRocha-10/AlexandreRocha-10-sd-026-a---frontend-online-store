import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartList extends Component {
  render() {
    const { title, thumbnail, price, handleAddItem, handleRemoveItem,
      handleDecreaseItem, item } = this.props;
    return (
      <div data-testid="shopping-cart-product-name">
        <h4>{title}</h4>
        <img src={ thumbnail } alt={ title } />
        <button
          data-testid="remove-product"
          type="button"
          onClick={ () => handleRemoveItem(item) }
        >
          {' '}
          Remover Produto
          {' '}
        </button>
        <h3>{price}</h3>
        <h4>Quantidade do item:</h4>
        <button
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ () => handleDecreaseItem(item) }
        >
          {' '}
          Diminuir -
          {' '}
        </button>
        <label htmlFor="additem">
          <input type="number" disabled value={ item.quantity } id="additem" />
        </label>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={ () => handleAddItem(item) }
        >
          {' '}
          Adicionar +
          {' '}
        </button>
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
