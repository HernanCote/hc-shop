import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Form } from 'react-bootstrap';

const SearchBox = () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const pageNumber = query.get('page');
  const pageSize = query.get('pageSize');

  const submitHandler = keyword => {
    if (keyword.trim()) {
      history.push({
        pathname: '/',
        search: `?search=${keyword}` + (pageNumber ? `&pageNumber=${pageNumber}` : '') + (pageSize ? `&pageSize=${pageSize}` : '')
      });
    } else {
      history.push('/');
    }
  };

  return (
    <Form
      inline
    >
      <Form.Control
        autoComplete="off"
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
