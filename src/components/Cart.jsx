import React, { Component } from 'react';
import CartList from './CartList';

class Cart extends Component {
  state = {
    shoppingCartList: [],
    numberOfItems: [],
  };

  componentDidMount() {
    const produtos = JSON.parse(localStorage.getItem('shoppingCartList'));
    this.setState({ shoppingCartList: produtos, numberOfItems: produtos });
  }

  handleRemoveItem = (item) => {
    const { shoppingCartList } = this.state;
    const arrayRemoved = shoppingCartList.filter((produto) => produto.id !== item.id);

    this.setState({ shoppingCartList: arrayRemoved }, () => {
      localStorage.setItem('shoppingCartList', JSON.stringify(arrayRemoved));
    });
  };

  handleAddItem = (item) => {
    this.setState(
      ({ numberOfItems }) => ({
        numberOfItems: [...numberOfItems, item],
      }),
      () => {
        const getLocalItem = JSON.parse(localStorage.getItem('numberOfItems'));
        const getItem = getLocalItem ? [...getLocalItem, item] : [item];
        localStorage.setItem('numberOfItems', JSON.stringify(getItem));
      },
    );
  };

  handleReduceItem = (item, i) => {
    this.setState(
      ({ numberOfItems }) => ({
        numberOfItems: [...numberOfItems, item],
      }),
      () => {
        const getLocalItem = JSON.parse(localStorage.getItem('numberOfItems'));
        const getItem = getLocalItem ? getLocalItem.splice(getLocalItem.indexOf(i), 1) : [item];
        localStorage.setItem('numberOfItems', JSON.stringify(getItem));
      },
    );
  };

  render() {
    const { shoppingCartList, numberOfItems } = this.state;

    let cartH1;
    if (shoppingCartList === null) {
      cartH1 = (
        <h1 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h1>);
    } else {
      cartH1 = (shoppingCartList.map((item, i) => (
        <CartList
          key={ item.id }
          title={ item.title }
          thumbnail={ item.thumbnail }
          price={ item.price }
          item={ item }
          handleReduceItem={ this.handleReduceItem }
          handleRemoveItem={ this.handleRemoveItem }
          handleAddItem={ this.handleAddItem }
          numberOfItems={ numberOfItems }
          i={ i }
        />
      )));
    }
    return (
      <div>
        { cartH1 }
        <h2
          data-testid="shopping-cart-product-quantity"
        >
          Total de produtos no carrinho:
          {' '}
          { shoppingCartList !== null ? shoppingCartList.length : 0 }
        </h2>
      </div>
    );
  }
}

export default Cart;
