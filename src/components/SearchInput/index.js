import React from 'react';
import { Form } from 'react-bootstrap';

function SearchInput({ handleChange, query, disabled, placeholder }) {
  return (
    <Form.Group className='mb-3'>
      <Form.Control
        disabled={disabled}
        type='text'
        placeholder={placeholder}
        value={query}
        name='query'
        onChange={handleChange}
      />
    </Form.Group>
  );
}

SearchInput.defaultProps = {
  placeholder: 'Masukan pencarian disini',
}

export default SearchInput;
