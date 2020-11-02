import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  Table,
  Button,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import {
  deleteProduct,
  listProducts
} from '../../actions';

const Products = ({
  history,
  match,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const dispatch = useDispatch();

  const { productList, userLogin, productDelete } = useSelector(state => state);

  const { loading, error, products = [] } = productList;
  const { userInfo } = userLogin;
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    userInfo && userInfo.isAdmin ? dispatch(listProducts()) : history.push('/login');
  }, [successDelete, userInfo, dispatch, history]);

  const openModal = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  const createProductHandler = () => {

  };

  const deleteProductHandler = () => {
    dispatch(deleteProduct(selectedProduct._id));
    setShowModal(false);
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the following product:</p>
          <ul>
            <li>{selectedProduct.name}</li>
          </ul>
          <p>
            This action is permanent.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteProductHandler}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
          <Col className="text-right">
            <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Col>
        </Col>
      </Row>
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading || loadingDelete
        ? <Loader />
        : error
          ? <Message variant="danger">{error}</Message>
          : (
            <>
              <Table
                className="table-sm"
                striped
                bordered
                hover
                responsive
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <LinkContainer to={`/admin/products/${product._id}/edit`}>
                          <Button
                            variant="light"
                            className="btn-sm"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => openModal(product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )
      }
    </>
  );
};

export default Products;
