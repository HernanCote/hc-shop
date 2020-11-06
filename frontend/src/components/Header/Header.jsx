import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LinkContainer } from 'react-router-bootstrap';
import {
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Badge,
} from 'react-bootstrap';

import SearchBox from '../SearchBox';

import { logout } from '../../actions/userActions';


const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const numberOfItemsInCart = cartItems.length;

    const logoutHandler = () => {
        dispatch(logout());
        history.push('/');
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <SearchBox />
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>
                                    Cart{' '}
                                    {numberOfItemsInCart > 0 ? <Badge variant="info" pill>{numberOfItemsInCart}</Badge> : null}
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo
                                ?
                                (
                                    <NavDropdown
                                        title={userInfo.name}
                                        id="username"
                                    >
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                )
                                :
                                (
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            <i className="fas fa-user"></i> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                )
                            }
                            {
                                userInfo && userInfo.isAdmin && (
                                    <NavDropdown
                                        title="Admin"
                                        id="adminmenu"
                                    >
                                        <LinkContainer to="/admin/users">
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/products">
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orders">
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    )
};

export default Header;
