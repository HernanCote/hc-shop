import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Row,
  Col,
} from 'react-bootstrap';

import Product from '../../components/Product';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Pagination from '../../components/Pagination';

import { listProducts } from '../../actions';

const Home = ({
  match,
  location
}) => {
  const query = new URLSearchParams(location.search);

  const pageNumber = query.get('page') ?? 1;
  const pageSize = query.get('pageSize') ?? 10;
  const keyword = query.get('search') ?? '';


  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);

  const { loading, error, products = [], page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, pageSize));
  }, [dispatch, keyword, pageNumber, pageSize]);

  return (
    <>
      <h1>Latest products</h1>
      {loading
        ? (<Loader />)
        : error
          ? (<Message variant="danger">{error}</Message>)
          :
          (
            <>
              {products.length === 0 && <Message variant="info">{keyword?.trim() ? `Searching by ${keyword} lead no results` : 'There are no products at the moment'}</Message>}
              <Row>
                {products.map((product, idx) => (
                  <Col key={idx} sm={12} md={6} lg={4} xl={3}>
                    <Product {...product} />
                  </Col>
                ))}
              </Row>
              <Pagination
                page={page}
                pages={pages}
                pageSize={pageSize}
                keyword={keyword ?? ''}
              />
            </>
          )
      }
    </>
  );
};

export default Home;
