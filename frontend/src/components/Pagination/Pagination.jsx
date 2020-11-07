import React from 'react'
import { Pagination as BasePagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Pagination = ({
  pages,
  page = 1,
  keyword = '',
  pageSize = 10,
  isAdmin = false,
}) =>
  pages > 1 && (
    <BasePagination>
      {[...Array(pages).keys()].map(x => (
        <LinkContainer key={x + 1} to={keyword.trim() ? `/?page=${x + 1}&pageSize=${pageSize}&search=${keyword}` : `/?page=${x + 1}&pageSize=${pageSize}`}>
          <BasePagination.Item active={x + 1 === page}>{x + 1}</BasePagination.Item>
        </LinkContainer>
      ))}
    </BasePagination>
  );


export default Pagination;
