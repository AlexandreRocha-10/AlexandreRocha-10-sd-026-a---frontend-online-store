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

  // handleRemoveItem = (item) => {
  //   const { shoppingCartList } = this.state;
  //   const arrayRemoved = shoppingCartList.filter((produto) => produto.id !== item.id);
  // };

  handleReduceItem = (item, i) => {
    const { shoppingCartList } = this.state;
    // const repeatedItems = shoppingCartList.filter((produto) => produto.id === item.id);
    // const
    // const newA = shoppingCartList.splice(i, 1);
    const num = -1;
    if (i > num) {
      const a = shoppingCartList.splice(i, 1);
      console.log(a);
    }
  };

  render() {
    const produtoCarrinho = JSON.parse(localStorage.getItem('shoppingCartList'));
    let cartH1;
    if (produtoCarrinho === null) {
      cartH1 = (
        <h1 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h1>);
    } else {
      cartH1 = (produtoCarrinho.map((item, i) => (
        <CartList
          key={ item.id }
          title={ item.title }
          thumbnail={ item.thumbnail }
          price={ item.price }
          item={ item }
          reduceItem={ this.handleReduceItem }
          i={ i }
          // addItem={ this.handleAddItem }
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
          { produtoCarrinho !== null ? produtoCarrinho.length : 0 }
        </h2>
      </div>
    );
  }
}

export default Cart;
