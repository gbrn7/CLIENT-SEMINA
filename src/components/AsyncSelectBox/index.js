import React from 'react';
import { Form } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';

function SelectBox({
  name,
  options,
  isClearable,
  value,
  placeholder,
  handleChange,
  label,
  defaultValue
}) {
  return (
    <Form.Group className='mb-2'>
      {label && <Form.Label>{label}</Form.Label>}
      <AsyncSelect
        cacheOptions
        name={name}
        isClearable={isClearable}
        placeholder={placeholder}
        options={options}
        onChange={handleChange}
      />
    </Form.Group>
  );
}

export default SelectBox;
