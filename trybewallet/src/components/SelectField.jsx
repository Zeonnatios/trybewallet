import React from 'react';
import PropTypes from 'prop-types';

class SelectField extends React.Component {
  render() {
    const { handleChange, name, value, options, nameState } = this.props;
    return (
      <div>
        <label htmlFor={ name }>
          { name }
          <select
            className="form-wallet-input-field"
            name={ nameState }
            id={ name }
            onChange={ handleChange }
            value={ value }
            data-testid={ `${nameState}-input` }
          >
            {options.map((opt, idx) => (
              <option key={ idx } value={ opt }>{opt}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  nameState: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectField;
