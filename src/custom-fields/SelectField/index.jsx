import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
import { ErrorMessage } from 'formik';

SelecteField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
};

SelecteField.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    options: []
}

function SelecteField(props) {
    const { field, form, options, label, placeholder, disabled } = props;
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    const selectedOption = options.find(option => option.value === value)

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption

        const changeEvent = {
            target: {
                name: name,
                value: selectedValue
            }
        }
        field.onChange(changeEvent);
    }

    return (
        <FormGroup>
        {label && <Label for={name}>{label}</Label>}
  
        <Select
          id={name}
          {...field}
          value={selectedOption}
          onChange={handleSelectedOptionChange}
  
          placeholder={placeholder}
          isDisabled={disabled}
          options={options}
  
          className={showError ? 'is-invalid' : ''}
        />
  
        <ErrorMessage name={name} component={FormFeedback} />
      </FormGroup>

    );
}

export default SelecteField;