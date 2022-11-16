import React, { Component } from 'react';
import CartList from './CartList';

class Cart extends Component {
  state = {
    shoppingCartList: [],
  };

  componentDidMount() {
    const produtos = JSON.parse(localStorage.getItem('shoppingCartList'));
    this.setState({ shoppingCartList: produtos });
  }

  handleRemoveItem = (item) => {
    const { shoppingCartList } = this.state;
    const arrayRemoved = shoppingCartList.filter((produto) => produto.id !== item.id);
    this.setState({ shoppingCartList: arrayRemoved }, () => {
      localStorage.setItem('shoppingCartList', JSON.stringify(arrayRemoved));
    });
  };

  handleChangeItem = (item, operator) => {
    const getLocalItem = JSON.parse(localStorage.getItem('shoppingCartList')) || [];
    let teste = item.quantity;
    if (operator) {
      teste += 1;
    } else if (item.quantity > 1) {
      teste -= 1;
    }
    const truFal = getLocalItem.some((produto) => produto.id === item.id);
    if (truFal) {
      const retorno = getLocalItem.map((elem) => {
        if (item.id === elem.id) {
          const obj = {
            ...elem,
            quantity: elem.quantity = teste,
          };
          return obj;
        }
        return elem;
      });
      this.setState({ shoppingCartList: retorno });
      localStorage.setItem('shoppingCartList', JSON.stringify(retorno));
    } else {
      this.setState(({ shoppingCartList: [...getLocalItem, { ...item, quantity: 1 }],
      }), () => {
        const { shoppingCartList } = this.state;
        localStorage.setItem('shoppingCartList', JSON.stringify(shoppingCartList));
      });
    }
  };

  render() {
    const { shoppingCartList } = this.state;
    let cartH1;
    if (shoppingCartList === null) {
      cartH1 = (
        <h1 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h1>);
    } else {
      cartH1 = (shoppingCartList.map((item) => (
        <CartList
          key={ item.id }
          title={ item.title }
          thumbnail={ item.thumbnail }
          price={ item.price }
          item={ item }
          handleRemoveItem={ this.handleRemoveItem }
          handleChangeItem={ this.handleChangeItem }
        />
      )));
    }
    return (
      <div>
        { cartH1 }
        Total de produtos no carrinho:
        {/* <h2 data-testid="shopping-cart-product-quantity">
          { shoppingCartList !== null ? shoppingCartList.length : 0 }
        </h2> */}
        <span data-testid="shopping-cart-product-quantity">
          { shoppingCartList.length }
        </span>
      </div>
    );
  }
}

export default Cart;
