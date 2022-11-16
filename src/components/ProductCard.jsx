import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class ProductCard extends Component {
  state = {
    product: {},
    shoppingCartList: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const prod = await getProductById(id);
    this.setState({
      product: prod,
    });
  }

  handleCartButton = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  handleAddToCartButton = () => {
    const { product } = this.state;
    const getLocalItem = JSON.parse(localStorage.getItem('shoppingCartList')) || [];
    const truFal = getLocalItem.some((produto) => produto.id === product.id);
    if (truFal) {
      const retorno = getLocalItem.map((elem) => {
        if (product.id === elem.id) {
          const obj = {
            ...elem,
            quantity: elem.quantity += 1,
          };
          return obj;
        }
        return elem;
      });
      this.setState({ shoppingCartList: retorno });
      localStorage.setItem('shoppingCartList', JSON.stringify(retorno));
    } else {
      this.setState(({ shoppingCartList: [...getLocalItem, { ...product, quantity: 1 }],
      }), () => {
        const { shoppingCartList } = this.state;
        localStorage.setItem('shoppingCartList', JSON.stringify(shoppingCartList));
      });
    }
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <span data-testid="product-detail-name">{ product.title }</span>
        <img
          data-testid="product-detail-image"
          src={ product.thumbnail }
          alt={ product.title }
        />
        <p data-testid="product-detail-price">{ product.price }</p>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.handleAddToCartButton }
        >
          Adicionar ao carrinho de compras
        </button>
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.handleCartButton }
        >
          Ir para o carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  history: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
};
