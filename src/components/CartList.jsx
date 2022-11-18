import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartList extends Component {
  render() {
    const { title, thumbnail, price, handleChangeItem, handleRemoveItem,
      item } = this.props;
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
          onClick={ () => handleChangeItem(item, false) }
        >
          {' '}
          Diminuir
          {' '}
        </button>
        <p
          data-testid="shopping-cart-product-quantity"
          type="number"
          disabled
          id="additem"
        >
          { item.quantity }
        </p>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={ () => handleChangeItem(item, true) }
        >
          {' '}
          Adicionar
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
  handleChangeItem: PropTypes.func,
  handleRemoveItem: PropTypes.func,
}.isRequired;

export default CartList;
