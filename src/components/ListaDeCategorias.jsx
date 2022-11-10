import { Component } from 'react';
import PropTypes from 'prop-types';

class ListaDeCategorias extends Component {
  render() {
    const { name, id, onChangeCategory } = this.props;
    return (
      <div>
        <label htmlFor="category">
          { name }
          <input
            data-testid="category"
            type="radio"
            name="category"
            id={ id }
            onChange={ onChangeCategory }
          />
        </label>
      </div>
    );
  }
}

ListaDeCategorias.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
};

export default ListaDeCategorias;
