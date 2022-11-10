import React, { Component } from 'react';

class Cart extends Component {
  render() {
    const produtoCarrinho = JSON.parse(localStorage.getItem('shoppingCartList'));
    let cartH1;
    console.log(produtoCarrinho);
    if (produtoCarrinho === null) {
      cartH1 = (
        <h1 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h1>);
    } else {
      cartH1 = (produtoCarrinho.map((item) => (
        <div data-testid="shopping-cart-product-name" key={ item.id }>
          <h4>{item.title}</h4>
          <img src={ item.thumbnail } alt={ item.title } />
          <h3>{item.price}</h3>
        </div>
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
