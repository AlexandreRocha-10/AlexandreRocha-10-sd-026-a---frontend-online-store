import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CategoryList from './CategoryList';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      queryInput: '',
      productList: [],
      categoryList: [],
      shoppingCartList: [],
    };
  }

  async componentDidMount() {
    this.setState({ categoryList: await getCategories() });
  }

  handleAddToCartButton = (item) => {
    const getLocalItem = JSON.parse(localStorage.getItem('shoppingCartList')) || [];
    const truFal = getLocalItem.some((produto) => produto.id === item.id);
    if (truFal) {
      const retorno = getLocalItem.map((elem) => {
        if (item.id === elem.id) {
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
      this.setState(({ shoppingCartList: [...getLocalItem, { ...item, quantity: 1 }],
      }), () => {
        const { shoppingCartList } = this.state;
        localStorage.setItem('shoppingCartList', JSON.stringify(shoppingCartList));
      });
    }
  };

  onChangeCategory = async ({ target }) => {
    const { id } = target;
    const produtos = await getProductsFromCategoryAndQuery(id, null);
    const response = produtos.results;
    this.setState({ productList: response });
  };

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
  };

  render() {
    const { queryInput, productList, categoryList } = this.state;
    return (
      <div>
        <span data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
        <br />
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
        </label>
        <div>
          Categorias
          <br />
          <br />
          {categoryList.map(({ name, id }) => (
            <div key={ id }>
              <CategoryList
                id={ id }
                name={ name }
                onChangeCategory={ this.onChangeCategory }
              />
            </div>
          ))}
        </div>
        <section>
          { productList.length === 0
            ? (
              <span>
                <br />
                Nenhum produto foi encontrado
              </span>)
            : productList.map((item) => (
              <div key={ item.id }>
                <Link
                  data-testid="product-detail-link"
                  to={ `/product/${item.id}` }
                >
                  <div data-testid="product" key={ item.id }>
                    <h3>{item.title}</h3>
                    <img src={ item.thumbnail } alt={ item.title } />
                    <h2>{item.price}</h2>
                  </div>
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  type="button"
                  onClick={ () => this.handleAddToCartButton(item) }
                >
                  Adicionar ao carrinho de compras
                </button>
              </div>
            )) }
        </section>
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

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Home;
