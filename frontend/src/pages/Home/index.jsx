import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Row,
  Col,
} from 'react-bootstrap';

import Product from '../../components/Product';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

import { listProducts } from '../../actions';

const Home = ({
  match,
}) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);

  const { loading, error, products = [] } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

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
            </>
          )
      }
    </>
  );
};

export default Home;
