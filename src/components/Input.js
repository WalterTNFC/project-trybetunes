import React, { Component } from 'react';
import PropType from 'prop-types';

export default class Input extends Component {
  render() {
    const { label, id, test, value, placeholder, type, callback } = this.props;
    return (
      <label htmlFor={ id }>
        {label}
        <input
          type={ type }
          name={ id }
          id={ id }
          data-testid={ `edit-input-${test}` }
          defaultValue={ value }
          placeholder={ placeholder }
          onChange={ (e) => callback(e) }
        />
      </label>
    );
  }
}

Input.propTypes = {
  label: PropType.string.isRequired,
  id: PropType.string.isRequired,
  test: PropType.string.isRequired,
  value: PropType.string.isRequired,
  placeholder: PropType.string.isRequired,
  type: PropType.string.isRequired,
  callback: PropType.func.isRequired,
};
