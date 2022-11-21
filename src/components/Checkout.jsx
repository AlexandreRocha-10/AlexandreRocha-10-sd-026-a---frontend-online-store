import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckoutList from './CheckoutList';

export default class Checkout extends Component {
  state = {
    shoppingCartList: [],
    fullName: '',
    email: '',
    phone: '',
    cpf: '',
    cep: '',
    address: '',
    inputRadio: false,
    renderErr: false,
  };

  componentDidMount() {
    const produtos = JSON.parse(localStorage.getItem('shoppingCartList'));
    this.setState({ shoppingCartList: produtos });
  }

  onInputChange = ({ target }) => {
    const { name, value, checked, type } = target;
    const newVal = type === 'radio' ? checked : value;
    this.setState({ [name]: newVal });
  };

  checkoutBtn = () => {
    const { fullName, email, phone,
      cpf, cep, address, inputRadio } = this.state;
    const arr1 = [fullName, email, phone, cpf, cep, address];
    const len = arr1.some((el) => el.length === 0);
    if (len || inputRadio === false) {
      this.setState({ renderErr: true });
    } else {
      const { history } = this.props;
      history.push('/');
      localStorage.removeItem('shoppingCartList');
    }
  };

  render() {
    const { shoppingCartList, renderErr } = this.state;
    return (
      <div>
        { renderErr && <h1 data-testid="error-msg">Campos inválidos</h1>}
        { shoppingCartList.map((item) => (
          <div key={ item.id }>
            <CheckoutList
              title={ item.title }
              quantity={ item.quantity }
            />
          </div>
        ))}
        <form>
          <label htmlFor="fullName">
            Full Name
            <input
              type="text"
              name="fullName"
              data-testid="checkout-fullname"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              data-testid="checkout-email"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="cpf">
            Cpf
            <input
              type="text"
              name="cpf"
              data-testid="checkout-cpf"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="phone">
            Phone
            <input
              type="text"
              name="phone"
              data-testid="checkout-phone"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="cep">
            Cep
            <input
              type="text"
              name="cep"
              data-testid="checkout-cep"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="address">
            Address
            <input
              type="text"
              name="address"
              data-testid="checkout-address"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="inputRadio">
            <input
              type="radio"
              name="inputRadio"
              data-testid="ticket-payment"
              onChange={ this.onInputChange }
            />
            Boleto
          </label>
          <label htmlFor="inputRadio">
            <input
              type="radio"
              name="inputRadio"
              data-testid="visa-payment"
              onChange={ this.onInputChange }
            />
            Visa
          </label>
          <label htmlFor="inputRadio">
            <input
              type="radio"
              name="inputRadio"
              data-testid="master-payment"
              onChange={ this.onInputChange }
            />
            Master
          </label>
          <label htmlFor="inputRadio">
            <input
              type="radio"
              name="inputRadio"
              data-testid="elo-payment"
              onChange={ this.onInputChange }
            />
            Elo
          </label>
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.checkoutBtn }
          >
            Checkout
          </button>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
