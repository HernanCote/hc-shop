import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Row,
  Col,
} from 'react-bootstrap';

import Product from '../../components/Product';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
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
};

export default Home;
