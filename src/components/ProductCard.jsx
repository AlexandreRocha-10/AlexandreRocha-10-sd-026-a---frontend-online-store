import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class ProductCard extends Component {
  state = {
    product: {},
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

  render() {
    const { product } = this.state;
    return (
      <div>
        <span data-testid="product-detail-name">{ product.title }</span>
        <img src={ product.thumbnail } alt={ product.title } />
        <p data-testid="product-detail-price">{ product.price }</p>
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
