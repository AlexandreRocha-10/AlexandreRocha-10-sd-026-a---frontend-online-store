import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import RatingProductForm from './RatingProductForm';

export default class ProductCard extends Component {
  state = {
    product: {},
    shoppingCartList: [],
    shipping: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const prod = await getProductById(id);
    this.setState({
      product: prod,
    }, () => {
      const { product } = this.state;
      this.setState({ shipping: product.shipping.free_shipping });
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
    const { product, shipping } = this.state;
    const { match: { params: { id } } } = this.props;
    const getLocalItem = JSON.parse(localStorage.getItem('shoppingCartList'));
    let arrQty;
    let sumQty;
    if (getLocalItem) {
      arrQty = getLocalItem.map((item) => item.quantity);
      sumQty = arrQty.reduce((acc, val) => acc + val, 0);
    }
    return (
      <div>
        <span data-testid="product-detail-name">{ product.title }</span>
        <img
          data-testid="product-detail-image"
          src={ product.thumbnail }
          alt={ product.title }
        />
        <p data-testid="product-detail-price">{ product.price }</p>
        <p data-testid="free-shipping">{ shipping && <div>free shipping</div> }</p>
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
        <div data-testid="shopping-cart-size">
          { sumQty }
        </div>
        <RatingProductForm id={ id } />
      </div>
    );
  }
}

ProductCard.propTypes = {
  history: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }),
}.isRequired;
