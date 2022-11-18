import { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryList extends Component {
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

CategoryList.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
};

export default CategoryList;
