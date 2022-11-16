import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartList extends Component {
  /* state = { numberOfItems2: [] }; */

  /* componentDidMount() {
    const produtos = JSON.parse(localStorage.getItem('numberOfItems'));
    this.setState({ numberOfItems2: produtos });
  }
 */
  render() {
    /* const { numberOfItems2 } = this.state; */
    const { title, thumbnail, price, handleAddItem, handleRemoveItem,
      handleReduceItem, item, i, numberOfItems } = this.props;

    let valor;
    if (numberOfItems !== null) {
      valor = numberOfItems.filter((elem) => elem.id === item.id).length;
      console.log(numberOfItems);
    }
    return (
      <div>
        <div data-testid="shopping-cart-product-name" />
        <h4>{title}</h4>
        <img src={ thumbnail } alt={ title } />
        <button
          type="button"
          onClick={ () => handleRemoveItem(item, i) }
        >
          {' '}
          Remover Produto
          {' '}
        </button>
        <h3>{price}</h3>
        <h4>Quantidade do item:</h4>
        <div>
          <button
            type="button"
            onClick={ () => handleReduceItem(item, i) }
          >
            {' '}
            Diminuir -
            {' '}
          </button>
          <label htmlFor="additem">
            <input type="number" disabled value={ valor } id="additem" />
          </label>
          <button
            type="button"
            onClick={ () => handleAddItem(item, i) }
          >
            {' '}
            Adicionar +
            {' '}
          </button>
        </div>
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
