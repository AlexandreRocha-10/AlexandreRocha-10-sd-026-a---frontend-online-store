import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListaDeCategorias from './ListaDeCategorias';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      queryInput: '',
      productList: [],
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleOnClick = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  handleButton = async () => {
    const { queryInput } = this.state;
    const response = await getProductsFromCategoryAndQuery(null, queryInput);
    const productList = response.results;
    this.setState({ productList });
    console.log(response);
  };

  render() {
    const { queryInput, productList } = this.state;
    return (
      <div>
        <label htmlFor="queryInput">
          <input
            type="text"
            data-testid="query-input"
            value={ queryInput }
            onChange={ this.handleChange }
            name="queryInput"
          />
          <button
            data-testid="query-button"
            type="button"
            value={ queryInput }
            onClick={ this.handleButton }

          >
            Pesquisar
          </button>
        </label>
        <section>
          { productList.length === 0
            ? (
              <span data-testid="home-initial-message">
                Nenhum produto foi encontrado
              </span>)
            : productList.map((item) => (
              <div data-testid="product" key={ item.id }>
                <h3>{item.title}</h3>
                <img src={ item.thumbnail } alt={ item.title } />
                <h2>{ item.price }</h2>
              </div>
            )) }
        </section>
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.handleOnClick }
        >
          Ir para o carrinho
        </button>
        <ListaDeCategorias />
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.string.isRequired,
};
export default Home;
