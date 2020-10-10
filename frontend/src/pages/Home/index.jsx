import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from '../../components/Product';

import products from '../../products';


const Home = () => (
  <>
    <h1>Latest products</h1>
    <Row>
      {products.map((product, idx) => (
        <Col key={idx} sm={12} md={6} lg={4} xl={3}>
          <Product {...product} />
        </Col>
      ))}
    </Row>
  </>
);

export default Home;
