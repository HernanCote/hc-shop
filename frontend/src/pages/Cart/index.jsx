import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Modal,
} from 'react-bootstrap'

import Message from '../../components/Message';

import {
  addToCart,
  removeFromCart
} from '../../actions';

const Cart = ({
  match,
  location,
  history,
}) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(selectedProduct.product));
    setShowModal(false);
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const openModal = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Remove item from cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove the following item from your cart?
          <ul>
            <li>{selectedProduct.name}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={removeFromCartHandler}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0
            ? <Message>Your cart is empty. <Link to="/">Go Back</Link></Message>
            :
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button type="button" variant="light" onClick={() => openModal(item)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
              ${cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >Proceed To Checkout</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Cart;
