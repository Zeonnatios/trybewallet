import React from 'react';
import PropTypes from 'prop-types';

class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleChange, name, value, type, nameState } = this.props;
    return (
      <div>
        <label className="form-wallet-label" htmlFor={ name }>
          { name }
          <input
            className="form-wallet-input-field"
            type={ type }
            name={ nameState }
            id={ name }
            value={ value }
            onChange={ handleChange }
            data-testid={ `${nameState}-input` }
          />
        </label>
      </div>
    );
  }
}

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  nameState: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default InputText;
