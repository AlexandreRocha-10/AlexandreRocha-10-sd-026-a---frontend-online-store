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
    this.setState(({ shoppingCartList }) => ({
      shoppingCartList: [...shoppingCartList, product],
    }), () => {
      const getLocalItem = JSON.parse(localStorage.getItem('shoppingCartList'));
      const getItem = getLocalItem ? [...getLocalItem, product] : [product];
      localStorage.setItem('shoppingCartList', JSON.stringify(getItem));
    });
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
          onClick={ this.handleCartButto }
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
