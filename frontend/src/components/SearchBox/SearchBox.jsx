import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Form } from 'react-bootstrap';

const SearchBox = () => {
  const history = useHistory();

  const submitHandler = keyword => {
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form
      inline
    >
      <Form.Control
        size="sm"
        type="text"
        name="q"
        onChange={e => submitHandler(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-1 "
      ></Form.Control>
    </Form>
  )
}

export default SearchBox;
