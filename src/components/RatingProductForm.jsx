import React from 'react';
import PropTypes from 'prop-types';

export default class RatingProductForm extends React.Component {
  state = {
    email: '',
    comment: '',
    rating: '',
    ratings: [
      { index: 1 },
      { index: 2 },
      { index: 3 },
      { index: 4 },
      { index: 5 },
    ],
    validStatus: false,
    evaluatorArea: [],
  };

  componentDidMount() {
    const { id } = this.props;
    const getStored = localStorage.getItem(id);
    if (getStored) {
      this.setState({ evaluatorArea: JSON.parse(getStored) });
    }
  }

  handleFormChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (this.formValidation()) {
        this.setState({ validStatus: false });
      }
    });
  };

  formValidation = () => {
    const { email, rating } = this.state;
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const formChecked = (regexEmail.test(email) && (rating));
    return formChecked;
  };

  handleFormButton = () => {
    const { email, comment, rating, evaluatorArea } = this.state;
    const { id } = this.props;
    if (!this.formValidation()) {
      this.setState({ validStatus: true });
    } else {
      const formElements = { email, text: comment, rating };
      const formArea = evaluatorArea;
      formArea.push(formElements);
      localStorage.setItem(id, JSON.stringify(formArea));
      this.setState({ email: '', comment: '', evaluatorArea: formArea });
    }
  };

  setFormCard = () => {
    const { evaluatorArea } = this.state;
    const formCards = evaluatorArea.map((item, index) => (
      <div key={ `${item.email}${index}` }>
        <h4 data-testid="review-card-email">{item.email}</h4>
        <p data-testid="review-card-rating">{item.rating}</p>
        <p data-testid="review-card-evaluation">{item.text}</p>
      </div>
    ));
    return formCards;
  };

  render() {
    const { email, comment, validStatus, evaluatorArea, ratings, rating } = this.state;

    return (
      <div>

        <label htmlFor="input-email">
          <input
            type="text"
            name="email"
            id="input-email"
            value={ email }
            placeholder="grupo14@email.com"
            data-testid="product-detail-email"
            onChange={ this.handleFormChange }
          />
        </label>

        {ratings.map(({ index }) => (
          <label
            key={ index }
            htmlFor={ `input-rate-${index}` }
          >
            {index}
            <input
              type="radio"
              id={ `input-rate-${index}` }
              data-testid={ `${index}-rating` }
              value={ index }
              name="rating"
              checked={ index === Number(rating) }
              onChange={ this.handleFormChange }
            />
          </label>
        ))}

        <label htmlFor="product-detail-evaluation">
          Comentários:
          <textarea
            name="comment"
            id="product-detail-evaluation"
            value={ comment }
            data-testid="product-detail-evaluation"
            onChange={ this.handleFormChange }
          />
        </label>

        <button
          type="button"
          data-testid="submit-review-btn"
          onClick={ this.handleFormButton }
        >
          Enviar
        </button>

        { (validStatus) ? (<span data-testid="error-msg">Campos inválidos</span>) : ('') }
        { (evaluatorArea.length > 0) ? (this.setFormCard()) : ('') }

      </div>
    );
  }
}

RatingProductForm.propTypes = {
  id: PropTypes.string.isRequired,
};
