import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

  handleSearchInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleCartButton = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  handleSearchButton = async () => {
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
            onChange={ this.handleSearchInput }
            name="queryInput"
          />
          <button
            data-testid="query-button"
            type="button"
            value={ queryInput }
            onClick={ this.handleSearchButton }

          >
            Pesquisar
          </button>
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </label>
        <section>
          { productList.length === 0
            ? (
              <span>
                Nenhum produto foi encontrado
              </span>)
            : productList.map((item) => (
              <Link
                key={ item.id }
                data-testid="product-detail-link"
                to={ `/product/${item.id}` }
              >
                <div data-testid="product" key={ item.id }>
                  <h3>{item.title}</h3>
                  <img src={ item.thumbnail } alt={ item.title } />
                  <h2>{ item.price }</h2>
                </div>
              </Link>
            )) }
        </section>
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.handleCartButton }
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
