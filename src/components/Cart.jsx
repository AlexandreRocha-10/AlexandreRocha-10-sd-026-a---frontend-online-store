import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    console.log(item);
    if (operator) {
      if (item.quantity < item.available_quantity) {
        teste += 1;
      }
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

  checkoutBtn = () => {
    const { history } = this.props;
    history.push('/checkout');
  };

  render() {
    const { shoppingCartList } = this.state;
    let arrQty;
    let sumQty;
    if (shoppingCartList) {
      arrQty = shoppingCartList.map((item) => item.quantity);
      sumQty = arrQty.reduce((acc, val) => acc + val, 0);
    }
    let cartH1;
    if (!shoppingCartList) {
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
        <h2 data-testid="shopping-cart-size">
          { sumQty }
        </h2>
        <button
          type="button"
          data-testid="checkout-products"
          onClick={ this.checkoutBtn }
        >
          Checkout
        </button>
      </div>
    );
  }
}

Cart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Cart;
