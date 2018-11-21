import React from 'react';
import {
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const MergeSelector = (props) => {
  const handleChange = (field) => {
    if (field === 1) {
      props.callback([`mergeToField`, mergeToField.value])
    } else if (field === 2) {
      props.callback([`mergeFromField`, mergeFromField.value])
    }
  }
  let mergeToField = null;
  let mergeFromField = null;

  return (
    <FormGroup controlId="merge-fields" className="subfield-option no-title">
      <FormControl
        componentClass="select"
        value = { props.MergeToField }
        onChange = { () => handleChange(1) }
        className="combo-select"
        inputRef={ input => mergeToField = input }
      >
      <option value= { `none` }>merge to</option>
        {
          props.headers
            ? props.headers.map(header => {
              return (
                <option
                  key={ header }
                  value={ header }
                >
                  { header }
                </option>
                )
              })
            : null
          }
      </FormControl>
      <FormControl
        componentClass="select"
        value = { props.mergeFromField }
        onChange = { () => handleChange(2) }
        className="combo-select"
        inputRef={ input => mergeFromField = input }
      >
      <option value={ `none` }>merge from</option>
        {
          props.headers
            ? props.headers.map(header => {
              return (
                <option
                key={ header }
                value={ header }
              >
                { header }
              </option>
              )
            })
          : null
        }
      </FormControl>
    </FormGroup>
  );
}

MergeSelector.propTypes = {
  mergeToField: PropTypes.string.isRequired,
  mergeFromField: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string),
};

export default MergeSelector;
